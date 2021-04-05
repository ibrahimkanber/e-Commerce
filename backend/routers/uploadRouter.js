import multer from "multer";
import express from "express"
import { imageUpload } from "../controlers/uploadController.js";
import {isAuth} from "../middlewares/authMiddleware.js"

const uploadRouter=express.Router("/")

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/")
    },
    filename(req,file,cb){
        cb(null,`${Date.now()}.jpg`)
    }
})

const upload=multer({storage});

uploadRouter.post("/",isAuth,upload.single('image'),(req,res)=>{
    console.log("image")
    res.send(`/${req.file.path}`)
})

export {uploadRouter}

