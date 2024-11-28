import { database } from "../db";
import { DataTypes } from "sequelize";

export const Reservation = database.define("reservations",{
    reservationId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: "id"
    },
    code:{
        type:DataTypes.STRING(20),
        allowNull: true,
        field: 'code',
        unique: true,
    },

    patientId:{
        type: DataTypes.UUID,
        default: null, //Provisorio
        allowNull: true, //provisorio
    },
    appointmentId:{
        type: DataTypes.UUID,
        default: null, //Provisorio
        allowNull: true, //provisorio
    },

    status: {
        type: DataTypes.ENUM(
            'Iniciada',
            'Anunciada',
            'Cancelada',
            'Demorada',
        ),
        allowNull: false,
        defaultValue: "Iniciada"
    }},
    
    {tableName:"reservations",timestamps:true}
)
