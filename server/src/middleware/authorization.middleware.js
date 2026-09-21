
export const authorizationCheck = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:"accès refusé, vous n'avez pas l'autorisation"
            })
        }
        next()
    }
}