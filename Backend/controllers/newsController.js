const News = require("../models/newsModel");

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
    console.log(req.user)

    let newNews = await News.create({...data, author:req.user._id});
    res.status(201).send(newNews)
}

const updateNews = async(req,res)=>{
    let id = req.params.id;
    let data = req.body;

    let updatedNews = await News.findByIdAndUpdate(id,data,{new:true})
    res.status(201).send(updatedNews)
}

const deleteNews = async(req,res)=>{
    let id = req.params.id;
    let deletedNews = await News.findByIdAndDelete(id)

    if(!deletedNews){
        return res.status(400).send("no news found to delete")
    }
    res.send("news deleted")
}

module.exports = {getAllnews, createNews, updateNews, deleteNews,getMyNews}