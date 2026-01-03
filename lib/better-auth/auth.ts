import { betterAuth } from "better-auth";

//This is an import from better auth where we export an instance of authentication by providung the betterAuthOptions

import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase} from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js"

//Singleton instance, ensures we only create on instance and improves performance
let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if (authInstance) return authInstance;

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if(!db) throw new Error("MongoDB connection error");
    //We want to define the type of adapter for our database that we intend to be using
    authInstance = betterAuth({

        /* So what are we doing exactly?

        We are setting up BetterAuth, so that it will automatically handle the user collection creation in MongoDB.
        It will also manage the session's collection, it'll manage the accounts using the Oauth providers, it will also manage the
        password and email verification/hashing and wil automatically update the schema (Thanks to mongodbAdapter)
         */




        database: mongodbAdapter(db as any),

        secret: process.env.BETTER_AUTH_SECRET,

        baseURL: process.env.BETTER_AUTH_URL,

        emailAndPassword: {
            enabled: true,
            disabledSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        //Cookie handling plugins
        plugins : [nextCookies()]



    });
    return authInstance;
}
export const auth = await getAuth();