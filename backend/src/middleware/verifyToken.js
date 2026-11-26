import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next)=>{
    try {
        const authorization = request.headers.authorization

        if(!authorization){
            return response.status(401).json({
                message: "Token não informado"
            })
        }

        const [tipo, token] = authorization.split(" ")

        if(tipo !== "Bearer" || !token){
            return response.status(401).json({
                message: "Token inválido"
            })
        }

        const usuario = jwt.verify(
            token, process.env.JWT_SECRET
        )

        request.usuario = usuario

        next()

    } catch (error) {
        return response.status(401).json({
            message: "Token inválido ou expirado"
        })
    }
}