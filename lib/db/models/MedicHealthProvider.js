import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const MedicHealthProvider = database.define("medicsHealthProvider",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field:"id"
    },

    medicId: {
        type: DataTypes.UUID,
        default: null,
        allowNull: true,
    },
    healthProviderId: {
        type: DataTypes.UUID,
        default: null,
        allowNull: true,
    },

       
 
},
    {tableName:"medics_health_providers",timestamps:true}
)

