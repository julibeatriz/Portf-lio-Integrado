
export const verifyAdmin = (request, response, next)=>{

    if(request.usuario.perfil !== "ADMIN"){
        return response.status(403).json({
            message: "Acesso negado"
        })
    }

    next()
}