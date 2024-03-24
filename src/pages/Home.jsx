import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/Service';
import { PostCard, Container, Loader } from '../components';
import { useSelector } from 'react-redux';

function Home() {

    const [posts, setPosts] = useState([]);
    // const [loader, setLoader] = useState(true)
    const userStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (userStatus) {
            ; (async () => {
                let posts = await appwriteService.getPosts()
                if (posts) {
                    setPosts(posts.documents)
                }
            })()
        }
        // setLoader(false)
    }, [userStatus])

    // if (userStatus) {

    if (posts.length > 0) {
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
    // else {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             No Posts Available
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }
    // }
    else {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home
