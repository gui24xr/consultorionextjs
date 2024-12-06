import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const ClinicHistoryItem = database.define("clinicHistory",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field:"id"
    },
    diagnostic: {
        type: DataTypes.TEXT,
        allowNull: true, //Provisorio
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    medicId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        field:"medic_id"
    },
    patientId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: DataTypes.UUIDV4,
        field:"patient_id"
    },
   
},
    {tableName:"clinics_histories_item",timestamps:true}
)

