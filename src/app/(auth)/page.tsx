"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { account, ID, OAuthProvider } from "@/lib/appwrite";
import Image from "next/image";
import { motion, AnimatePresence, color } from "framer-motion";
import { getAuthError } from "@/lib/auth-errors";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup";

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // New state to handle hero text animation completion.
  const [heroTextDone, setHeroTextDone] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      if (authMode === "signup") {
        await account.create(ID.unique(), email, password, name);
      }
      await account.createEmailPasswordSession(email, password);
      router.push("/home");
      router.refresh();
    } catch (error) {
      const errorMessage = getAuthError(error);
      setError(errorMessage);
      setShowForgotPassword(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
      setError("Password reset link sent to your email");
    } catch (error) {
      setError(getAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: OAuthProvider) => {
    try {
      setError(null);
      const redirectUrl = `${window.location.origin}/home`;
      const failureUrl = `${window.location.origin}/`;

      await account.createOAuth2Session(provider, redirectUrl, failureUrl);
    } catch (error) {
      setError(getAuthError(error));
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
            className="text-center space-y-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={authMode}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                // Capture animation completion
                onAnimationComplete={() => setHeroTextDone(true)}
                className="space-y-2"
              >
                {authMode === "signin" ? (
                  <>
                    <h1 className="text-4xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-800">
                      Welcome to KeepThing
                    </h1>
                    <p className="text-xl sm:text-lg text-text-700">
                      Your all-in-one space for{" "}
                      <span className="text-primary-500">links</span>,{" "}
                      <span className="text-secondary-500">notes</span>,{" "}
                      <span className="text-accent-500">files</span>, and more.
                    </p>
                  </>
                ) : (
                  <h1 className="text-4xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-800">
                    Let&apos;s get started.
                  </h1>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Auth Card - only animates in after hero text is done */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={heroTextDone ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="w-full"
          >
            <Card className="border-none shadow-lg bg-background-50/95 backdrop-blur">
              <CardContent className="space-y-4 pt-4">
                <form onSubmit={handleAuth} className="space-y-4">
                  {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <motion.div
                    initial={false}
                    animate={{
                      height: authMode === "signup" ? "auto" : 0,
                      opacity: authMode === "signup" ? 1 : 0,
                    }}
                    transition={{
                      height: { duration: 0.3 },
                      opacity: { duration: 0.2 },
                    }}
                    className="overflow-hidden"
                  >
                    {authMode === "signup" && (
                      <div className="space-y-2 pb-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Jane Hopper"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={isLoading}
                          required
                          className="h-12 bg-background/50"
                        />
                      </div>
                    )}
                  </motion.div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                      className="h-12 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex flex-row space-x-2">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                        className="h-12 bg-background/50"
                        placeholder="pineappleonpizza"
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="h-12 w-12 bg-transparent hover:bg-slate-200"
                      >
                        {
                          showPassword ? (
                          <EyeOffIcon className="text-black" />
                          ) : (
                          <EyeIcon className="text-black" />
                          )
                        }
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {authMode === "signin" ? "Sign in" : "Create account"}
                  </Button>

                  {showForgotPassword && authMode === "signin" && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleForgotPassword}
                      disabled={isLoading || !email}
                      className="text-sm text-muted-foreground hover:text-primary h-9 bg-transparent"
                    >
                      Forgot password?
                    </Button>
                  )}
                </form>

                <Tabs
                  value={authMode}
                  onValueChange={(v) => {
                    setAuthMode(v as AuthMode);
                    if (v === "signin") {
                      setName("");
                    }
                  }}
                  className="w-full pt-2"
                >
                  <TabsList className="grid w-full grid-cols-2 h-12 bg-background-100/50">
                    <TabsTrigger value="signin">Sign in</TabsTrigger>
                    <TabsTrigger value="signup">Create account</TabsTrigger>
                  </TabsList>
                </Tabs>

                <CardFooter className="flex flex-col gap-4 pt-4">
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="gap-3 w-full flex flex-row justify-around">
                    <Button
                      variant="outline"
                      className="h-12 w-24 transition-all duration-300 border-transparent border-r-[360]"
                      onClick={() => handleOAuthSignIn(OAuthProvider.Google)}
                      disabled={isLoading}
                    >
                      <Icons.google className="h-5 w-5 text-primary-500" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 w-24 transition-all duration-300 border-transparent border-r-[360]"
                      onClick={() => handleOAuthSignIn(OAuthProvider.Facebook)}
                      disabled={isLoading}
                    >
                      <Icons.facebook className="h-5 w-5 text-secondary-500" />
                    </Button>
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs sm:text-sm text-text-600 px-4"
          >
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary-500 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-secondary-500 transition-colors"
            >
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </div>
    </main>
  );
}