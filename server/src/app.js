import express from "express";
import dns from "node:dns";
import userRouter from "./routes/user.routes.js"

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(express.json());
app.use("/api/users",userRouter)

app.get("/", (req, res) => {
  res.status(200).json({
    message: "SkillBridge API is running...",
  });
});
export default app;
