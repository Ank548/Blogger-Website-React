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
                <div className="w-full flex justify-center mb-4 relative p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 hover:bg-green-600">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="hover:bg-red-600" onClick={Delete}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold dark:text-slate-900">{post.title}</h1>
                </div>
                <div className="browser-css" ref={RTETheme}>
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    )) : null;


}

export default Post
