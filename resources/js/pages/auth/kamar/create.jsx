import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import InputError from "@/components/input-error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function CreateKamar() {
    const { kategori } = usePage().props;
    const [foto, setFoto] = React.useState([""]);
    const [fasilitas, setFasilitas] = React.useState([""]);
    const [imagePreviews, setImagePreviews] = React.useState([]);

    const { data, setData, post, processing, errors, reset } = useForm();

    const addFoto = () => {
        setFoto([...foto, ""]);
    };

    const addFasilitas = () => {
        setFasilitas([...fasilitas, ""]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama_kamar", data.nama_kamar);
        formData.append("luas_kamar", data.luas_kamar);
        formData.append("harga_kamar", data.harga_kamar);
        formData.append("jenis_sewa", data.jenis_sewa);
        formData.append("kategori_id", data.kategori_id);
        formData.append("deskripsi_kamar", data.deskripsi_kamar);
        formData.append("lokasi_kamar", data.lokasi_kamar);

        foto.forEach((file, index) => {
            formData.append(`foto[${index}]`, file);
        });

        fasilitas.forEach((item, index) => {
            formData.append(`nama_fasilitas[${index}]`, item);
        });

        post(route("kamar.store"), formData, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AuthLayout>
            <Head title="Tambah Kamar" />
            <div className="space-y-4 ">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Tambah Kamar
                    </h2>
                </div>
                <Separator />
                <form
                    onSubmit={onSubmit}
                    className="w-full p-5 bg-white rounded-md shadow-md"
                >
                    <div className="grid grid-cols-4 gap-5">
                        {/* nama_kamar */}
                        <div className="col-span-4 lg:col-span-2">
                            <Label htmlFor="nama_kamar">
                                Nama
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="nama_kamar"
                                name="nama_kamar"
                                placeholder="masukkan nama kamar"
                                className="mt-2"
                                value={data.nama_kamar}
                                onChange={(e) =>
                                    setData("nama_kamar", e.target.value)
                                }
                            />
                            <InputError message={errors.nama_kamar} />
                        </div>

                        {/* luas_kamar */}
                        <div className="col-span-4 lg:col-span-1">
                            <Label htmlFor="luas_kamar">
                                Luas
                                <span className="text-rose-500">*</span>
                            </Label>
                            <div className="relative mt-2">
                                <Input
                                    type="text"
                                    id="luas_kamar"
                                    name="luas_kamar"
                                    placeholder="3x3"
                                    className="pr-20"
                                    value={data.luas_kamar}
                                    onChange={(e) =>
                                        setData("luas_kamar", e.target.value)
                                    }
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary">
                                    m
                                </span>
                            </div>
                            <InputError message={errors.luas_kamar} />
                        </div>

                        {/* harga_kamar */}
                        <div className="col-span-4 lg:col-span-1">
                            <Label htmlFor="harga_kamar">
                                Harga
                                <span className="text-rose-500">*</span>
                            </Label>
                            <div className="relative mt-2">
                                <Input
                                    type="number"
                                    min={0}
                                    id="harga_kamar"
                                    name="harga_kamar"
                                    placeholder="550000"
                                    className="pl-16"
                                    value={data.harga_kamar}
                                    onChange={(e) =>
                                        setData("harga_kamar", e.target.value)
                                    }
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center p-3 text-white rounded-tl-md rounded-bl-md bg-primary">
                                    Rp.
                                </span>
                            </div>
                            <InputError message={errors.harga_kamar} />
                        </div>

                        {/* jenis_sewa */}
                        <div className="col-span-4 lg:col-span-2">
                            <Label htmlFor="jenis_sewa">
                                Jenis Sewa
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Select
                                onValueChange={(e) => setData("jenis_sewa", e)}
                                defaultValue={data.jenis_sewa}
                            >
                                <SelectTrigger className="mt-2 bg-white">
                                    <SelectValue placeholder="Pilih jenis sewa" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tahunan">
                                        Tahunan
                                    </SelectItem>
                                    <SelectItem value="bulanan">
                                        Bulanan
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.jenis_sewa} />
                        </div>

                        {/* kategori_id */}
                        <div className="col-span-4 lg:col-span-2">
                            <Label htmlFor="kategori_id">
                                Kategori
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Select
                                id="kategori_id"
                                name="kategori_id"
                                onValueChange={(e) => setData("kategori_id", e)}
                                defaultValue={data.kategori_id}
                            >
                                <SelectTrigger className="mt-2 bg-white">
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kategori.map((item, index) => {
                                        return (
                                            <SelectItem
                                                key={index}
                                                value={item.id.toString()}
                                            >
                                                {item.nama_kategori}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.kategori_id} />
                        </div>

                        {/* deskripsi_kamar */}
                        <div className="col-span-4 lg:col-span-2">
                            <Label htmlFor="deskripsi_kamar">
                                Deskripsi
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Textarea
                                className="mt-2 bg-white"
                                id="deskripsi_kamar"
                                name="deskripsi_kamar"
                                placeholder="Ini adalah kamar untuk pria yang sangat cocok untuk anak kuliah, karena dekat dengan kampus POLITEKNIK ACEH"
                                value={data.deskripsi_kamar}
                                onChange={(e) =>
                                    setData("deskripsi_kamar", e.target.value)
                                }
                            />

                            <InputError message={errors.deskripsi_kamar} />
                        </div>

                        {/* lokasi_kamar */}
                        <div className="col-span-4 lg:col-span-2">
                            <Label htmlFor="lokasi_kamar">
                                Lokasi
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Textarea
                                className="mt-2 bg-white"
                                id="lokasi_kamar"
                                name="lokasi_kamar"
                                placeholder="Jln. Contoh No. 10, Pango, Kec. Ule Kareng, Kota Banda Aceh, 29111"
                                value={data.lokasi_kamar}
                                onChange={(e) =>
                                    setData("lokasi_kamar", e.target.value)
                                }
                            />

                            <InputError message={errors.lokasi_kamar} />
                        </div>
                    </div>

                    <Separator className="my-10" />

                    <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2 lg:col-span-1">
                            {/* foto */}
                            <div className="flex flex-col gap-5">
                                <h1 className="text-2xl font-bold underline decoration-dashed decoration-primary">
                                    Foto Kamar
                                </h1>
                                {foto.map((item, index) => (
                                    <div key={index}>
                                        <Label htmlFor={`foto${index}`}>
                                            Foto {index + 1}
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </Label>
                                        <div className="flex flex-col items-center space-x-2">
                                            {imagePreviews[index] && (
                                                <div className="">
                                                    <img
                                                        src={
                                                            imagePreviews[index]
                                                        }
                                                        alt={`Preview${index}`}
                                                        className="w-full h-40"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex flex-row items-center w-full space-x-2">
                                                <Input
                                                    type="file"
                                                    id={`foto${index}`}
                                                    name={`foto${index}`}
                                                    className="flex-1 mt-2"
                                                    accept="image/*"
                                                    // onChange={(e) => {
                                                    //     const newFoto = [...foto];
                                                    //     newFoto[index] =
                                                    //         e.target.files[0];
                                                    //     setFoto(newFoto);

                                                    //     const newData = { ...data };
                                                    //     newData.foto = newFoto;
                                                    //     setData(newData);
                                                    // }}
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files[0];
                                                        if (file) {
                                                            const newFoto = [
                                                                ...foto,
                                                            ];
                                                            newFoto[index] =
                                                                file;
                                                            setFoto(newFoto);

                                                            const newData = {
                                                                ...data,
                                                            };
                                                            newData.foto =
                                                                newFoto;
                                                            setData(newData);

                                                            const imageUrl =
                                                                URL.createObjectURL(
                                                                    file
                                                                );
                                                            const newImagePreviews =
                                                                [
                                                                    ...imagePreviews,
                                                                ];
                                                            newImagePreviews[
                                                                index
                                                            ] = imageUrl;
                                                            setImagePreviews(
                                                                newImagePreviews
                                                            );
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="destructive"
                                                    // onClick={() => {
                                                    //     const newFoto = foto.filter(
                                                    //         (_, i) => i !== index
                                                    //     );
                                                    //     setFoto(newFoto);
                                                    // }}
                                                    onClick={() => {
                                                        const newFoto =
                                                            foto.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            );
                                                        setFoto(newFoto);

                                                        const newImagePreviews =
                                                            [...imagePreviews];
                                                        newImagePreviews[
                                                            index
                                                        ] = undefined;
                                                        setImagePreviews(
                                                            newImagePreviews
                                                        );

                                                        const newData = {
                                                            ...data,
                                                        };
                                                        newData.foto = newFoto;
                                                        setData(newData);
                                                    }}
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        </div>
                                        <InputError message={errors.foto} />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="p-2 text-white rounded-full w-fit bg-primary"
                                    onClick={addFoto}
                                >
                                    <PlusCircle />
                                </button>
                            </div>
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            {/* nama_fasilitas */}
                            <div className="flex flex-col gap-5">
                                <h1 className="text-2xl font-bold underline decoration-dashed decoration-primary">
                                    Fasilitas Kamar
                                </h1>
                                {fasilitas.map((item, index) => (
                                    <div key={index}>
                                        <Label
                                            htmlFor={`nama_fasilitas${index}`}
                                        >
                                            Fasilitas {index + 1}
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </Label>
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                type="text"
                                                id={`nama_fasilitas${index}`}
                                                name={`nama_fasilitas${index}`}
                                                placeholder="Contoh fasilitas"
                                                className="flex-1 mt-2"
                                                value={item}
                                                onChange={(e) => {
                                                    const newFasilitas = [
                                                        ...fasilitas,
                                                    ];
                                                    newFasilitas[index] =
                                                        e.target.value;
                                                    setFasilitas(newFasilitas);

                                                    const newData = { ...data };
                                                    newData.nama_fasilitas =
                                                        newFasilitas;
                                                    setData(newData);
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => {
                                                    const newFasilitas =
                                                        fasilitas.filter(
                                                            (_, i) =>
                                                                i !== index
                                                        );
                                                    setFasilitas(newFasilitas);

                                                    const newData = { ...data };
                                                    newData.nama_fasilitas =
                                                        newData.nama_fasilitas.filter(
                                                            (_, i) =>
                                                                i !== index
                                                        );
                                                    setData(newData);
                                                }}
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                        <InputError
                                            message={errors.nama_fasilitas}
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="p-2 text-white rounded-full w-fit bg-primary"
                                    onClick={addFasilitas}
                                >
                                    <PlusCircle />
                                </button>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-10" />

                    <Button
                        className="flex items-center justify-center gap-3"
                        disabled={processing}
                    >
                        {processing && <Loader2 className="animate-spin" />}
                        Simpan
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}

export default CreateKamar;
