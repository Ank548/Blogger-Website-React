import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/Service';
import { Container, PostCard } from '../components';

function AllPosts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        ; (async () => {
            let posts = await appwriteService.getPosts()
            if (posts) {
                setPosts(posts.documents)
            }
        })()
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='bg-gray-200 rounded-md m-2 border'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
