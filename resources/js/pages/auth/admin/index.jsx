import React from "react";
import { Head, usePage } from "@inertiajs/react";
import moment from "moment/moment";

import { Separator } from "@/components/ui/separator";
import AuthLayout from "@/layouts/auth-layout";
import { TableCell, TableRow } from "@/components/ui/table";
import DataTable from "@/components/data-table";

const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "Invoice", className: "" },
    { name: "Tanggal dibuat", className: "" },
    { name: "Nama Kamar", className: "" },
    { name: "Harga Kamar", className: "" },
    { name: "Jenis Sewa", className: "" },
    { name: "Status", className: "text-center" },
];

function AdminTransaksiPage() {
    const { transaksi } = usePage().props;
    return (
        <AuthLayout>
            <Head title="Transaksi" />
            <div className="p-5 space-y-4 bg-white rounded-md shadow-md ">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Transaksi
                    </h2>
                </div>
                <Separator />
                <div className="w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                    <DataTable
                        data={transaksi}
                        header={header}
                        link={"transaksi.index"}
                    >
                        {transaksi.data.length !== 0 ? (
                            transaksi.data.map((item, index) => (
                                <TableRow key={transaksi.from + index}>
                                    <TableCell className="text-center">
                                        {transaksi.from + index}
                                    </TableCell>

                                    <TableCell>{item.invoice}</TableCell>
                                    <TableCell>
                                        {moment(item.created_at).format(
                                            "DD-MM-YYYY"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.kamar.nama_kamar}
                                    </TableCell>
                                    <TableCell>
                                        Rp. {item.kamar.harga_kamar}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {item.kamar.jenis_sewa}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {item.status === "1" && (
                                            <span className="px-4 py-1 text-white bg-yellow-500 rounded-md">
                                                Menunggu
                                            </span>
                                        )}

                                        {item.status === "2" && (
                                            <span className="px-4 py-1 text-white bg-blue-500 rounded-md">
                                                Berhasil
                                            </span>
                                        )}

                                        {item.status === "3" && (
                                            <span className="px-4 py-1 text-white rounded-md bg-violet-500">
                                                Kadaluarsa
                                            </span>
                                        )}

                                        {item.status === "4" && (
                                            <span className="px-4 py-1 text-white bg-red-500 rounded-md">
                                                Batal
                                            </span>
                                        )}
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

export default AdminTransaksiPage;
