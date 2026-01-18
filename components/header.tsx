import React from 'react';
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import {searchStocks} from "@/lib/actions/finnhub.actions";

const Header = async ({user}: {user: User}) => {
    const initialStocks = await searchStocks();
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo.png"
                        alt="TrendTok logo"
                        width={100}
                        height={45}
                        className="h-13 w-auto cursor-pointer"
                    />
                </Link>
                <nav className="hidden sm:block">
                    {/*Nav Items!*/}
                    <NavItems initialStocks={initialStocks} />
                </nav>
                {/* User Dropdown components*/}
                <UserDropdown user= {user} initialStocks={initialStocks}/>
            </div>

        </header>
    );
};

export default Header;