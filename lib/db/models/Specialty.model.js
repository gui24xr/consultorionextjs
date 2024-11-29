import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const Specialty = database.define("specialties",{
    specialtyId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field:"id"
    },

    code: {
        type: DataTypes.STRING(10),
        allowNull: true,
        unique:true,
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true
    }
},
    {tableName:"specialties",timestamps:true}
)

