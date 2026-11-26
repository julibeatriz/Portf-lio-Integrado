import fs from "node:fs/promises"
import path from "node:path"
import { publicFolder } from "../config/multer.js"

export const excluirImagens = async(imagens)=>{
    if(!Array.isArray(imagens)){
        return
    }

    for(const imagem of imagens){
        if(typeof imagem !== "string" || path.basename(imagem) !== imagem){
            continue
        }

        const caminho = path.join(publicFolder, imagem)

        try {
            await fs.unlink(caminho)
        } catch (error) {
            if(error.code !== "ENOENT"){
                console.log(error)
            }
        }
    }
}

export const limparUpload = async(request)=>{
    const imagens = request.files?.map(file => file.filename) || []

    await excluirImagens(imagens)
}