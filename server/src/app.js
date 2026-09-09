import express from "express";
import dns from "node:dns";
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";
import applications from "./routes/application.routes.js"
import notifications from "./routes/notification.routes.js"
import dashboard from "./routes/dashboard.routes.js"
import reclamation from "./routes/reclamation.routes.js"

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applications);
app.use("/api/notification",notifications)
app.use("/api/dashboard",dashboard)
app.use("/api/reclamation",reclamation)


app.get("/", (req, res) => {
  res.status(200).json({
    message: "SkillBridge API is running...",
  });
});

export default app;
