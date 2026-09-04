import Application from "../models/Application.js";
import User from "../models/User.js";

export const createCandidatureService = async (
  candidatId,
  jobId,
  applicationData,
) => {
  const candidat = await User.findById(candidatId);

  let scoreMatching = 0;
  if (jobId.competencesRequises && candidat.competences) {
    const matchedSkills = job.competencesRequises.filter((skill) =>
      candidat.competences.some((c) => c.toLowerCase() === skill.toLowerCase()),
    );
    scoreMatching = Math.round(
      (matchedSkills.length / jobId.competencesRequises.length) * 100,
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
    scoreMatching: scoreMatching,
  });
};
