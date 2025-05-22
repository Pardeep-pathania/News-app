const cloudinary  = require("../config/cloudinary");
const News = require("../models/newsModel");
const fs = require("fs");
require('dotenv').config();

const getAllnews = async(req,res)=>{
    let data = await News.find().populate("author","name");
    res.status(200).send(data);
}

const getMyNews = async(req,res)=>{
    let id = req.user._id;
    let data = await News.find({author:id});
    res.status(200).send(data);
}

const createNews = async(req,res)=>{
    let data = req.body;
   

   let result = await  cloudinary.uploader.upload(req.file.path)

   fs.unlinkSync(req.file.path)
        
   let obj ={
    ...data,
    image:{
        imageUrl:result.secure_url,
        publicId:result.public_id

    },
    author:req.user._id
   }

    let newNews = await News.create(obj);
    res.status(201).send(newNews)
}

const updateNews = async(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let publicId = req.query.publicId;

    let updatedFields = {
        title: data.title,
        description: data.description,
    };

    // If a new image is uploaded, update it on Cloudinary
    if (req.file) {
        // Delete old image from Cloudinary
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
        // Upload new image
        let result = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        updatedFields.image = {
            imageUrl: result.secure_url,
            publicId: result.public_id
        };
    }

    let updatedNews = await News.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(201).send(updatedNews);
}

const deleteNews = async(req,res)=>{
    let id = req.params.id;
    let publicId = req.query.publicId;

    await cloudinary.uploader.destroy(publicId)

    let deletedNews = await News.findByIdAndDelete(id)

    if(!deletedNews){
        return res.status(400).send("no news found to delete")
    }
    res.send("news deleted")
}

module.exports = {getAllnews, createNews, updateNews, deleteNews,getMyNews}