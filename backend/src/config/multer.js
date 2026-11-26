import multer from "multer"
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const publicFolder = path.resolve(__dirname, "../../public")

fs.mkdirSync(publicFolder, { recursive: true })

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, publicFolder)
    },

    filename: (request, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.random()
        const extensao = path.extname(file.originalname)

        cb(null, `${file.fieldname}-${uniqueSuffix}${extensao}`)
    }
})

export const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024
    },
    fileFilter: (request, file, cb) => {
        const tipos = [
            "image/png",
            "image/jpeg",
            "image/webp",
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ]

        if(tipos.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new Error("Formato de arquivo inválido"))
        }
    }
})