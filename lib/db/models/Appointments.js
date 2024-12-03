import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const Appointment = database.define("appointments",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: "id"
    },
    appointmentNumber: {
        type: DataTypes.INTEGER,
        //autoIncrement: true,
        
       
      },
    consultationServiceId: {
        type: DataTypes.UUID,
        default: null,
        allowNull: false,
        field: "consultation_service_id"
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    hour: {
        type: DataTypes.TIME,
        allowNull: true,
    },

    appointmentStatus: {
        type: DataTypes.ENUM(
            'Disponible',
            'Reservado',
            'En Espera',
            'Cancelado',
            'Finalizado'
        ),
        allowNull: false,
        defaultValue: "Disponible"
    },
    appointmentType: {
        type: DataTypes.ENUM(
            'Turno',
            'Sobreturno',
       
        ),
        allowNull: false,
        defaultValue: "Turno"
    }}
    , {tableName:"appointments",timestamps:true}
)

