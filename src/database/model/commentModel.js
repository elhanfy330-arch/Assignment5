import { Model , DataTypes } from "sequelize";
import {sequelize} from "../connection.js";
import { postModel } from "./postModel.js";
import { userModel } from "./userModel.js";

export class commentModel extends Model {}

commentModel.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    content : {
        type : DataTypes.TEXT,
        allowNull : false ,
    }
},{
    sequelize,
    modelName : "comment",
})
