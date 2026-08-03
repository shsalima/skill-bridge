import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connexion à MongoDB réussie.");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error.message);
  }
};
