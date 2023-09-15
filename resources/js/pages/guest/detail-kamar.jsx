import React from "react";
import { Head } from "@inertiajs/react";
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import GuestLayout from "@/layouts/guest-layout";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Bitcoin } from "lucide-react";
import { cn } from "@/lib/utils";

function DetailKamarGuest({ kamar }) {
    console.log("🚀  kamar:", kamar);

    const [showFullDescription, setShowFullDescription] = React.useState(false);
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <GuestLayout>
            <Head title="Detail Kamar" />
            <section id="detail-kamar" className="bg-white">
                <div className="container flex flex-col gap-10 py-10 mx-auto lg:px-24 lg:flex-row">
                    <div className="w-full h-full rounded-md shadow-lg lg:w-1/2">
                        <Swiper
                            modules={[
                                Navigation,
                                Pagination,
                                Scrollbar,
                                A11y,
                                Autoplay,
                            ]}
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            style={{
                                "--swiper-pagination-color": "#f43f5e",
                                "--swiper-navigation-color": "#f43f5e",
                                "--swiper-scrollbar-color": "#f43f5e",
                            }}
                        >
                            {kamar?.foto_kamar?.map((item, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="w-full rounded-md"
                                >
                                    <div className="relative w-full rounded-md shadow-lg">
                                        <img
                                            src={`/storage/${item.foto}`}
                                            alt={`FotoKamar${index}`}
                                            className="w-full h-[400px] object-cover object-center"
                                        />
                                        <span className="absolute z-10 px-3 py-1 text-xs text-white rounded-md top-2 left-2 bg-primary ">
                                            {kamar.kategori.nama_kategori}
                                        </span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="flex flex-col w-full text-stone-600">
                        <h1 className="text-3xl font-semibold ">
                            {kamar.nama_kamar}
                        </h1>
                        <h2>{kamar.lokasi_kamar}</h2>
                        <p className="text-xs text-gray-400">
                            {kamar.fasilitas_kamar?.map((i, idx) => {
                                return (
                                    <span key={idx}>
                                        {" "}
                                        {i.nama_fasilitas} &#x2022;
                                    </span>
                                );
                            })}
                        </p>
                        <Separator className="my-5" />

                        <p>
                            <span className="font-semibold">
                                Luas &ensp;&ensp;&ensp;&ensp;&ensp;:{" "}
                            </span>
                            {kamar.luas_kamar} m
                        </p>
                        <p className="font-semibold">Deskripsi &ensp;:</p>
                        <p className="text-justify">
                            {showFullDescription
                                ? kamar?.deskripsi_kamar
                                : `${kamar?.deskripsi_kamar.slice(0, 150)}${
                                      kamar?.deskripsi_kamar.length > 150
                                          ? "..."
                                          : ""
                                  }`}
                        </p>
                        {kamar?.deskripsi_kamar.length > 150 && (
                            <button
                                onClick={toggleDescription}
                                className="my-3 underline cursor-pointer text-primary w-fit"
                            >
                                {showFullDescription
                                    ? "Read Less"
                                    : "Read More"}
                            </button>
                        )}
                        <p className="mt-3 text-lg font-semibold text-cut">
                            <span className="text-primary">Rp.</span>
                            <span>
                                {" "}
                                {kamar.harga_kamar.toLocaleString("id-ID")}
                            </span>
                            <span>
                                {" "}
                                /{" "}
                                {kamar.jenis_sewa === "tahunan"
                                    ? "Tahun"
                                    : "Bulan"}
                            </span>
                        </p>

                        <Separator className="my-5" />

                        <Button className={cn("gap-3 flex flex-row")}>
                            <Bitcoin />
                            <span className="font-semibold">Sewa Sekarang</span>
                        </Button>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

export default DetailKamarGuest;
