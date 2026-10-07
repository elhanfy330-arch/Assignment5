import { Router } from "express";
import * as service from "./user.service.js";
import { successResponse } from "../../common/utils/response.js";
export let userRouter = Router()



userRouter.post("/signup", async (req, res) => {
    let data = await service.signup(req.body);
    successResponse({res, data, message :"User added successfully"})
});


userRouter.put("/:id", async (req, res) => {
    const data = await service.update(req.params, req.body);

    successResponse({ res, message: `User ${data.created ? "Created" : "Updated"} successfully`});
});

userRouter.get("/by-email" ,async (req,res)=>{
    let data = await service.getByEmail(req.query)
    if(data.length == 0){
        throw new Error("Not Found")
    }
    successResponse({res , data , message : "Found"})
})

userRouter.get("/:id" ,async (req,res)=>{
    let data = await service.getByPk(req.params)
    if(data.length == 0){
        throw new Error("Not Found")
    }
    successResponse({res , data , message : "Found"})
})

