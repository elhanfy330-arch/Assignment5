import {Router} from "express"
import * as service from "./comment.service.js"
import { successResponse } from "../../common/utils/response.js"

export let commentRouter = Router()

commentRouter.post("/create" ,async (req,res)=>{
    let data = await service.addComment(req.body)
    successResponse({res, message : "comment created"})
})

commentRouter.patch("/:commentId" , async (req,res)=>{
    let data = await service.updateComment(req.params , req.body)
    successResponse({res, message : "Comment Updated successfully." , status : 200})
})

commentRouter.post("/find-or-create" , async (req,res)=>{
    let data = await service.findOrCreate(req.body)
    successResponse({res, data , status :Number(`${data.created ? 201 : 200}`)})

})

commentRouter.get("/search" , async (req,res)=>{
    let data = await service.search(req.query)
    successResponse({res, data, status : 200})
})

commentRouter.get("/newest/:postId", async (req,res)=>{
    let data = await service.getNewest(req.params)
    successResponse({res, data, status : 200})
})

commentRouter.get("/details/:id", async (req,res)=>{
    let data = await service.getDetails(req.params)
    successResponse({res, data, status : 200})
})