import { Sequelize } from "sequelize";
import {dbConfig} from "../config/config.service.js"

export const sequelize = new Sequelize(dbConfig.DB_NAME,dbConfig.DB_USER,dbConfig.DB_PASS,{
    host : dbConfig.DB_HOST,
    port : dbConfig.DB_PORT,
    pool : {
        min : dbConfig.MIN,
        max : dbConfig.Max
    },
    dialect : dbConfig.DB_DIALECT
})

export const connect =  async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync({alter : false}) 
        
        console.log("DB Connected")
    }catch(err){
        console.log("DB Connected Failed")
        console.log(err)
        process.exit(1)
    }
}