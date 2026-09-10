import Application from "../models/Application.js";
import Competence from "../models/Competence.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { createNotificationService } from "./notification.service.js";

export const createCandidatureService = async (
  candidatId,
  jobId,
  applicationData,
) => {
  const job = await Job.findById(jobId);
  if (!job){

    throw new Error("Offre non trouvée.");
  } 

  const candidatSkillsDoc = await Competence.findOne({ candidat: candidatId });
  const candidatSkills = candidatSkillsDoc ? candidatSkillsDoc.competences : [];

  let scoreMatching = 0;
  const requiredSkills = job.competencesRequises || [];

  if (requiredSkills.length >0 && candidatSkills.length>0) {
    const matched = requiredSkills.filter((skill) =>
      candidatSkills.some((c) => c.toLowerCase().trim() === skill.toLowerCase().trim()),
    );
    scoreMatching = Math.round((matched.length / requiredSkills.length) * 100,);
  }
  if (!applicationData.cv) {
    throw new Error("Veuillez fournir votre CV pour postuler.");
  }

  return await Application.create({
    candidat: candidatId,
    job: jobId,
    cv: applicationData.cv,
    lettreMotivation: applicationData.lettreMotivation || "",
    scoreMatching,
  });
}


export const getMyApplicationsService=async(candidatId)=>{
    return await Application.find({candidat:candidatId})
        .populate({
            path:"job",
            populate:{path:"entreprise", select:"nom prenom nomEntreprise photo "}
        })
        .sort({createdAt: -1})
}



export const getApplicationsByJobService= async (jobId,entrepriseId)=>{
    const job =await Job.findById(jobId)
    if(!job){
        throw new Error("Offre d'emploi introuvable")
    }

    if(job.entreprise.toString() !==entrepriseId){
        throw new Error("Vous n'êtes pas autorisé à consulter les candidatures pour ce poste")
    }

    return await Application.find({job:jobId})
        .populate("candidat","nom prenom email telephone photo competences cvUrl")
        .sort({scoreMatchingy: -1,createdAt:-1})
}


export const updateApplicationStatusService=async(applicationId,entrepriseId,newStatus)=>{
    const application=await Application.findById(applicationId).populate("job")
    if(!application){
        throw new Error("Application introuvable")
    }

    if(application.job.entreprise.toString() !== entrepriseId){
        throw new Error("Vous n'êtes pas autorisé à modifier l'état de cette demande")

    }
    application.statut=newStatus
    // console.log(application.statut)
    
    await application.save()

    await createNotificationService(
        application.candidat,
        "Mise à jour de votre candidature",
        `Votre candidature pour le poste ${application.job.titre} a été passée au statut : ${newStatus} `,
        "Candidature"
    )

    return application
}
