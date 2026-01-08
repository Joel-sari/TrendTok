'use server';

import {connectToDatabase} from "@/database/mongoose";

export const getAllUsersForNewsEmail = async () => {
    try{
        // Remember we have to do this because we are in a serverless env, meaning
        //for every new server action we to reconnect to the db
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;

        if(!db) throw new Error(`MongoDB connection failed`);

        const users = await db.collection('user').find(
            //we want to find it based of the email criteria
            { email: {$exists: true, $ne: null}},
            { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 } }
        ).toArray();

        //returning users and filter out only the users that have for which we have the name and the email
        return users.filter((user) => user.email && user.name).map((user)=> (
            {
                id: user.id || user._id?.toString() || '',
                email: user.email,
                name: user.name
            }

        ))


    }
    catch(e){
        console.error('Error fetching users for news email.', e);
        return []
    }
}