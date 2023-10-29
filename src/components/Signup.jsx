"use client"
import React, { useEffect, useState } from 'react'
import Input from './Input';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/features/userSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Signup = () => {
    const router = useRouter();

    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [usernameFetchStatus, setUsernameFetchStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, watch, clearErrors, setError, formState: { errors } } = useForm();

    const dispatch = useDispatch();

    const handleSignup = async ({ username, email, password, fullname, phone, }) => {
        if (errors?.email && errors?.phone && errors?.username) { console.log("error xa"); return; }
        console.log("error xaina")
        // function is run only if there are no errors
        // watch can be used to update state(errors) onchange
        // if (usernameFetchStatus === "available") { //change this condition if username availability is checked on change
        setIsSubmitting(true)
        const data = {
            username, email, password
        }
        // console.log(data)

        phone && (data.phone = phone);
        fullname && (data.displayName = fullname);

        try {
            const res = await axios.post("/api/users", data);
            // console.log("RESPONSE > \n", res);
            // console.log("RESPONSE STATUS > \n", res.status);
            if (res.status == 200) {
                // setUsernameFetchStatus("notAvailable")
                const userData = res.data;
                console.log(userData);
                // dispatch(login(userData));

                // toast.success("Account registered successfully! \n Please login to continue.")
                toast.success("Account registered successfully!");
                router.push("/auth/login" );

                // toast("Update your info for getting access to ")

            }
        } catch (error) {
            if (error?.response?.data?.field) {
                const { field, message } = error?.response?.data;
                setError(field, { message })
            } else {
                console.log(error)
            }
        } finally {
            setIsSubmitting(false);
        }



        // }
    }


    const handleUsernameAvailavility = async (inputValue) => {

    }







    return (
        <form className='sm:border-gray-700 sm:border-2 sm:p-5  flex flex-col gap-5 w-full sm:w-[500px] rounded' onSubmit={handleSubmit(handleSignup)}>
            <h2 className='form_title' >Sign Up</h2>
            <div className="input_field_container">
                <Input
                    required
                    register={register}
                    validation={{
                        maxLength: { value: 30, message: "Can't exceed 30 characters" },
                        minLength: { value: 3, message: "Min 3 characters required" },
                        required: "This field is required",
                    }}
                    error={errors?.fullname}
                    type="text"
                    label="full name"
                    value={fullName}
                    setValue={setFullName}
                    classLists="capitalize"
                />

                <Input
                    required
                    register={register}
                    validation={{
                        maxLength: { value: 50, message: "Enter less than 50 characters" },
                        required: "This field is required",
                        pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Enter a valid Email" },
                    }}
                    error={errors?.email}
                    clearErrors={clearErrors}
                    type="email"
                    label="email"
                    value={email}
                    setValue={setEmail}
                    classLists=""
                />

                <Input
                    required
                    register={register}
                    validation={{
                        maxLength: { value: 30, message: "Enter less than 30 characters" },
                        minLength: { value: 5, message: "Minimum 5 characters required" },
                        required: "This field is required",
                        pattern: {
                            value: /^[a-zA-Z][a-zA-Z0-9._]*$/,
                            message: "Only letters, numbers, underscores, and periods."
                        },
                    }}
                    error={errors?.username}
                    clearErrors={clearErrors}
                    type="text"
                    label="username"
                    value={username}
                    customValidation={handleUsernameAvailavility}
                    setValue={setUsername}
                    classLists=""
                    availabilityState={usernameFetchStatus}

                />

                <Input
                    register={register}
                    validation={{
                        pattern: {
                            maxLength: { value: 10, message: "Enter 10 digit phone number." },
                            minLength: { value: 10, message: "Enter 10 digit phone number." },
                            value: /^\d{10}$/,
                            message: "Enter only digits."
                        },
                    }}
                    error={errors?.phone}
                    clearErrors={clearErrors}
                    type="tel"
                    label="phone"
                    value={phone}
                    setValue={setPhone}
                    classLists=""

                />

                <Input
                    required
                    register={register}
                    validation={{
                        required: "This field is required",
                        minLength: { value: 6, message: "Enter 6 characters or more" },
                        pattern: { value: /(?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z]))((?=.*\W)|(?=.*_))^[^ ]+$/, message: "Password must contain letter, symbol & digit" },
                    }}
                    error={errors?.password}
                    type="password"
                    label="password"
                    value={password}
                    setValue={setPassword}
                    classLists=""
                />

                <Input
                    required
                    register={register}
                    password={password}
                    validation={{
                        validate: (fieldValue) => { return fieldValue === password || "Password didn't match" },
                    }}
                    error={errors?.confirmpassword}
                    type="password"
                    label="confirm password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    classLists=""
                />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className={`${isSubmitting || (errors?.email?.message || errors?.phone?.message || errors?.username?.message) && "pointer-events-none"} bg-gray-900 text-white hover:bg-gray-700`} type="submit" >
                {
                    isSubmitting ? (
                        "Signing up..."
                    ) : (
                        "Sign Up"
                    )
                }
            </motion.button>
        </form>
    )
}

export default Signup
