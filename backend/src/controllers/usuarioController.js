import { usuarioModel } from "../models/usuarioModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async(request, response)=>{
    try {
        const { email, senha } = request.body

        if(!email || !senha){
            return response.status(400).json({
                message: "Preencha o email e a senha"
            })
        }

        const usuario = await usuarioModel.findOne({
            where: { email }
        })

        if(!usuario){
            return response.status(401).json({
                message: "Email ou senha inválidos"
            })
        }

        const senhaValida = await bcrypt.compare(
            senha, usuario.senha
        )

        if(!senhaValida){
            return response.status(401).json({
                message: "Email ou senha inválidos"
            })
        }

        const token = jwt.sign(
        {
            id_usuario: usuario.id_usuario,
            perfil: usuario.perfil
        },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        )


        return response.status(200).json({ message: "Login realizado com sucesso", token: token})

    } catch (error) {
        console.log(error)

        response.status(500).json({message: "Erro ao realizar login"})
    }
}