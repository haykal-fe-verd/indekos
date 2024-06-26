import {
    ArchiveRestore,
    Bed,
    FileText,
    LayoutDashboard,
    Settings,
    UploadCloud,
    Users,
} from "lucide-react";

export const navigations = [
    {
        label: "Dashboard",
        href: route("dashboard"),
        icon: LayoutDashboard,
        role: ["admin", "penyewa"],
    },
    {
        label: "Kamar",
        href: route("kamar.index"),
        icon: Bed,
        role: ["admin"],
    },
    {
        label: "Transaksi",
        href: route("admin.index"),
        icon: FileText,
        role: ["admin"],
    },
    {
        label: "Kategori",
        href: route("kategori.index"),
        icon: ArchiveRestore,
        role: ["admin"],
    },
    {
        label: "Daftar User",
        href: route("user.index"),
        icon: Users,
        role: ["admin"],
    },
    {
        label: "Setting Kos",
        href: route("indekos.index"),
        icon: Settings,
        role: ["admin"],
    },

    // penyewa
    {
        label: "Kamar Saya",
        href: route("kamar.saya.index"),
        icon: UploadCloud,
        role: ["penyewa"],
    },
    {
        label: "Transaksi Saya",
        href: route("transaksi.index"),
        icon: FileText,
        role: ["penyewa"],
    },
];
