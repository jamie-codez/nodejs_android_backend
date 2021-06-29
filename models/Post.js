const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true,
        min:6
    },
    title:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    description:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    mediaUrl:{
        type:String,
        required:false,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Post",postSchema)