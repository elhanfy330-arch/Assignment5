import { Op } from "sequelize";
import { commentModel, postModel, userModel } from "../../database/model/index.js";

export let addComment = async (body)=>{
    let data = await commentModel.bulkCreate(body , {
        individualHooks : true
    })
    return data;
}
export let updateComment = async ({commentId} , body)=>{
    let {userId , newContent} = body
    const comment = await commentModel.findByPk(commentId)
    if(!comment){
        throw new Error("Comment Not Found" , {cause : 404})
    }
    if(comment.userId != userId){
        throw new Error("You are not authorized to update this Comment.", { cause: 403 });
    }

    let [data] = await commentModel.update({content : newContent} , {
        where : {id : commentId}
    })

    if(data == 0){
        throw new Error("Something Get Wrong" , {cause : 409})
    }

    return data
}

export let findOrCreate = async ({userId , postId , content})=>{
    
    const [foundComment, created] = await commentModel.findOrCreate({
            where : {
                postId : postId,
                userId : userId,
                content : content
            }
        })

    return {comment: foundComment,created } ;
}

export const search = async ({ word }) => {
    const found = await commentModel.findAndCountAll({
        where: {
            content: { [Op.like]: `%${word}%` }
        }
    })

    if(found.count == 0){
        throw new Error("No Comments Found" , {cause : 404})
    }

    return found
}

export const getNewest = async ({ postId }) => {
    const foundPost = await postModel.findByPk(postId);
    if (!foundPost) {
        throw new Error("Post not found.", { cause: 404 });
    }

    let comment = commentModel.findAll({
        attributes: ["id", "content", "createdAt"],
        where: { postId },
        order: [["createdAt", "DESC"], ["id", "DESC"]],
        limit: 3,
    })
    return comment;
}

export const getDetails = async ({id})=>{
    const details = await commentModel.findByPk(id , {
        attributes: ["id", "content"],
        include : [
            {model : userModel , attributes : ["id", "name", "email"]},
            {model : postModel , attributes : ["id", "title", "content"]},
        ]
    })

    if (!details) {
        throw new Error("No Comment Found.", { cause: 404 });
    }

    return details;
}