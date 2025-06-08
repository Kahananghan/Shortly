import express from "express"
import { authmiddleware } from "../middleware/authmiddleware.js"
import { getallusersurl } from "../controller/usercontroller.js"

const router = express.Router()

router.post("/urls", authmiddleware, getallusersurl)

export default router