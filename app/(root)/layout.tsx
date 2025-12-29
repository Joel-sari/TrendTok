import React from 'react';
import Header from "@/components/header";
import Home from "@/app/(root)/page";

//Accpe
const Layout = ({ children}: {children: React.ReactNode}) => {
    return (
        <main className="min-h-screen text-gray-400">
            {/* We will add a header component later on here */}
            <Header />
            <div className="container py-10">
                <Home/>
            </div>
            Layout
        </main>
    );
};

export default Layout;