"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { account } from "@/lib/appwrite";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAuthError } from "@/lib/auth-errors";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Get URL parameters
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!userId || !secret) {
            setError("Invalid reset link. Please request a new password reset.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);
            await account.updateRecovery(
                userId,
                secret,
                password
            );
            setSuccess(true);
            // Redirect to login after 2 seconds
            setTimeout(() => router.push("/"), 2000);
        } catch (error) {
            setError(getAuthError(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-400 via-background-300 to-background-100">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full flex justify-center py-4"
            >
                <div className="flex items-center">
                    <Image
                        src="/logo.svg"
                        alt="KeepThing Logo"
                        width={120}
                        height={40}
                        className="w-auto h-8 drop-shadow-lg"
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </motion.div>

            <div className="flex-1 flex flex-col justify-center w-full px-4 py-6">
                <div className="w-full max-w-sm mx-auto space-y-4">
                    {/* Hero Text */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center space-y-2 pb-10"
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text">
                            Reset Password
                        </h1>
                        <p className="text-base sm:text-lg text-text-700">
                            Choose a strong password to secure your account
                        </p>
                    </motion.div>

                    {/* Reset Password Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-full"
                    >
                        <Card className="border-none shadow-lg bg-background-50/95 backdrop-blur">
                            <CardContent className="space-y-4 pt-4">
                                {error && (
                                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="bg-green-500/10 text-green-500 text-sm p-3 rounded-md">
                                        Password reset successful! Please login again...
                                    </div>
                                )}

                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">New Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={isLoading || success}
                                            required
                                            className="h-12 bg-background/50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            disabled={isLoading || success}
                                            required
                                            className="h-12 bg-background/50"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-11 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:opacity-90"
                                        disabled={isLoading || success}
                                    >
                                        {isLoading && (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Reset Password
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
