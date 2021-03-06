const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        //User 모델의 모든 정보를 가져옴
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        maxlength:50
    },
    description: {
        type: String
    },
    privacy: {
        //0 : privacy
        //1 : public
        type: Number
    },
    filePath : {
        type: String
    },
    catogory: String,
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }