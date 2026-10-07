export const successResponse = ({
    data , status = 200 , message , res
})=>{
    res.status(status).json({
        message,
        data
    })
}