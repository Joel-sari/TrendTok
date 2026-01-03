'use server';

import {transporter} from "@/lib/nodemailer";
import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance,preferredIndustry}: SignUpFormData) => {
    try{
        //Here we will make a call to better Auth that will take care of user creation, password hashing and session creation
        // Done in the mongoDB Collection
        const response = await auth.api.signUpEmail({
            body: { email: email, password: password, name: fullName},
        });

        // after user is successfully registered, we trigger
        //the app user created event to do a background job via
        //inngest to process additional user data and onboarding workflows
        if (response) {
            await inngest.send({
                //background job that
                name: 'app/user.created',
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry
                }

            })
        }
        return { success: true, data:response }

    }
    catch(e){
        console.log('Sign up failed', e)
        return { success: false , error: 'Sign up failed' }

    }
}

export const signOut = async () => {
    try{

        // We will make it so that betterAuth to handle the session clean up and cookie clearinhg
        await auth.api.signOut({ headers: await headers()});
        //clears all logic and invalidate us out

    }
    catch(e){
        console.log('Sign out failed', e)
        return { success: false, error: 'Sign out failed' }
    }
}

export const signInWithEmail = async ({ email, password}: SignInFormData) => {
    try{
        //Here we will make a call to better Auth that will take care of user creation, password hashing and session creation
        // Done in the mongoDB Collection
        const response = await auth.api.signInEmail({
            body: { email: email, password: password},
        });

        // after user is successfully registered, we trigger
        //the app user created event to do a background job via
        //inngest to process additional user data and onboarding workflows
        return { success: true, data: response }

    }
    catch(e){
        console.log('Sign In failed', e)
        return { success: false, error: 'Sign In failed' }

    }
}