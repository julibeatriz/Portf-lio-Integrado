import { registroModel } from "../models/registroModel.js";
import { areaModel } from "../models/areaModel.js";
import { excluirImagens, limparUpload } from "../utils/excluirImagens.js"

export const listarRegistros = async(request, response)=>{
    try {
        const registro = await registroModel.findAll()

      return response.status(200).json(registro)

    } catch (error) {
        console.log(error)
        response.status(500).json({message: "Erro ao listar registro"})
    }
}

export const cadastrarRegistro = async(request, response)=>{
    let salvou = false

    try {
        const { id_area, secao, bimestre, titulo, descricao, aprendizado } = request.body
        const id_usuario = request.usuario.id_usuario
        const evidencia_visual = request.files?.map(file => file.filename) || []

        if(typeof titulo !== "string" || !titulo.trim() || typeof descricao !== "string" || !descricao.trim() || !id_area || !secao){

            await limparUpload(request)

            return response.status(400).json({message: "Preencha todos os campos obrigatórios"})
        }

        const area = await areaModel.findByPk(id_area)

        if(!area){
            await limparUpload(request)

            return response.status(404).json({message: "Área não encontrada"})
        }

        const registro = await registroModel.create({
            id_area,
            id_usuario,
            secao,
            bimestre,
            titulo,
            descricao,
            aprendizado,
            evidencia_visual
        })

        salvou = true

        return response.status(201).json(registro)

    } catch (error) {
        console.log(error)

        if(!salvou){
            await limparUpload(request)
        }

        response.status(500).json({
            message: "Erro ao cadastrar registro"
        })
    }
}

export const buscarRegistroPorId = async(request, response)=>{
    try {
        const { id } = request.params

        const registro = await registroModel.findByPk(id)

        if(!registro){
            return response.status(404).json({
                message: "Registro não encontrado"
            })
        }

        return response.status(200).json(registro)

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Erro ao buscar registro"
        })
    }
}

export const atualizarRegistro = async(request, response)=>{
    let salvou = false

    try {
        const { id } = request.params

        const registro = await registroModel.findByPk(id)

        const { id_area, secao, bimestre, titulo, descricao, aprendizado } = request.body

        if(!registro){
            await limparUpload(request)

            return response.status(404).json({message: "Registro não encontrado"})
        }

        if(registro.id_usuario !== request.usuario.id_usuario){
            await limparUpload(request)

            return response.status(403).json({message: "Você não tem permissão para editar este registro"})
        }

        const imagensAntigas = registro.evidencia_visual

        let evidencia_visual = registro.evidencia_visual

        if(request.files && request.files.length > 0){
            evidencia_visual = request.files.map(file => file.filename)
        }

        if(typeof titulo !== "string" || !titulo.trim() || typeof descricao !== "string" || !descricao.trim() || !id_area || !secao){

            await limparUpload(request)

            return response.status(400).json({message: "Preencha todos os campos obrigatórios"})
        }

        const area = await areaModel.findByPk(id_area)

        if(!area){
            await limparUpload(request)

            return response.status(404).json({
                message: "Área não encontrada"
            })
        }

        await registro.update({
            id_area,
            secao,
            bimestre,
            titulo,
            descricao,
            aprendizado,
            evidencia_visual
        })

        salvou = true

        if(request.files && request.files.length > 0){
            await excluirImagens(imagensAntigas)
        }

        return response.status(200).json(registro)

    } catch (error) {
        console.log(error)

        if(!salvou){
            await limparUpload(request)
        }

        response.status(500).json({message: "Erro ao editar registro"})
    }
}

export const atualizarParteDoRegistro = async(request, response)=>{
    let salvou = false

    try {
        const { id } = request.params

        const registro = await registroModel.findByPk(id)

        if(!registro){
            await limparUpload(request)

            return response.status(404).json({message: "Registro não encontrado"})
        }

        if(registro.id_usuario !== request.usuario.id_usuario){
            await limparUpload(request)

            return response.status(403).json({message: "Você não tem permissão para atualizar este registro"})
        }

        const { id_area, secao, bimestre, titulo, descricao, aprendizado } = request.body

        const imagensAntigas = registro.evidencia_visual

        let evidencia_visual = registro.evidencia_visual

        if(request.files && request.files.length > 0){
            evidencia_visual = request.files.map(file => file.filename)
        }

        if(titulo !== undefined){
            if(typeof titulo !== "string" || !titulo.trim()){
                await limparUpload(request)

                return response.status(400).json({message: "Título inválido"})
            }
        }

        if(descricao !== undefined){
            if(typeof descricao !== "string" || !descricao.trim()){
                await limparUpload(request)

                return response.status(400).json({message: "Descrição inválida"})
            }
        }

        if(id_area !== undefined){
            const area = await areaModel.findByPk(id_area)

            if(!area){
                await limparUpload(request)

                return response.status(404).json({message: "Área não encontrada"})
            }
        }

        await registro.update({
            id_area,
            secao,
            bimestre,
            titulo,
            descricao,
            aprendizado,
            evidencia_visual
        })

        salvou = true

        if(request.files && request.files.length > 0){
            await excluirImagens(imagensAntigas)
        }

        return response.status(200).json(registro)

    } catch (error) {
        console.log(error)

        if(!salvou){
            await limparUpload(request)
        }

        if(error.name === "SequelizeValidationError"){
            return response.status(400).json({message: error.message})
        }

        response.status(500).json({message: "Erro ao atualizar registro"})
    }
}


export const excluirRegistro = async(request, response)=>{
    try {
        const { id } = request.params

        const registro = await registroModel.findByPk(id)

        if(!registro){
            return response.status(404).json({message: "Registro não encontrado"})
        }

        if(registro.id_usuario !== request.usuario.id_usuario){
            return response.status(403).json({message: "Você não tem permissão para excluir este registro"})
        }

        const imagens = registro.evidencia_visual

        await registro.destroy()

        await excluirImagens(imagens)

        return response.status(200).json({message: "Registro excluído com sucesso"})

    } catch (error) {
        console.log(error)
        response.status(500).json({message: "Erro ao excluir registro"})
    }
}