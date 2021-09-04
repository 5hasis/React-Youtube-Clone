const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================


router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if(err) return res.json({success:false, err})

        //comment에는 writer의 아이디밖에 없음
        //save()했을 때는 populate() 못씀
        Comment.find({'_id':comment._id}) //comment에서 id 가져와서 그 id를 이용해 populate를 통한 writer의 모든 정보 가져오기
            .populate('writer')
            .exec((err, result) => {
                if(err) return res.json({success:false, err})
                res.status(200).json({success : true, result })
            })
    })
});

router.post("/getComments", (req, res) => {

    Comment.find({"postId": req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if(err) return res.json({success:false, err})
            res.status(200).json({success : true, comments })
        })

});




module.exports = router;