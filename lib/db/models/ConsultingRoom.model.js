import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const ConsultingRoom = database.define("consultingRooms",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field:"id"
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true
    },

    clinicBranchId: {
        type: DataTypes.UUID,
        allowNull: true,
        field:"branch_id"
    },

    status: {
        type: DataTypes.ENUM(
            'Disponible',
            'Limpieza',
            'Inhabilitado',
            'Reservado',
           
        ),
        allowNull: false,
        defaultValue: "Disponible"
    },
    /*
    consultationServiceId:{ //Servicio medico que usa el consultorio
        type: DataTypes.UUID,
        allowNull: true,
        field: 'consultation_service_id',
        default:null
    },
    */

    

   
},
    {tableName:"consulting_rooms",timestamps:true}
)

