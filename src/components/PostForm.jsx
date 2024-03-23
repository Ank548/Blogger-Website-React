import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import appwriteService from '../appwrite/Service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import slugify from 'react-slugify';
import { RTE, Select, Input, Button, Loader } from './index';

function PostForm({ post }) {

    const [loader, setLoader] = useState(false)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })

    const submit = async (data) => {
        setLoader(true)
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                await appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(
                post.$id,
                {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage
                }
            )

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
            else {
                setLoader(false)
            }
        }
        else {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                data.featuredImage = file.$id
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
                else {
                    setLoader(false)
                }
            }

        }
    }

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugify(value.title).slice(0, 36))
            }
        })
        return () => subscription.unsubscribe()

    }, [watch, slugify])

    return loader ? (<Loader />) : (
        <div>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label='Title: '
                        placeholder='Title'
                        className="mb-4"
                        {...register('title', {
                            required: 'Title is required'
                        })}
                    />

                    <Input
                        label='Slug: '
                        placeholder='Slug'
                        readOnly
                        className="mb-4"
                        {...register('slug', {
                            required: 'Slug is required'
                        })}
                        onInput={(e) => setValue('slug', slugify(e.target.value).slice(0, 36), { shouldValidate: true })}
                    />

                    <RTE
                        name='content'
                        label='Content: '
                        defaultValue={getValues('content')}
                        control={control}
                    />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label='FeaturedImage: '
                        type='file'
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register('image', {
                            required: post ? false : 'FeaturedImage is required'
                        })}
                    />

                    {post &&
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg" />
                        </div>
                    }
                    <Select
                        name='Status'
                        options={['active', 'inactive']}
                        className="mb-4"
                        {...register('status', {
                            required: true
                        })}
                    />

                    <Button type='submit' bgColor={post ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"} className="w-full">
                        {post ? 'Update' : 'Submit'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PostForm
