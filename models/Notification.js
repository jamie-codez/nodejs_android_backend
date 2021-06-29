const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
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
        max:500
    },
    notify:{
        type:Boolean,
        default:false
    },
    notificationDate:{
        type:Date,
        default:Date.now
    },
    notificationTime:{
        type:VarDate,
        default:VarDate.now
    }
});

module.exports = mongoose.model("Notification",notificationSchema);