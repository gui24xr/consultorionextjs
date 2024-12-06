import { database } from "../db.js"
import { DataTypes } from "sequelize"


export const PersonalData = database.define("personalInformation",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Para que se genere automáticamente
        primaryKey: true,
        allowNull: false,
        field: "id"
    },
    
    dni:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique:true,
    },
    
    firstName: {
        type: DataTypes.STRING(30),
        default: 'n/n',
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING(30),
        default: 'n/n',
        allowNull: true,
    },
    phoneNumber1: {
        type: DataTypes.STRING(30),
        default: '12345678998',
        allowNull: true,
    },
    phoneNumber2: {
        type: DataTypes.STRING(30),
        default: '12345678998',
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        default: 'unemail@mail.com',
        allowNull: true,
        unique: false, //para las prbuenas va false pero el mail debe ser unico
    },
    addressDataId:{
        type: DataTypes.UUID,
        default: null,
        allowNull: true,
    }
},
    
    {tableName:"personal_data",timestamps:true}
)


