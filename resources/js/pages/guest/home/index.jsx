import React from "react";
import { Head, usePage } from "@inertiajs/react";
import Lottie from "lottie-react";

import GuestLayout from "@/layouts/guest-layout";
import animationData from "@/assets/lottie/hero.json";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

function Home() {
    const { indekos } = usePage().props;

    const [search, setSearch] = React.useState(null);
    return (
        <GuestLayout>
            <Head title="Home" />
            <section id="hero" className="bg-white ">
                <div className="container flex flex-col items-center mx-auto md:px-24 md:py-10 md:flex-row">
                    <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="text-4xl font-extrabold leading-9 tracking-tight md:leading-normal text-primary">
                            Mau cari kos?
                        </h1>
                        <p className="pl-2 pr-2 mb-5 leading-relaxed md:pl-0 dark:text-gray-300">
                            Dapatkan infonya dan langsung sewa di
                            <span className="text-primary">
                                {" "}
                                {indekos.nama}
                            </span>
                            .
                        </p>
                        <div className="w-full">
                            <div className="relative w-full rounded-md ">
                                <button
                                    type="button"
                                    className="absolute inset-y-0 left-0 flex items-center p-5 rounded-tl-md rounded-bl-md bg-primary"
                                >
                                    <Search className="text-white" />
                                </button>
                                <Input
                                    type="search"
                                    id="search"
                                    name="search"
                                    placeholder="Cari nama atau alamat kos ..."
                                    className={cn("h-16 mt-2 shadow-lg pl-20")}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                {/* <div
                                    className={`absolute ${
                                        search ? "block" : "hidden"
                                    } w-full mt-2 p-2 bg-white border rounded-lg shadow-lg`}
                                >
                                    <ScrollArea className="h-64 ">
                                        <div className="flex flex-col">
                                            {searchResult?.map((item) => {
                                                return (
                                                    <Link
                                                        href={route(
                                                            "home.detail.layanan.index",
                                                            item.id
                                                        )}
                                                        key={item.id}
                                                        className="p-2 my-2 rounded-md hover:bg-primary hover:text-white"
                                                    >
                                                        {item.nama_layanan}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </ScrollArea>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="w-full mb-5 lg:max-w-lg ">
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            autoPlay={true}
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

export default Home;

{
    /*
<h2>


.
</h2> */
}
