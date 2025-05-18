const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    image:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true});

const News = mongoose.model('news', newsSchema)

module.exports = News