import express from "express"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { getMyNotifications, markAsRead } from "../controllers/notification.controller.js"


const router= express.Router()


router.get("/my-notifications",authentificationCheck,getMyNotifications)

router.patch("/:id/read",authentificationCheck,markAsRead)



export default router