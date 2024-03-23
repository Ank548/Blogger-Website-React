import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import authService from '../appwrite/Auth'
import { Input, Button, Logo, Loader } from './index'

function SignUp() {

    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const createAccount = async (data) => {
        setLoader(true);
        setError("");
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login({ userData }))
                }
                navigate('/')
            }
        } catch (error) {
            setLoader(false)
            setError(error.message)
        }

    }
    return loader ? (<Loader />) : (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(createAccount)}>
                    <div className='space-y-5'>
                        <Input
                            label="Name: "
                            placeholder="Enter Your Name"
                            {...register("name", {
                                required: "Name is required"
                            })}
                        />
                        {errors.name && errors.name.message}

                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter Your Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                        />
                        {errors.email && errors.email.message}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter Your Password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^.{6,}$/,
                                    message: "Please enter a valid password"
                                }
                            })}
                        />
                        {errors.password && errors.password.message}

                        <Button
                            type="submit"
                            className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
