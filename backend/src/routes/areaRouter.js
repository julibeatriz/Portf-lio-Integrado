import { Router } from "express";
import { listarAreas, cadastrarArea } from "../controllers/areaController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = Router()

router.get("/", listarAreas)
router.post("/",verifyToken, verifyAdmin, cadastrarArea)

export default router;