import jwt from "jsonwebtoken"

 const JWT_RANDON_STRING ="abcd"

export const allverifytoken =(req,res,next) =>{

    const token = req.header('authentication')
    if(!token){
        return res.status(400).send({errors:"token not present"})
    }
    try{
        const decoded = jwt.verify(token, JWT_RANDON_STRING)
        req.id= decoded.id
    //     console.log(req.id)
     }
    catch(errors)
    {
        return res.status(400).send({errors:"please authenticte using valid token"})
        
    }
    
    next()
} ;