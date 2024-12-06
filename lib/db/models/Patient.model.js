import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const Patient = database.define("patients",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field:"id"
    },
    patientRecord:{
        type:DataTypes.STRING(20),
        allowNull: false,
        field: 'patient_record',
        unique: true,
    },
    dateOfBirth:{
        type:DataTypes.DATEONLY,
        default:null,
        allowNull: true
    },
    personalInformationId:{
        type: DataTypes.UUID,
        default: null, //Provisorio
        allowNull: true, //provisorio
    },
    dateOfRegistration:{
        type:DataTypes.DATEONLY,
        default:null,
        allowNull: true
    }
    
 }, {tableName:"patients",timestamps:true}
)


