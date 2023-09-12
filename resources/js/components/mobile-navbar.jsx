import React from "react";
import { LogIn, Menu } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigationsGuest } from "@/data/navigations-guest";

function MobileNavbar() {
    const { indekos } = usePage().props;
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="md:hidden" />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="p-5 text-white bg-slate-900 flex flex-col justify-between"
            >
                <div>
                    <Link
                        href={route("home")}
                        className="-m-1.5 p-1.5 flex flex-col items-center gap-5"
                    >
                        <img
                            src={`/storage/${indekos?.logo}`}
                            alt="Logo"
                            className="w-10 h-10"
                        />
                        <h1 className="text-primary font-semibold tracking-wider text-2xl">
                            Indekos
                        </h1>
                    </Link>
                    <div className="flex flex-col mt-16 space-y-5">
                        {navigationsGuest.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm leading-6 "
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <Link
                        href={route("login")}
                        className="border py-2 px-4 border-primary rounded-md text-primary hover:shadow-md hover:shadow-primary flex gap-3 justify-center hover:font-bold items-center text-center flex-row"
                    >
                        <LogIn />
                        <span>Masuk</span>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNavbar;
