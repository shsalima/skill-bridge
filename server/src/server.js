import app from "./app.js";
import { connectDB } from "./config/db.js";
// import "dotenv/config";
// console.log("MONGO_URL :", process.env.MONGO_URL);

connectDB();
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
