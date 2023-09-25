import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/data-table";
import { TableCell, TableRow } from "@/components/ui/table";
import moment from "moment/moment";
import { DollarSign, Loader2, Printer } from "lucide-react";
import Swal from "sweetalert2";
import ReactToPrint from "react-to-print";
import PrintComponent from "./print-component";

const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "Invoice", className: "" },
    { name: "Tanggal dibuat", className: "" },
    { name: "Nama Kamar", className: "" },
    { name: "Harga Kamar", className: "" },
    { name: "Jenis Sewa", className: "" },
    { name: "Status", className: "text-center" },
    { name: "Aksi", className: "text-center" },
];

function handlePayment(snapToken) {
    window.snap.pay(snapToken, {
        onSuccess: (result) => {
            console.log("success", result);
            Swal.fire("Sukses", result.status_message, "success");
        },
        onPending: (result) => {
            console.log("🚀  result:", result);
        },
        onError: (result) => {
            console.log("🚀  result:", result);
        },
    });
}

function Transaksi({ transaksi }) {
    React.useEffect(() => {
        const midtransUrl = import.meta.env.VITE_MIDTRANS_URL;
        const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransUrl;
        scriptTag.setAttribute("data-client-key", midtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    const onBayar = async (item) => {
        handlePayment(item.snap_token);
    };

    // print
    const componentRef = React.useRef(null);
    const onBeforeGetContentResolve = React.useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [showData, setShowData] = React.useState(null);

    const handleOnBeforeGetContent = React.useCallback(
        (item) => {
            setShowData(item);
            setLoading(true);
            return new Promise((resolve) => {
                onBeforeGetContentResolve.current = resolve;
                setTimeout(() => {
                    setLoading(false);
                    setShowData(item);
                    resolve();
                }, 2000);
            });
        },
        [setLoading, setShowData]
    );

    const handleBeforePrint = React.useCallback((item) => {
        setShowData(item);
        console.log("`onBeforePrint` called");
    }, []);

    React.useEffect(() => {
        if (
            !showData &&
            typeof onBeforeGetContentResolve.current === "function"
        ) {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, showData]);

    return (
        <AuthLayout>
            <Head title="Transaksi Saya" />
            <div className="space-y-4 ">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Transaksi Saya
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

                                    <TableCell className="flex items-center justify-center text-center">
                                        {item.status === "1" ? (
                                            <button
                                                onClick={() => onBayar(item)}
                                                className="flex items-center justify-center gap-2 px-3 py-1 text-center text-white rounded-md bg-primary"
                                            >
                                                <DollarSign className="w-4 h-4 mr-3" />
                                                Bayar
                                            </button>
                                        ) : (
                                            <ReactToPrint
                                                onBeforeGetContent={() =>
                                                    handleOnBeforeGetContent(
                                                        item
                                                    )
                                                }
                                                onBeforePrint={() =>
                                                    handleBeforePrint(item)
                                                }
                                                trigger={() => (
                                                    <button
                                                        className="flex items-center justify-center gap-2 px-3 py-1 text-center text-white rounded-md bg-primary"
                                                        onClick={() =>
                                                            setShowData(item)
                                                        }
                                                    >
                                                        <>
                                                            <Printer className="w-4 h-4 mr-3" />
                                                            <span>
                                                                Cetak Resi
                                                            </span>
                                                        </>
                                                    </button>
                                                )}
                                                content={() =>
                                                    componentRef.current
                                                }
                                            />
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
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-75">
                    <Loader2 className="animate-spin" />
                </div>
            )}

            <PrintComponent ref={componentRef} data={showData} />
        </AuthLayout>
    );
}

export default Transaksi;
