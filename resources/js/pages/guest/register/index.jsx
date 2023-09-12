import React from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import GuestLayout from "@/layouts/guest-layout";

function Register() {
    const { indekos } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        jenis_kelamin: "",
        umur: "",
        no_hp: "",
        email: "",
        password: "",
        alamat: "",
    });

    const [showPassword, setShowPassword] = React.useState(false);

    React.useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Registrasi Akun" />
            <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <Card className="w-full shadow-2xl rounded-xl lg:max-w-2xl sm:max-w-md">
                    <CardHeader>
                        <CardTitle className="flex flex-col items-center justify-center">
                            <Link href={route("home")}>
                                <img
                                    src={`/storage/${indekos?.logo}`}
                                    alt="Logo"
                                    className="w-32 h-32 rounded-full"
                                />
                            </Link>

                            <span className="mt-3">REGISTRASI</span>
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={onSubmit}>
                        <CardContent>
                            {/* name */}
                            <div className="mb-5">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError message={errors.name} />
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="col-span-2 space-y-5 lg:col-span-1">
                                    {/* no_hp */}
                                    <div>
                                        <Label htmlFor="no_hp">No HP</Label>
                                        <Input
                                            id="no_hp"
                                            type="text"
                                            name="no_hp"
                                            value={data.no_hp}
                                            onChange={(e) =>
                                                setData("no_hp", e.target.value)
                                            }
                                        />

                                        <InputError message={errors.no_hp} />
                                    </div>

                                    {/* tanggal_lahir */}
                                    <div>
                                        <Label htmlFor="tanggal_lahir">
                                            Tanggal Lahir
                                        </Label>
                                        <Input
                                            type="date"
                                            id="tanggal_lahir"
                                            name="tanggal_lahir"
                                            value={data.tanggal_lahir}
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_lahir",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.tanggal_lahir}
                                        />
                                    </div>

                                    {/* tempat_lahir */}
                                    <div>
                                        <Label htmlFor="tempat_lahir">
                                            Tempat Lahir
                                        </Label>
                                        <Input
                                            type="text"
                                            id="tempat_lahir"
                                            name="tempat_lahir"
                                            value={data.tempat_lahir}
                                            onChange={(e) =>
                                                setData(
                                                    "tempat_lahir",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.tempat_lahir}
                                        />
                                    </div>

                                    {/* jenis_kelamin */}
                                    <div>
                                        <Label htmlFor="jenis_kelamin">
                                            Jenis Kelamin
                                        </Label>
                                        <Select
                                            onValueChange={(e) =>
                                                setData("jenis_kelamin", e)
                                            }
                                            defaultValue={data.jenis_kelamin}
                                        >
                                            <SelectTrigger className="bg-white ">
                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="L">
                                                    Pria
                                                </SelectItem>
                                                <SelectItem value="P">
                                                    Wanita
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <InputError
                                            message={errors.jenis_kelamin}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-5 lg:col-span-1">
                                    {/* umur */}
                                    <div>
                                        <Label htmlFor="umur">Umur</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                id="umur"
                                                name="umur"
                                                min={0}
                                                className="pr-20"
                                                value={data.umur}
                                                onChange={(e) =>
                                                    setData(
                                                        "umur",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <span className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary">
                                                Tahun
                                            </span>
                                        </div>

                                        <InputError message={errors.umur} />
                                    </div>

                                    {/* email */}
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="text"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />

                                        <InputError message={errors.email} />
                                    </div>

                                    {/* password */}
                                    <div>
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="••••••••"
                                                autoComplete="current-password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                id="showPassword"
                                                name="showPassword"
                                                aria-label="showPassword"
                                                className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>

                                        <InputError message={errors.password} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <Label htmlFor="alamat">Alamat</Label>
                                <Textarea
                                    className="mt-2 bg-white"
                                    id="alamat"
                                    name="alamat"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                />

                                <InputError message={errors.alamat} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            {/* button */}
                            <Button
                                className="flex items-center justify-center w-full gap-3"
                                disabled={processing}
                            >
                                {processing && (
                                    <Loader2 className="animate-spin" />
                                )}
                                Register
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-10">
                    <span>Sudah punya akun? </span>
                    <Link
                        href={route("login")}
                        className="text-primary hover:underline"
                    >
                        klik disini
                    </Link>
                </div>
            </section>
        </GuestLayout>
    );
}

export default Register;
