import "dotenv/config";
import bcrypt from "bcrypt";
import { conn } from "./config/conn.js";
import { usuarioModel } from "./models/usuarioModel.js";

const criarAdmin = async()=>{
    try {
        await conn.sync()

        const email = process.env.ADMIN_EMAIL
        const senha = process.env.ADMIN_SENHA

        if(!email || !senha){
            console.log("Preencha o email e a senha")
            return
        }

        const usuario = await usuarioModel.findOne({
            where: { email }
        })

        if(usuario){
            console.log("Usuário já cadastrado")
            return
        }

        const senhaHash = await bcrypt.hash(senha, 10)

        await usuarioModel.create({
        email: email,
        senha: senhaHash,
        perfil: "ADMIN"
    })

        console.log("Administrador cadastrado com sucesso")

    } catch (error) {
        console.log(error)
    }
     finally {
        await conn.close()
    }
}

criarAdmin()