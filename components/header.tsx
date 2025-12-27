import React from 'react';
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";

const Header = () => {
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="TrendTok logo" width={140} height={32} className="h-8 w-auto cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    {/*Nav Items!*/}
                    <NavItems/>
                </nav>
                {/* User Dropdown components*/}
                <UserDropdown/>
            </div>

        </header>
    );
};

export default Header;