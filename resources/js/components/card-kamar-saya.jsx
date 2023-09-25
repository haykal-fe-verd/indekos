import React from "react";
import { Link } from "@inertiajs/react";
import { addDays, addMonths, differenceInDays, format } from "date-fns";

function CardKamarSaya({ item }) {
    const jenisSewa = item.kamar.jenis_sewa;
    let now = new Date().getTime();
    let updatedAt = new Date(item.updated_at).getTime();

    if (jenisSewa === "tahunan") {
        updatedAt = addDays(updatedAt, 365);
    } else if (jenisSewa === "bulanan") {
        updatedAt = addMonths(updatedAt, 1);
    }
    var distance = updatedAt - now;

    const sisaHari = Math.floor(distance / (1000 * 60 * 60 * 24));
    return (
        <div className="flex flex-col col-span-4 leading-relaxed lg:col-span-1 text-stone-600">
            <div className="relative mb-3">
                <img
                    src={`/storage/${item.kamar.foto_kamar[0]?.foto}`}
                    alt="Foto Kamar"
                    loading="lazy"
                    className="object-cover w-full rounded-md h-[170px]"
                />
                <span className="absolute z-10 px-3 py-1 text-xs text-white rounded-md top-2 left-2 bg-primary ">
                    {item.kamar.kategori.nama_kategori}
                </span>
            </div>
            <h2 className="font-semibold text-cut">{item.nama_kamar}</h2>
            <h3 className="text-cut">{item.lokasi_kamar}</h3>
            <p className="text-xs text-gray-400 text-cut">
                {item.kamar.fasilitas_kamar?.map((i, idx) => {
                    return <span key={idx}> {i.nama_fasilitas} &#x2022;</span>;
                })}
            </p>
            <p className="mt-3 text-lg font-semibold text-cut">
                <span className="text-primary">Rp.</span>
                <span> {item.kamar.harga_kamar.toLocaleString("id-ID")}</span>
                <span>
                    {" "}
                    / {item.kamar.jenis_sewa === "tahunan" ? "Tahun" : "Bulan"}
                </span>
            </p>
            <p className="mt-3 text-lg font-semibold text-cut">
                {sisaHari} Hari tersisa.
            </p>
        </div>
    );
}

export default CardKamarSaya;
