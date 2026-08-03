import dotenv, { config } from "dotenv"
import app from "./app"

dotenv.config()

const port=process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Serveur démarré sur le port ${PORT}`);
})