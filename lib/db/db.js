
import { Sequelize } from "sequelize";
//import { DataTypes } from "sequelize";

//let isConnected
//Creo la conexion a la base de datos.
const DB_NAME = 'nextsequelize'
const DB_USER = 'postgres'//'gui24'
const DB_PASSWORD = '2485natacion'
const CONNECTION_VALUES = {host:'localhost',port:'5432',dialect:'postgres', logging: console.log, dialectOptions: {multipleStatements: true }}

//Genero una instancia de la base de datos.
export const database = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,CONNECTION_VALUES, /*{logging: console.log}*/ )