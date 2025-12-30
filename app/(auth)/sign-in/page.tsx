'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";

const SignIn = () => {
    // We are using React built in hook called "Hook Form" for more efficient form handling/submitting
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>( {
        defaultValues:
            {
                email: '',
                password: '',
            },
        mode:'onBlur'
    }, )
    const onSubmit = async(data: SignUpFormData) => {
        try {
            console.log(data);

        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <h1 className="form-title">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    register={register}
                    error={errors.email}
                    validation={{required: 'Please enter a valid email address', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required'}}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{required: 'Password is required' , minLength: 8}}
                />


                {/* INPUTS , we will create a reusable component */}
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In...' : "Sign In"}
                </Button>
                <FooterLink text="Dont have an account?" linkText="Create One" href="/sign-up"/>
            </form>
        </>
    );
};

export default SignIn;