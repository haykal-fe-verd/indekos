import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/data-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Eye,
    MoreVertical,
    PencilIcon,
    PlusCircle,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Kategori({ kamar }) {
    return (
        <AuthLayout>
            <Head title="Detail Kamar" />
            <div className="space-y-4 ">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Detail Kamar
                    </h2>
                </div>
                <Separator />
                <div className="w-full p-5 bg-white rounded-md shadow-md">
                    <div className="w-full">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                        >
                            {kamar.foto_kamar.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="w-full h-[500px] relative">
                                            <img
                                                src={`/storage/${item.foto}`}
                                                alt={`FotoKamar${index}`}
                                                loading="lazy"
                                                className="absolute inset-0 object-cover object-center w-full h-full lg:object-center"
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>

                    <Separator className="my-10" />

                    <div className="w-full">
                        <h1 className="text-2xl font-bold underline decoration-dashed decoration-primary">
                            Info Kamar :
                        </h1>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={cn("w-1/4")}>
                                        Nama Kamar
                                    </TableCell>
                                    <TableCell>: {kamar?.nama_kamar}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cn("w-1/4")}>
                                        Kategori
                                    </TableCell>
                                    <TableCell>
                                        : {kamar?.kategori?.nama_kategori}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cn("w-1/4")}>
                                        Luas
                                    </TableCell>
                                    <TableCell>
                                        : {kamar?.luas_kamar} m
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cn("w-1/4")}>
                                        Harga
                                    </TableCell>
                                    <TableCell>
                                        : Rp. {kamar?.harga_kamar}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cn("w-1/4")}>
                                        Jenis Sewa
                                    </TableCell>
                                    <TableCell className={cn("capitalize")}>
                                        : {kamar?.jenis_sewa}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cn("w-1/4")}>
                                        Lokasi
                                    </TableCell>
                                    <TableCell>
                                        : {kamar?.lokasi_kamar}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cn("w-1/4")}>
                                        Deskripsi
                                    </TableCell>
                                    <TableCell>
                                        : {kamar?.deskripsi_kamar}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <Separator className="my-10" />

                    <div className="w-full">
                        <h1 className="text-2xl font-bold underline decoration-dashed decoration-primary">
                            Fasilitas :
                        </h1>
                        <ul className="mt-5 ml-5 list-decimal">
                            {kamar?.fasilitas_kamar.map((item, index) => {
                                return (
                                    <li key={index}>{item.nama_fasilitas}</li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="w-full mt-20">
                        <Link
                            href={route("kamar.index")}
                            className="inline-flex items-center justify-center h-10 gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Kategori;
