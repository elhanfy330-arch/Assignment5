import express from "express"
import { PORT } from "./config/config.service.js"
import {connect} from "./database/connection.js"
import "./database/model/index.js"
import {errorHandeller} from "./common/utils/errorHandeller.js"
import * as Routers from "./module/index.js"

let app = express()
app.use(express.json())

await connect()

app.use("/user" ,Routers.userRouter)
app.use("/post" ,Routers.postRouter)
app.use("/comment",Routers.commentRouter)




app.use(errorHandeller)
app.listen(PORT,()=>{
    console.log("Server Listen On Port",PORT)
})  