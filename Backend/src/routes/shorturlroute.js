import express from "express"
const router = express.Router()
import { createshorturl } from "../controller/shorturlcontroller.js"


router.post('/', createshorturl)

export default router