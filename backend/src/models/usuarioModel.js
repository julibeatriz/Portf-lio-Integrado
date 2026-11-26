import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const usuarioModel = conn.define(
    "usuarios",
    {
        id_usuario:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        sobre_mim:{
            type: DataTypes.STRING,
            allowNull: true
        },
        perfil:{
            type: DataTypes.ENUM("USUARIO", "ADMIN"),
            defaultValue: "USUARIO",
            allowNull: true
        }
    }
)