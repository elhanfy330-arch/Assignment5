import { Router } from "express";
import { successResponse } from "../../common/utils/response.js";
import * as service from "./index.js"
export let postRouter = Router()


postRouter.post("/create" ,async (req,res)=>{
    let post = await service.createPost(req.body)
    successResponse({res, post, message : "Post created successfully." , status : 201})
})

postRouter.delete("/user/:userId/post/:postId" ,async (req,res)=>{
    let {userId,postId} =req.params
    let data = await service.deletePost({userId,postId})
    successResponse({res, data, message : "Post deleted." , status : 200})
})

postRouter.get("/details" , async (req,res)=>{
    let data = await service.getDetails()
    successResponse({res, data, message : "Found" , status : 200})
})

postRouter.get("/comment-count" ,async (req,res)=>{
    let data = await service.commentCount()
    successResponse({res, data, message : "Found" , status : 200})
})