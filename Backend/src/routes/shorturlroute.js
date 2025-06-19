import express from "express"
const router = express.Router()
import { createshorturl, deleteShortUrl} from "../controller/shorturlcontroller.js"
import { authmiddleware } from "../middleware/authmiddleware.js"


router.post('/',authmiddleware, createshorturl)
router.delete('/:id',authmiddleware, deleteShortUrl)

export default router