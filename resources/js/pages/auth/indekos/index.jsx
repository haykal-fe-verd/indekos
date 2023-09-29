import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function Indekos() {
    const { indekos } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        nama: indekos?.nama ?? "",
        deskripsi: indekos?.deskripsi ?? "",
        instagram: indekos?.instagram ?? "",
        whatsapp: indekos?.whatsapp ?? "",
        logo: indekos?.logo ?? "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("indekos.update"));
    };

    return (
        <AuthLayout>
            <Head title="Setting Kos" />
            <div className="p-5 space-y-4 bg-white rounded-md shadow-md ">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Setting Kos
                    </h2>
                </div>
                <Separator />

                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-2 gap-5">
                        {/* nama */}
                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="nama">Nama Kos</Label>
                            <Input
                                type="text"
                                id="nama"
                                name="nama"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />
                            <InputError message={errors.nama} />
                        </div>

                        {/* instagram */}
                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="instagram">Link Instagram</Label>
                            <Input
                                type="text"
                                id="instagram"
                                name="instagram"
                                value={data.instagram}
                                onChange={(e) =>
                                    setData("instagram", e.target.value)
                                }
                            />
                            <InputError message={errors.instagram} />
                        </div>

                        {/* whatsapp */}
                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="whatsapp">Link Whatsapp</Label>
                            <Input
                                type="text"
                                id="whatsapp"
                                name="whatsapp"
                                value={data.whatsapp}
                                onChange={(e) =>
                                    setData("whatsapp", e.target.value)
                                }
                            />
                            <InputError message={errors.whatsapp} />
                        </div>

                        {/* logo */}
                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="logo">Logo</Label>
                            <Input
                                type="file"
                                id="logo"
                                name="logo"
                                onChange={(e) =>
                                    setData("logo", e.target.files[0])
                                }
                            />
                            <InputError message={errors.logo} />
                        </div>

                        {/* deskripsi */}
                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="deskripsi">Deksripsi</Label>
                            <Textarea
                                type="text"
                                id="deskripsi"
                                name="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) =>
                                    setData("deskripsi", e.target.value)
                                }
                            />
                            <InputError message={errors.deskripsi} />
                        </div>
                    </div>

                    <Button
                        className="flex items-center justify-center gap-3 mt-10"
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

export default Indekos;
