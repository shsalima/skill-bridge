import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { createNotificationService } from "./notification.service.js";

export const createCandidatureService = async (
  candidatId,
  jobId,
  applicationData,
) => {
  const candidat = await User.findById(candidatId);
  const job = await Job.findById(jobId);

  let scoreMatching = 0;
  if (job.competencesRequises && candidat.competences) {
    const matchedSkills = job.competencesRequises.filter((skill) =>
      candidat.competences.some((c) => c.toLowerCase() === skill.toLowerCase()),
    );
    scoreMatching = Math.round(
      (matchedSkills.length / job.competencesRequises.length) * 100,
    );
  }
  const cvToUse = applicationData.cv || candidat.cvUrl;
  if (!cvToUse) {
    throw new Error("Veuillez fournir votre CV");
  }

  return await Application.create({
    candidat: candidatId,
    job: jobId,
    cv: cvToUse,
    lettreMotivation: applicationData.lettreMotivation || "",
    scoreMatching: scoreMatching
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
