import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/Service'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { Container, Button, Loader } from '../components'
import { useRef } from 'react'

function Post() {
    const [post, setPost] = useState(null)
    const [loader, setLoader] = useState(false)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const themeMode = useSelector(state => state.theme.theme)
    const RTETheme = useRef()

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        ; (async () => {
            if (slug) {
                let post = await appwriteService.getPost(slug);
                if (post) {
                    setPost(post)
                }
                else {
                    navigate("/")
                }
            } else {
                navigate("/")
            }

        })()
    }, [slug, navigate])

    useEffect(() => {
        if (RTETheme.current) {
            RTETheme.current.classList.remove("browser-css-theme")
            if (themeMode === "dark") {
                RTETheme.current.classList.add("browser-css-theme")
            } else {
                RTETheme.current.classList.remove("browser-css-theme")
            }
        }
    }, [themeMode, post])

    const Delete = async () => {
        setLoader(true)
        let deleted = await appwriteService.deletePost(slug)
        if (deleted) {
            let deletefile = await appwriteService.deleteFile(post.featuredImage)

            if (deletefile) {
                navigate("/")
            }
            else {
                setLoader(false)
            }
        }
    }

    return post ? (loader ? (<Loader />) : (
        <div className="py-8">
            <Container>
                <div className='flex justify-evenly mb-6 border-y-2'>
                    <div className=" w-1/2 p-2">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="object-cover"
                        />
                    </div>
                    <div className="my-6 w-1/3 relative">
                        <h1 className="text-3xl font-bold">{post.title}</h1>
                        {isAuthor && (
                            <div className="absolute right-1 -bottom-5">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="bg-green-500 mr-2 hover:bg-green-600 text-white px-1 rounded-md text-sm">
                                        Edit
                                    </button>
                                </Link>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-1 rounded-md text-sm" onClick={Delete}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="browser-css pt-2" ref={RTETheme}>
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    )) : null;


}

export default Post
