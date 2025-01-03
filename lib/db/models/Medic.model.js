import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const Medic = database.define("medics",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field:"id"
    },
    medicRecord:{
        type:DataTypes.STRING(20),
        allowNull: false,
        field: 'medic_record',
        unique: true,
    },
    medicLicenceNumber:{
        type:DataTypes.STRING(20),
        allowNull: true,
        field: 'medic_licence_number'
    },
    specialtyId:{
        type: DataTypes.UUID,
        default: null,
        allowNull: true,
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
    },
    
 }, {tableName:"medics",timestamps:true}
)


