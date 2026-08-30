import { validationResult } from "express-validator"


export const validate= (res,res,next)=>{
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            message:"les données envoyés sont invalides",
            errors:errors.array()

        })
    }
    next()
}