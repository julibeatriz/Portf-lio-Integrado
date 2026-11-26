import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const areaModel = conn.define(
    "areas",
    {
        id_area:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        instituicao:{
            type: DataTypes.ENUM("Sesi", "Senai"),
            allowNull: false
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)