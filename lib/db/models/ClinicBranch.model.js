import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const ClinicBranch = database.define("clinicBranchs",{
    clinicBranchId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field:"id"
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
    },

    addressDataid: {
        type: DataTypes.UUID,
        allowNull: true,
        field:"address_data_id"
    },

   
},
    {tableName:"clinic_branchs",timestamps:true}
)

