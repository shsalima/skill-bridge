import { validationResult } from "express-validator"


export const validate= (req,res,next)=>{
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        console.log("Express-Validator Errors:", errors.array());
        return res.status(400).json({
            success:false,
            message:"les données envoyés sont invalides",
            errors:errors.array()

        })
    }
    next()
}