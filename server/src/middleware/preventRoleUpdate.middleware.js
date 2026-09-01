

export const preventRoleUpdate=(req,res,next)=>{
    if(req.body.role){
        delete req.body.role
    }
    if(req.body.email){
        delete req.body.email
    }
    if(req.body.motDePase){
        delete req.body.motDePase
    }
    next()
   
}