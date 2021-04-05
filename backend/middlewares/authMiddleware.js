import jwt from "jsonwebtoken"
export const isAuth=(req,res,next)=>{
    console.log("at isAuth")
    const authorization=req.headers.authorization
    if(authorization){
        console.log("authorization token accepted")
        const token=authorization.slice(7,authorization.length)
        jwt.verify(token,process.env.JWT_SECRET || "somethingsecret",(err,decode)=>{
            if(err){
                res.status(401).send({message:"Invalid Token"})
            }else{
                console.log("user founded")
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
    console.log("at isAdmin midlwr")
console.log(req.user.isAdmin)
    if(req.user && req.user.isAdmin){
    console.log("isAdmin true")
        next()
    }else{
        res.status(401).send({message:"Invalid Admin Token"})
    }
}