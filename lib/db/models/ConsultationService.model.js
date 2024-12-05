import { database } from "../db.js";
import { DataTypes } from "sequelize";

export const ConsultationService = database.define("consultationServices", {
    
id:{
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
enabled:{
    type: DataTypes.BOOLEAN,
    defaultValue:true,
    allowNull: false,   
},



}, {tableName:"consultation_services",timestamps:true}
)

