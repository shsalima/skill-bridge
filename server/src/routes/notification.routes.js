import express from "express"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { getMyNotifications } from "../controllers/notification.controller.js"


const router= express.Router()


router.get("/my-notifications",authentificationCheck,getMyNotifications)



export default router