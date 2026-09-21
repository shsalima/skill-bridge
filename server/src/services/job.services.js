import Job from "../models/Job.js";
import Entreprise from "../models/Entreprise.js";

export const createJobService = async (jobData, entrepriseId) => {
  const newJob = await Job.create({
    ...jobData,
    entreprise: entrepriseId,
  });
  return newJob;
};

export const getAllJobsService = async (filters) => {
  console.log(filters);

  // const query = { statut: "Ouverte" };
  const query = {};

  if (filters.statut) {
    query.statut = filters.statut;
  }

  if (filters.keyword) {
    query.$or = [
      { titre: { $regex: filters.keyword, $options: "i" } },
      { description: { $regex: filters.keyword, $options: "i" } },
    ];
  }
  if (filters.ville) {
    query.ville = { $regex: filters.ville, $options: "i" };
  }
  if (filters.domaine) {
    query.domaine = { $regex: filters.domaine, $options: "i" };
  }
  if (filters.typeContrat) {
    query.typeContrat = filters.typeContrat;
  }

  const totalJobs = await Job.countDocuments();
  const ouverteJobs = await Job.countDocuments({ statut: "Ouverte" });
  const fermelJobs = await Job.countDocuments({ statut: "Fermée" });

  const jobs = await Job.find(query)
    .populate("entreprise", "nom prenom email photo telephone")
    .sort({ createdAt: -1 });
  return { jobs, totalJobs, ouverteJobs, fermelJobs };
};

export const getJobByIdServices = async (jobId) => {
  const job = await Job.findById(jobId).populate(
    "entreprise",
    "nom prenom email photo telephone",
  );

  if (!job) {
    throw new Error("Aucune offre d'emploi disponible");
  }

  const entreprise = await Entreprise.findOne({
    user: job.entreprise._id,
  });

  return { job, entreprise };
};

export const updateJobService = async (jobId, updateData) => {
  const updateJob = await Job.findByIdAndUpdate(
    jobId,
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return updateJob;
};

export const deleteJobService = async (jobId) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error("Aucune offre d'emploi disponible");
  }
  await Job.findByIdAndDelete(jobId);
  return true;
};


export const toggleJobStatusService = async (jobId, requestedStatut) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error("Aucune offre d'emploi disponible");
  }

  let nextStatut = requestedStatut;
  if (!nextStatut) {
    nextStatut = job.statut === "Ouverte" ? "Fermée" : "Ouverte";
  }

  if (!["Ouverte", "Fermée"].includes(nextStatut)) {
    throw new Error("Statut invalide. Valeurs autorisées : Ouverte, Fermée.");
  }

  job.statut = nextStatut;
  await job.save();
  return job;
};
