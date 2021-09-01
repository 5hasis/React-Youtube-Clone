import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const CatogoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

function UploadVideoPage(props) {
    const user = useSelector(state => state.user);

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")


    const onTitleChange = (event) => {
        // console.log(event.currentTarget)
        setTitle(event.currentTarget.value)
    }

    const onDecsriptionChange = (event) => {
        //console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }

    const onPrivateChange  = (event) => {
        setPrivate(event.currentTarget.value)
    }

    const onCatogoryChange = (event) => {
        setCategory(event.currentTarget.value)
    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)

                    //gerenate thumbnail with this filepath ! 

                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                console.log(response.data)
                                setDuration(response.data.fileDuration) // video.js에서 지정한 이름과 동일해야함
                                setThumbnailPath(response.data.url)
                            } else {
                                alert('썸네일 생성 실패');
                            }
                        })


                } else {
                    alert('비디오 업로드 실패.')
                }
            })

    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: title,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        }

        Axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    
                    message.success('성공적으로 업로드 완료!')
                    setTimeout(()=>{
                        props.history.push('/')
                    },2000); //2초 뒤에 '/'으로 이동

                } else {
                    console.log("실패ㅠ")
                    alert('비디오 업로드 실패ㅠ')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>

                    {ThumbnailPath !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="Thumbnail" />
                        </div>
                    }
                </div>

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={onDecsriptionChange}
                    value={Description}
                />
                <br /><br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <select onChange={onCatogoryChange}>
                    {CatogoryOptions.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
            </Button>

            </Form>
        </div>
    )
}

export default UploadVideoPage