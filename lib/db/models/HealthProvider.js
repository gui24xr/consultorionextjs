import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const HealthProvider = database.define("healthProvider",{
    healthProviderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field:"id"
    },

    providerName: {
        type: DataTypes.STRING(40),
        allowNull: true, //provisorio
    },
    planName: {
        type: DataTypes.STRING(40),
        allowNull: true, //provisorio
    },
    status: {
        type: DataTypes.ENUM(
            'Habilitado',
            'Inhabilitado',
            
        ),
        allowNull: false,
        defaultValue: "Habilitado"
    }},

    {tableName:"health_provider",timestamps:true}
)

