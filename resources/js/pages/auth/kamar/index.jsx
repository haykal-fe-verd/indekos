import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/data-table";
import { TableCell, TableRow } from "@/components/ui/table";
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

const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "Nama Kamar", className: "" },
    { name: "Deskripsi Kamar", className: "" },
    { name: "Kategori", className: "" },
    { name: "Luas Kamar", className: "" },
    { name: "Harga Kamar", className: "" },
    { name: "Jenis Sewa", className: "" },
    { name: "@", className: "text-center" },
];

function Kategori({ kamar }) {
    const { delete: destroy, reset } = useForm();

    const handleDelete = (item) => {
        Swal.fire({
            title: "Apakah anda ingin menghapus data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: "#f43f5e",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("kamar.destroy", item.id));
                reset();
            }
        });
    };

    return (
        <AuthLayout>
            <Head title="Kamar" />
            <div className="space-y-4 ">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">Kamar</h2>
                </div>
                <Separator />
                <div className="w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                    <Link
                        href={route("kamar.create")}
                        className={cn(
                            "gap-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        )}
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Tambah Kamar</span>
                    </Link>

                    <DataTable
                        data={kamar}
                        header={header}
                        link={"kamar.index"}
                    >
                        {kamar.data.length !== 0 ? (
                            kamar.data.map((item, index) => (
                                <TableRow key={kamar.from + index}>
                                    <TableCell className="text-center">
                                        {kamar.from + index}
                                    </TableCell>
                                    <TableCell>{item.nama_kamar}</TableCell>
                                    <TableCell>
                                        {item.deskripsi_kamar.substring(0, 50) +
                                            (item.deskripsi_kamar.length > 50
                                                ? " ..."
                                                : "")}
                                    </TableCell>
                                    <TableCell>
                                        {item.kategori.nama_kategori}
                                    </TableCell>
                                    <TableCell>{item.luas_kamar} m</TableCell>
                                    <TableCell>
                                        Rp. {item.harga_kamar}
                                    </TableCell>
                                    <TableCell>{item.jenis_sewa}</TableCell>

                                    <TableCell className="text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="w-5 h-5" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={route(
                                                            "kamar.show",
                                                            item.id
                                                        )}
                                                        className="flex"
                                                    >
                                                        <Eye className="w-4 h-4 mr-3" />
                                                        <span>Lihat</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={route(
                                                            "kamar.edit",
                                                            item.id
                                                        )}
                                                        className="flex"
                                                    >
                                                        <PencilIcon className="w-4 h-4 mr-3" />
                                                        <span>Edit</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                >
                                                    <Trash2 className="w-4 h-4 mr-3" />
                                                    <span>Hapus</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    className="text-center"
                                    colSpan={header.length}
                                >
                                    Tidak ada data untuk ditampilkan
                                </TableCell>
                            </TableRow>
                        )}
                    </DataTable>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Kategori;
