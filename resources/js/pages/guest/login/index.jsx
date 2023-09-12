import React from "react";
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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import GuestLayout from "@/layouts/guest-layout";

function Login() {
    const { indekos } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = React.useState(false);

    React.useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <section className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto">
                <Card className="w-full rounded-lg shadow-2xl sm:max-w-md">
                    <CardHeader>
                        <CardTitle className="flex flex-col items-center justify-center">
                            <Link href={route("home")}>
                                <img
                                    src={`/storage/${indekos?.logo}`}
                                    alt="Logo"
                                    className="w-32 h-32 rounded-full"
                                />
                            </Link>

                            <span className="mt-3">LOGIN</span>
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={onSubmit}>
                        <CardContent className="space-y-4 md:space-y-6">
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
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        id="showPassword"
                                        name="showPassword"
                                        aria-label="showPassword"
                                        className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
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

                            <div className="flex items-center justify-between">
                                {/* remember me */}
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        onCheckedChange={(e) =>
                                            setData("remember", e)
                                        }
                                        checked={data.remember}
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Ingat saya
                                    </label>
                                </div>

                                {/* forgot password */}
                                <Link
                                    href={route("password.request")}
                                    className="text-sm font-medium hover:underline hover:text-primary"
                                >
                                    Lupa password?
                                </Link>
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
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-10">
                    <span>Belum punya akun? </span>
                    <Link
                        href={route("register")}
                        className="text-blue-500 hover:underline"
                    >
                        klik disini
                    </Link>
                </div>
            </section>
        </GuestLayout>
    );
}

export default Login;
