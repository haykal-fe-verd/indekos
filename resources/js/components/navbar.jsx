import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { LogIn } from "lucide-react";

import { navigationsGuest } from "@/data/navigations-guest";
import { cn } from "@/lib/utils";
import MobileNavbar from "@/components/mobile-navbar";

function Navbar() {
    const { indekos } = usePage().props;

    return (
        <header className="sticky inset-x-0 top-0 z-50 w-full bg-white border ">
            <nav className="container p-6 mx-auto lg:px-8">
                <div className="flex items-center justify-between">
                    <Link
                        href={route("home")}
                        className="flex flex-row items-center gap-3"
                    >
                        <span className="text-2xl font-semibold tracking-wider text-primary">
                            Indekos
                        </span>
                    </Link>

                    <div className="flex lg:hidden">
                        <MobileNavbar />
                    </div>

                    <div className="hidden gap-5 lg:flex lg:flex-row lg:items-center">
                        {navigationsGuest.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex">
                        <Link
                            href={route("login")}
                            className="flex items-center gap-3 px-4 py-2 border rounded-md border-primary text-primary hover:shadow-md hover:shadow-primary hover:font-bold"
                        >
                            <LogIn />
                            <span>Masuk</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
