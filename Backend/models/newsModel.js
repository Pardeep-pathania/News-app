const mongoose = require('mongoose');
const Users = require('./userModel');

const newsSchema = new mongoose.Schema({
    image:{
        imageUrl:{
            type:String,
            required:true
        },
        publicId:{
            type: String,
            required:true
        }
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
        ref: Users,
        required:true
    }
},{timestamps:true});

const News = mongoose.model('news', newsSchema)

module.exports = News