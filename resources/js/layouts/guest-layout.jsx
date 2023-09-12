import React from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

function GuestLayout({ children }) {
    const { sessions } = usePage().props;
    const { toast } = useToast();

    React.useEffect(() => {
        if (sessions?.success) {
            toast({
                title: "Berhasil",
                description: sessions.success,
            });
        }

        if (sessions?.error) {
            toast({
                variant: "destructive",
                title: "Gagal",
                description: sessions.success,
            });
        }
    }, [sessions]);

    return (
        <main>
            <Navbar />
            <div>{children}</div>
            <Toaster />
        </main>
    );
}

export default GuestLayout;
