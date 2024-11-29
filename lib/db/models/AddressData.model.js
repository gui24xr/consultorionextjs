
import { database } from "../db.js"
import { DataTypes } from "sequelize"


export const AddressData = database.define("addressData",{
    addressId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: "id"
    },
    street: {
        type: DataTypes.STRING,
        default:null,
        allowNull: true,
    },
    streetNumber: {
        type: DataTypes.STRING,
        default:null,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        default:null,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        default:null,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.STRING,
        default:null,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        default:null,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.FLOAT, // o DataTypes.DOUBLE si necesitas más precisión
        default:null,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.FLOAT, // o DataTypes.DOUBLE
        default:null,
        allowNull: true,
    },
}, {tableName:"address_data",timestamps:true}
)