import React from 'react';
import Header from "@/components/header";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const Layout = async ({ children}: {children: React.ReactNode}) => {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session?.user) redirect('/sign-in');

    //else if the user does exist then we can create a user object
    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }
    return (
        <main className="min-h-screen text-gray-400">
            {/* We will add a header component later on here */}
            <Header user={user} />
            <div className="container py-10">
                {children}
            </div>

        </main>
    );
};

export default Layout;