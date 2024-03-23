import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/Service';
import { PostForm, Container } from '../components';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams()

    useEffect(() => {
        ; (async () => {
            if (slug) {
                let post = await appwriteService.getPost(slug)
                if (post) {
                    setPost(post)
                }
            }
        })()
    }, [])


    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
