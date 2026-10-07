import { Op, where } from "sequelize";
import { userModel, commentModel, postModel } from "../../database/model/index.js";
import { sequelize } from "../../database/connection.js";

export const createPost = async ({title, userId, content})=>{
    const post = new postModel({title, userId, content})
    console.log(post)
    await post.save()
}

export const deletePost = async ({userId,postId})=>{
    const post = await postModel.findByPk(postId)
    if(!post){
        throw new Error("Post Not Found" , {cause : 404})
    }

    if(post.userId != userId){
        throw new Error("You are not authorized to delete this post.", { cause: 403 });
    }

    await postModel.destroy({
        where :{
            id : postId
        }
    })
}

export const getDetails = async () => {
    const details = await postModel.findAll({
        attributes: ["title", "id"],
        include: [
            {model: userModel,attributes : ["name"]},
            {model: commentModel,attributes : ["id", "content"]}
        ],
    });

    return details;
};

export const commentCount = async () =>{
    const posts = await postModel.findAll({
        attributes: [
            "id",
            "title",
            [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentCount"],
        ],
        include: [{ model: commentModel, attributes: [] }],
        group: ["post.id"],
    });

    return posts;
}