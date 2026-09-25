import Reclamation from "../models/Reclamation.js";
import Job from "../models/Job.js";

export const createReclamation = async (req, res) => {
  try {
    const { jobId, motif, description } = req.body;
    const jobExists = await Job.findById(jobId);
    
    if (!jobExists) {
      return res.status(404).json({ success: false, message: "Offre non trouvée" });
    }

    const reclamation = await Reclamation.create({
      auteur: req.user.id,
      job: jobId,
      motif,
      description
    });

    return res.status(201).json({
      success: true,
      message: "Réclamation envoyée avec succès",
      data: reclamation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReclamation = async (req, res) => {
  try {
    const reclamations = await Reclamation.find()
      .populate("auteur", "nom prenom email role")
      .populate("job", "titre entreprise")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reclamations.length,
      data: reclamations
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReclamationStatus = async (req, res) => {
  try {
    const { statut } = req.body;
    const reclamation = await Reclamation.findById(req.params.id);

    if (!reclamation) {
      return res.status(404).json({ success: false, message: "Réclamation non trouvée" });
    }

    reclamation.statut = statut;
    await reclamation.save();

    return res.status(200).json({
      success: true,
      message: "Statut mis à jour avec succès",
      data: reclamation
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};