import React from "react";
import { usePage } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import moment from "moment/moment";

const PrintComponent = React.forwardRef((props, ref) => {
    const { data } = props;
    const { indekos } = usePage().props;
    console.log("🚀  data:", data);

    return (
        <div ref={ref} className="p-5 print-table">
            <div className="flex flex-row items-center justify-center w-full">
                <img
                    src={`/storage/${indekos?.logo}`}
                    className="relative rounded-full w-44 h-44"
                />
            </div>
            <Separator className={cn("mt-2")} />
            <table className="w-full divide-y divide-gray-200">
                <tbody>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Invoice</td>
                        <td>: {data?.invoice}</td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Nama</td>
                        <td>: {data?.penyewa?.user?.name}</td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Umur</td>
                        <td>: {data?.penyewa?.umur} Tahun</td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Nama Kamar</td>
                        <td>: {data?.kamar?.nama_kamar} Tahun</td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Kategori</td>
                        <td>: {data?.kamar?.kategori?.nama_kategori}</td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Luas Kamar</td>
                        <td>
                            : {data?.kamar?.luas_kamar} m<sup>2</sup>
                        </td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Jenis Sewa</td>
                        <td className="capitalize">
                            : {data?.kamar?.jenis_sewa}
                        </td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Alamat Kamar</td>
                        <td className="capitalize">
                            : {data?.kamar?.lokasi_kamar}
                        </td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Harga</td>
                        <td className="capitalize">
                            : Rp. {data?.kamar?.harga_kamar},-
                        </td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Via Pembayaran</td>
                        <td>: {data?.via}</td>
                    </tr>
                    <tr className="bg-gray-100 even:bg-white">
                        <td>Tanggal</td>
                        <td>
                            : {moment(data?.created_at).format("DD-MM-YYYY")}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});

export default PrintComponent;
