import React from "react";
import { Head, useForm } from "@inertiajs/react";

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
import { MoreVertical, PencilIcon, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/ui/dialog";
import Swal from "sweetalert2";
import Form from "./form";

const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "Nama Kategori", className: "" },
    { name: "@", className: "text-center" },
];

function Kategori({ kategori }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        id: "",
        nama_kategori: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("kategori.update", data.id), {
                onSuccess: () => {
                    setOpenModal(false), setIsEdit(false), reset();
                },
            });
        } else {
            post(route("kategori.store"), {
                onSuccess: () => {
                    setOpenModal(false), reset();
                },
            });
        }
    };

    const handleEdit = (item) => {
        setIsEdit(true);
        setOpenModal(true);
        setData({
            id: item.id,
            nama_kategori: item.nama_kategori,
        });
    };

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
                destroy(route("kategori.destroy", item.id));
                reset();
            }
        });
    };

    return (
        <AuthLayout>
            <Dialog
                open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    if (!isOpen) {
                        setIsEdit(false);
                        reset();
                    }
                }}
            >
                <Head title="Kategori" />
                <div className="p-5 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Kategori
                        </h2>
                    </div>
                    <Separator />
                    <div className="w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                        <Button
                            className={cn("gap-2")}
                            onClick={() => setOpenModal(true)}
                        >
                            <PlusCircle className="w-5 h-5" />
                            <span>Tambah Kategori</span>
                        </Button>

                        <DataTable
                            data={kategori}
                            header={header}
                            link={"kategori.index"}
                        >
                            {kategori.data.length !== 0 ? (
                                kategori.data.map((item, index) => (
                                    <TableRow key={kategori.from + index}>
                                        <TableCell className="text-center">
                                            {kategori.from + index}
                                        </TableCell>
                                        <TableCell>
                                            {item.nama_kategori}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <MoreVertical className="w-5 h-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                    >
                                                        <PencilIcon className="w-4 h-4 mr-3" />
                                                        <span>Edit</span>
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

                {/* form */}
                <Form
                    isEdit={isEdit}
                    onSubmit={onSubmit}
                    setData={setData}
                    data={data}
                    errors={errors}
                    processing={processing}
                />
            </Dialog>
        </AuthLayout>
    );
}

export default Kategori;
