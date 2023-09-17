import React from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import Lottie from "lottie-react";
import { pickBy } from "lodash";

import GuestLayout from "@/layouts/guest-layout";
import animationData from "@/assets/lottie/hero.json";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardKamarTerbaru from "@/components/card-kamar-terbaru";
import Footer from "@/components/footer";

function Home() {
    const { indekos, kamarTerbaru, kamar } = usePage().props;
    console.log("🚀  kamar:", kamar);
    console.log("🚀  kamarTerbaru:", kamarTerbaru);

    const [isLoading, setIsLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [searchChanged, setSearchChanged] = React.useState(false);

    React.useEffect(() => {
        if (searchChanged) {
            const delaySearch = setTimeout(() => {
                getData();
            }, 500);

            return () => {
                clearTimeout(delaySearch);
            };
        }
        setSearchChanged(true);
    }, [search, setSearchChanged]);

    const getData = () => {
        setIsLoading(true);
        router.get(route("home"), pickBy({ search }), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };
    return (
        <GuestLayout>
            <Head title="Home" />
            <section id="hero" className="bg-white">
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
                            <div className="relative w-full rounded-md">
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

                                <div
                                    className={`absolute ${
                                        search ? "block" : "hidden"
                                    } w-full mt-2 p-2 bg-white border rounded-lg shadow-lg z-10`}
                                >
                                    <ScrollArea className="h-64 ">
                                        {isLoading ? (
                                            <div className="flex items-center justify-center w-full h-full">
                                                <Loader2 className="text-center animate-spin text-primary" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col">
                                                {kamar?.data?.map(
                                                    (item, index) => {
                                                        return (
                                                            <Link
                                                                href="#"
                                                                key={index}
                                                                className="flex gap-5 p-2 my-2 rounded-md hover:bg-primary hover:text-white"
                                                            >
                                                                <div className="w-1/2 ">
                                                                    <img
                                                                        src={`/storage/${item?.foto_kamar[0]?.foto}`}
                                                                        alt="Foto Kamar"
                                                                        className="rounded-md object-cover h-[90px] lg:h-[150px] object-center w-full"
                                                                    />
                                                                </div>
                                                                <div className="flex flex-col w-1/2 ">
                                                                    <h1 className="text-lg font-semibold">
                                                                        {
                                                                            item.nama_kamar
                                                                        }
                                                                    </h1>
                                                                    <h2>
                                                                        {
                                                                            item
                                                                                .kategori
                                                                                .nama_kategori
                                                                        }
                                                                    </h2>
                                                                    <h3>
                                                                        {
                                                                            item.luas_kamar
                                                                        }{" "}
                                                                        m
                                                                    </h3>
                                                                    <h4>
                                                                        {item.fasilitas_kamar?.map(
                                                                            (
                                                                                item
                                                                            ) => (
                                                                                <span>
                                                                                    {" "}
                                                                                    {
                                                                                        item.nama_fasilitas
                                                                                    }{" "}
                                                                                    -
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </h4>
                                                                    <h5>
                                                                        Rp.{" "}
                                                                        {
                                                                            item.harga_kamar
                                                                        }
                                                                    </h5>
                                                                </div>
                                                            </Link>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        )}
                                    </ScrollArea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mb-5 lg:max-w-lg">
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            autoPlay={true}
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                </div>
            </section>
            <section id="kamar-terbaru" className="bg-white">
                <div className="container mx-auto md:px-24 md:py-10 md:flex-row">
                    <h1 className="text-2xl font-semibold capitalize text-stone-600">
                        Rekomendasi Kos Terbaru
                    </h1>
                    <div className="grid grid-cols-4 gap-5 mt-5">
                        {kamarTerbaru.map((item, index) => {
                            return (
                                <CardKamarTerbaru item={item} index={index} />
                            );
                        })}
                    </div>
                </div>
            </section>
            <Footer />
        </GuestLayout>
    );
}

export default Home;
