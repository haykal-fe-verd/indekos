import {
    ArchiveRestore,
    LayoutDashboard,
    Settings,
    UploadCloud,
} from "lucide-react";

export const navigations = [
    {
        label: "Dashboard",
        href: route("dashboard"),
        icon: LayoutDashboard,
        role: ["admin", "penyewa"],
    },
    {
        label: "Kategori",
        href: route("kategori.index"),
        icon: ArchiveRestore,
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
        label: "Kamar",
        href: "",
        icon: UploadCloud,
        role: ["penyewa"],
    },
];
