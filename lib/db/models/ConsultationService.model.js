import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const ConsultationService = database.define("consultation_service", {
    
consultationServiceId:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    field:"id"
},
serviceName: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true
},

specialtyId:{
    type: DataTypes.UUID,
    default: null,
    allowNull: false,
}, //No deberia ser null nunca dps se arregla en desarrolo

enabled:{
    type: DataTypes.BOOLEAN,
    defaultValue:true,
    allowNull: false,   
},
medicId:{
    type: DataTypes.UUID,
    default: null,
    allowNull: true,
    field: 'medic_id',
   
},
consultingRoomId:{
    type: DataTypes.UUID,
    default: null,
    allowNull: true,
    field: 'consulting_room_id',
},

}, {tableName:"consultation_services",timestamps:true}
)

