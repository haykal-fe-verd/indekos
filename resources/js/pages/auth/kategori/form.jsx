import React from "react";

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function Form({ isEdit, onSubmit, setData, data, errors, processing }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {isEdit ? "Edit" : "Tambah"} Kategori
                    <Separator className="my-5" />
                </DialogTitle>
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* nama_kategori */}
                    <div>
                        <Label htmlFor="nama_kategori">
                            Nama Kategori
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="nama_kategori"
                            name="nama_kategori"
                            className="mt-2"
                            value={data.nama_kategori}
                            onChange={(e) =>
                                setData("nama_kategori", e.target.value)
                            }
                        />
                        <InputError message={errors.nama_kategori} />
                    </div>

                    <Button
                        className="flex items-center justify-center gap-3"
                        disabled={processing}
                    >
                        {processing && <Loader2 className="animate-spin" />}
                        Simpan
                    </Button>
                </form>
            </DialogHeader>
        </DialogContent>
    );
}

export default Form;
