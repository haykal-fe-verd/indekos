import React from "react";
import { Link } from "@inertiajs/react";

function CardKamarTerbaru({ item }) {
    return (
        <Link
            href={route("detail.kamar", item.id)}
            className="flex flex-col col-span-4 leading-relaxed lg:col-span-1 text-stone-600"
        >
            <div className="relative mb-3">
                <img
                    src={`/storage/${item.foto_kamar[0]?.foto}`}
                    alt="Foto Kamar"
                    loading="lazy"
                    className="object-cover w-full rounded-md h-[170px]"
                />
                <span className="absolute z-10 px-3 py-1 text-xs text-white rounded-md top-2 left-2 bg-primary ">
                    {item.kategori.nama_kategori}
                </span>
            </div>
            <h2 className="font-semibold text-cut">{item.nama_kamar}</h2>
            <h3 className="text-cut">{item.lokasi_kamar}</h3>
            <p className="text-xs text-gray-400 text-cut">
                {item.fasilitas_kamar?.map((i, idx) => {
                    return <span key={idx}> {i.nama_fasilitas} &#x2022;</span>;
                })}
            </p>
            <p className="mt-3 text-lg font-semibold text-cut">
                <span className="text-primary">Rp.</span>
                <span> {item.harga_kamar.toLocaleString("id-ID")}</span>
                <span>
                    {" "}
                    / {item.jenis_sewa === "tahunan" ? "Tahun" : "Bulan"}
                </span>
            </p>
        </Link>
    );
}

export default CardKamarTerbaru;
