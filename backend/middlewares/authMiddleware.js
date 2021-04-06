import jwt from "jsonwebtoken"
export const isAuth=(req,res,next)=>{
   
    const authorization=req.headers.authorization
    if(authorization){
       
        const token=authorization.slice(7,authorization.length)
        jwt.verify(token,process.env.JWT_SECRET || "somethingsecret",(err,decode)=>{
            if(err){
                res.status(401).send({message:"Invalid Token"})
            }else{
                
                //console.log(decode)
                req.user=decode
                next()
            }
        })
    }else{
        res.status(401).send({message:"Invalid Token"})
    }
}


export const isAdmin=(req,res,next)=>{


    if(req.user && req.user.isAdmin){
 
        next()
    }else{
        res.status(401).send({message:"Invalid Admin Token"})
    }
}


export const isSeller=(req,res,next)=>{
 

    if(req.user && req.user.isSeller){
 
        next()
    }else{
        res.status(401).send({message:"Invalid Seller Token"})
    }
}

export const isSellerOrAdmin=(req,res,next)=>{


    if(req.user && (req.user.isSeller ||req.user.isAdmin) ){
  
        next()
    }else{
        res.status(401).send({message:"Invalid seller/Admin Token"})
    }
}