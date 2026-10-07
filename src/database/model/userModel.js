import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";


export const userModel = sequelize.define("user",{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING(255)
        ,allowNull : false,
        
        
    },
    email : {
        type : DataTypes.STRING(255),
        allowNull : false ,
        unique : true,
        validate : {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING(255)
        ,allowNull : false,
        validate : {
            checkPasswordLength(value){
                if(value.length <= 6){
                    throw new Error("Password Must Be Greater Than 6 Character")
                }
            }
        }
    },
    role : {
        type : DataTypes.ENUM("admin" , "user"),
        defaultValue : "user"
    }

},{
    timestamps : true,

    hooks : {
        beforeCreate(user){
            checkNameLength(user.name)
        }
    }

})

function checkNameLength(name){
    if(!name || name.length <= 2){
        throw new Error("Name must be greater than 2 characters" , {cause : 400})
    }
}