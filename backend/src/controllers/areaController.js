import { areaModel } from "../models/areaModel.js";

export const listarAreas = async(request, response)=>{
    try {
        const areas = await areaModel.findAll()

        return response.status(200).json(areas)

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Erro ao listar áreas"
        })
    }
}

export const cadastrarArea = async(request, response)=>{
    try {
        const { instituicao, nome, descricao } = request.body

        if(!instituicao || !nome){
            return response.status(400).json({
                message: "Preencha os campos obrigatórios"
            })
        }

        const area = await areaModel.create({
            instituicao,
            nome,
            descricao
        })

        return response.status(201).json(area)

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Erro ao cadastrar área"
        })
    }
}