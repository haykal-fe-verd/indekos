import React from "react";
import { Head, usePage } from "@inertiajs/react";

import GuestLayout from "@/layouts/guest-layout";
import Footer from "@/components/footer";
import { Instagram, Phone } from "lucide-react";

function About() {
    const { indekos } = usePage().props;

    return (
        <GuestLayout>
            <Head title="About" />
            <section id="about" className="bg-white">
                <div className="container flex flex-col items-center mx-auto md:px-24 md:py-10 md:flex-row">
                    <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <img src={`/storage/${indekos.logo}`} alt="Logo" />
                    </div>
                    <div className="w-full mb-5 lg:max-w-lg">
                        <h1 className="text-2xl font-semibold underline decoration-wavy">
                            {indekos.nama}
                        </h1>
                        <p className="mt-5 text-justify">{indekos.deskripsi}</p>
                        <div className="flex flex-row gap-10 mt-20">
                            <a
                                href={indekos.instagram}
                                target="_blank"
                                className="flex flex-row items-center gap-3"
                            >
                                <Instagram /> Instagram
                            </a>
                            <a
                                href={indekos.whatsapp}
                                target="_blank"
                                className="flex flex-row items-center gap-3"
                            >
                                <Phone /> Whatsapp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </GuestLayout>
    );
}

export default About;
