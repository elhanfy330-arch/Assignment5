export {userModel} from "./userModel.js"
export {postModel} from "./postModel.js"
export {commentModel} from "./commentModel.js"

import {userModel} from "./userModel.js"
import {postModel} from "./postModel.js"
import {commentModel} from "./commentModel.js"


commentModel.belongsTo(postModel)
commentModel.belongsTo(userModel)
postModel.hasMany(commentModel, { foreignKey: "postId" });
userModel.hasMany(postModel) 
postModel.belongsTo(userModel , {
    allowNull : false
})


