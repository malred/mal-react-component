import {useState} from "react";
import axios from 'axios'


export const Upload = (props) => {
    const {
        onUpload,
        authorization,
        action,
        onSuccess,
        onError,
        ...rest
    } = props

    const [is_dragover, setDragover] = useState(false)
    const [uploads, setUploads] = useState([])

    function upload(e) {
        setDragover(false)
        const files = [...e.dataTransfer.files]
        files.forEach(file => {
            // if (file.type != 'audio/mpeg') {
            //   return
            // }
            // 保存到队列
            // 一个元素表示一个进度条数据
            // 当前上传的文件的索引
            const uploadIndex = uploads.length
            // 一个元素表示一个进度条数据
            setUploads([...uploads, {
                current_progress: 0,
                name: file.name,
                variant: 'bg-blue-400',
                icon: 'fas fa-spinner fa-spin',
                text_class: ''
            }])
            // 上传逻辑应该用户传
            if (onUpload) {
                // 传递当前文件,  (后两个用于控制进度条样式) 当前文件队列, 当前文件索引
                onUpload(file, uploads, uploadIndex)
            } else {
                window.axiosPromiseArr = []
                // 拦截器, 防止页面跳转后依然继续
                axios.interceptors.request.use(config => {
                    //发起请求时保存页面所有请求
                    config.cancelToken = new axios.CancelToken(cancel => {
                        window.axiosPromiseArr.push({cancel})
                    });
                    return config
                })

                axios.interceptors.response.use(res => {
                    //事件处理
                }, error => {
                    if (axios.isCancel(error)) {
                        // 为了终结promise链 (实际请求不会走到.catch(rej=>{}),这样就不会触发错误提示之类的)
                        return new Promise(() => {
                        });
                    } else {
                        return Promise.reject(error)
                    }
                })

                axios({
                    method: 'post',
                    url: action,
                    data: {
                        file: file
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // 用户可以自己传token
                        'Authorization': localStorage.getItem("authorization") || authorization
                    },
                    onUploadProgress: (progressEvent) => {
                        // if (progressEvent.lengthComputable) {
                        let complete
                        let nextUploads = uploads.map((upload, i) => {
                            if (i === uploadIndex) {
                                upload.current_progress = complete =
                                    (progressEvent.loaded / progressEvent.total * 100).toFixed(1)
                            } else {
                                return upload
                            }
                        })
                        setUploads(nextUploads)
                        // (((progressEvent.loaded / progressEvent.total) * 100) | 0)
                        if (complete >= 100) {
                            // 上传成功
                            let nextUploads = uploads.map((upload, i) => {
                                if (i === uploadIndex) {
                                    upload.variant = "bg-green-400";
                                    upload.icon = "fas fa-check";
                                    upload.text_class = "text-green-400";
                                } else {
                                    return upload
                                }
                            })
                            setUploads(nextUploads)
                        }
                    }
                    // }
                })
                    .catch((error) => {
                        // aop 用户传入处理方法
                        if (onError) onError(error)
                        let nextUploads = uploads.map((upload, i) => {
                            if (i === uploadIndex) {
                                upload.variant = "bg-red-400";
                                upload.icon = "fas fa-times";
                                upload.text_class = "text-red-400";
                            } else {
                                return upload
                            }
                        })
                        setUploads(nextUploads)
                        console.log(error);
                    })
                    // 监听函数才能拿到this.$props
                    .then((response) => {
                        if (onSuccess) onSuccess(response)
                    })
            }
        })
    }

    function dragover() {
        if (is_dragover) {
            return 'bg-green-400 border-green-400 border-solid'
        }
        return ''
    }

    function drag(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragover(true)
    }

    function undrag(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragover(false)
    }

    return (
        <div  {...rest}
              className="bg-white rounded border border-gray-200 relative flex flex-col">
            <div className="p-6">
                {/*Upload Dropbox */}
                <div
                    onDragEnd={undrag}
                    onDragLeave={undrag}
                    onDragOver={drag}
                    onDragEnter={drag}
                    onDrop={upload}
                    className={
                        dragover() +
                        "w-full px-10 py-20 rounded text-center " +
                        "cursor-pointer border border-dashed border-gray-400 " +
                        "text-gray-400 transition duration-500 hover:text-white " +
                        "hover:bg-green-400 hover:border-green-400 hover:border-solid"}
                >
                    <h5>Drop your files here</h5>
                </div>
                <hr className="my-6"/>
                {/*Progess Bars */}
                {uploads.map(upload => (
                    <div className="mb-4" key={upload.name}>
                        {/*File Name */}
                        <div
                            className={"font-bold text-sm " + upload.text_class}>
                            <i className={upload.icon}>
                            </i>
                            {upload.name}
                        </div>
                        <div className="flex h-4 overflow-hidden bg-gray-200 rounded">
                            {/*Inner Progress Bar */}
                            <div
                                className={"transition-all progress-bar" + upload.variant}
                                style={{width: upload.current_progress + '%'}}
                            ></div>
                        </div>
                    </div>))
                }
            </div>
        </div>
    )
}