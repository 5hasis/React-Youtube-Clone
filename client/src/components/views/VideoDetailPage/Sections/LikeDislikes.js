import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislike(props) {

    let variable = {}

    if(props.video){
        variable = {videoId : props.videoId, userId : props.userId}
    }else {
        variable = {commentId : props.commentId, userId : props.userId}
    }

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    useEffect(() => {

        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                console.log('getLikes',response.data)

                if (response.data.success) {
                    //비디오/댓글이 얼마나 많은 좋아요를 받았는지
                    setLikes(response.data.likes.length)

                    //내가 좋아요 버튼을 눌렀는지 아닌지
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {//response.data.likes 여기에 내가 누른 좋아요 정보가 있다면
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })

        
            Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                console.log('getLikes',response.data)

                if (response.data.success) {
                    //비디오/댓글이 얼마나 많은 싫어요를 받았는지
                    setDislikes(response.data.dislikes.length)

                    //내가 싫어요 버튼을 눌렀는지 아닌지
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get dislikes')
                }
            })

    },[])


    const onLike = () => {

        if (LikeAction === null) {

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //싫어요 버튼이 이미 클릭되어 있다면
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }

                    } else {
                        alert('좋아요를 올리지 못하였습니다')
                    }
                })
        } else {

            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('좋아요를 내리지 못하였습니다')
                    }
                })
        }
    }

    const onDisLike = () => {

        if (DislikeAction !== null) {

            Axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('싫어요를 내리지 못하였습니다')
                    }
                })

        } else {

            Axios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('싫어요를 올리지 못하였습니다')
                    }
                })

        }
    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDisLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislike
