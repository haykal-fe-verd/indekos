import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import GuestLayout from "@/layouts/guest-layout";
import { useToast } from "@/components/ui/use-toast";

export default function VerifyEmail({ status }) {
    const { indekos } = usePage().props;
    const { post, processing } = useForm({});
    const { toast } = useToast();

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    React.useEffect(() => {
        if (status === "verification-link-sent") {
            toast({
                title: "Berhasil",
                description:
                    "Email verivikasi telah dikirim ulang, terimakasih!",
            });
        }
    }, [status]);

    return (
        <GuestLayout>
            <Head title="Verify Email" />

            <section className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto">
                <Card className="w-full rounded-lg shadow-2xl sm:max-w-md">
                    <CardHeader>
                        <CardTitle className="flex flex-col items-center justify-center">
                            <Link href={route("home")}>
                                <img
                                    src={`/storage/${indekos?.logo}`}
                                    alt="Logo"
                                    className="w-32 h-32"
                                />
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={submit}>
                        <CardContent className="space-y-4 md:space-y-6">
                            <p className="text-justify">
                                Terima kasih telah mendaftar! Sebelum memulai,
                                bisakah Anda memverifikasi alamat email Anda
                                dengan mengklik tautan yang baru saja kami
                                kirimkan ke email Anda? Jika Anda tidak menerima
                                email tersebut, kami dengan senang hati akan
                                mengirimkan email lainnya kepada Anda.
                            </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between gap-3">
                            {/* button */}
                            <Button
                                className="flex items-center justify-center gap-3"
                                disabled={processing}
                            >
                                {processing && (
                                    <Loader2 className="animate-spin" />
                                )}
                                Kirim Ulang Email Verifikasi
                            </Button>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-sm text-gray-600 underline rounded-md hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Logout
                            </Link>
                        </CardFooter>
                    </form>
                </Card>
            </section>
        </GuestLayout>
    );
}
