import express from "express"
const router = express.Router()
import { createshorturl} from "../controller/shorturlcontroller.js"
import { authmiddleware } from "../middleware/authmiddleware.js"


router.post('/',authmiddleware, createshorturl)

export default router