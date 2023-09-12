import React from "react";
import { usePage } from "@inertiajs/react";

import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

function AuthLayout({ children }) {
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
        <div className="relative h-full">
            <div className="hidden h-full lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-[50]">
                <Sidebar />
            </div>
            <main className="lg:pl-72">
                <Topbar />
                <div className="m-5">{children}</div>
                <Toaster />
            </main>
        </div>
    );
}

export default AuthLayout;
