import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const PatientHealthProvider = database.define("patient_health_provider",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field:"id"
    },

    patientId: {
        type: DataTypes.UUID,
        default: null,
        allowNull: true,
    },
    healthProviderId: {
        type: DataTypes.UUID,
        default: null,
        allowNull: true,
    },
    memberNumber:{
        type:DataTypes.STRING(120),
        allowNull: false, //Provisorio
        field: 'member_number',
       
 
}},
    {tableName:"patients_health_providers",timestamps:true}
)

