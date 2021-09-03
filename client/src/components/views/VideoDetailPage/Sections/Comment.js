import React, { useState } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'

function Comment(props) {

    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const user = useSelector(state => state.user); //redux store에서 확인 State -> user
    const videoId = props.postId

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result) //route에서 보낸 result랑 이름 같아야함!
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('댓글 저장 실패')
                }
            })
    }


    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />
            {/* Comment Lists  */}
            

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comment
