import express from "express"
import cors from "cors"
import "./models/index.js"
import "dotenv/config";
import { publicFolder } from "./config/multer.js"
import { multerError } from "./middleware/multerError.js"

//ROTAS
import registroRouter from "./routes/registroRouter.js"
import areaRouter from "./routes/areaRouter.js"
import usuarioRouter from "./routes/usuarioRouter.js";

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

//1º Para imagem, permitir que a API receba arquivos
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use("/public", express.static(publicFolder))

app.use("/api/registros", registroRouter)
app.use("/api/areas", areaRouter)
app.use("/api", usuarioRouter)

app.use(multerError)


app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada" })
})

export default app