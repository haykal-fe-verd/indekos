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
import { Badge } from "@/components/ui/badge";

const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "Nama", className: "" },
    { name: "Email", className: "" },
    { name: "Role", className: "" },
    { name: "Status", className: "" },
    { name: "@", className: "text-center" },
];

function User({ user }) {
    console.log("🚀  user ==>", user);
    //! states
    const [openModal, setOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);

    //! hooks

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm();
    const handleDelete = (item) => {
        console.log("🚀  item ==>", item);
        Swal.fire({
            title: "Apakah anda ingin menghapus data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: "#f43f5e",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("user.destroy", item.id));
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
                <Head title="Daftar User" />
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Daftar User
                        </h2>
                    </div>
                    <Separator />
                    <div className="w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                        <DataTable
                            data={user}
                            header={header}
                            link={"user.index"}
                        >
                            {user.data.length !== 0 ? (
                                user.data.map((item, index) => (
                                    <TableRow key={user.from + index}>
                                        <TableCell className="text-center">
                                            {user.from + index}
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            {item.role === "admin" ? (
                                                <Badge>admin</Badge>
                                            ) : (
                                                "penyewa"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.email_verified_at ? (
                                                <Badge className="bg-green-500">
                                                    Terverifikasi
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-red-500">
                                                    Belum Terverifikasi
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <MoreVertical className="w-5 h-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
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
            </Dialog>
        </AuthLayout>
    );
}

export default User;
