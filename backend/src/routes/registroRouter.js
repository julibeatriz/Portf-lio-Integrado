import { Router } from "express";
import { listarRegistros, cadastrarRegistro, buscarRegistroPorId, atualizarRegistro, excluirRegistro, atualizarParteDoRegistro } from "../controllers/registroController.js"
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { upload } from "../config/multer.js"


const router = Router()

router.get("/", listarRegistros)
router.post("/",verifyToken,verifyAdmin, upload.array("evidencia_visual", 10), cadastrarRegistro)
router.get("/:id", buscarRegistroPorId)
router.put("/:id",verifyToken,verifyAdmin, upload.array("evidencia_visual", 10), atualizarRegistro)
router.patch("/:id",verifyToken,verifyAdmin, upload.array("evidencia_visual", 10), atualizarParteDoRegistro)
router.delete("/:id",verifyToken,verifyAdmin, excluirRegistro)

export default router;