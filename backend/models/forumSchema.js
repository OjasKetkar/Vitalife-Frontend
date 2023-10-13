const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
    forumtitle : {
        type : String,
        required : true
    },
    forumContent : {
        type : String,
        required : true
    },
    forumAuth : {
        type : String,
    },
    forumDate : {
        type : String,
        required : true
    },
    forumReplies : {
        type : String
    }
}) 

const Forum = mongoose.model('FORUM',forumSchema);
module.exports = Forum;