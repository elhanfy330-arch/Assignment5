import {DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { userModel } from "./userModel.js";

export class postModel extends Model {}

postModel.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    content : {
        type : DataTypes.TEXT,
        allowNull : false
    },

},{
    sequelize,
    modelName : "post",
    timestamps : true,
    paranoid : true,

})


