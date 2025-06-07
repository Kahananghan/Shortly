import express from "express"
import { get_user, login_user, logout_user, register_user } from "../controller/authcontroller.js"
import { authmiddleware } from "../middleware/authmiddleware.js"

const router = express.Router()

router.post("/login", login_user)
router.post("/register", register_user)
router.post("/logout", logout_user)
router.get("/me", authmiddleware, get_user)

export default router