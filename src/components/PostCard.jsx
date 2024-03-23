import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/Service'

function PostCard({ $id, featuredImage, title }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full p-4'>
                <div className='w-full justify-center mb-4 h-40'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='w-full h-full object-cover' />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
