"use client";

import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="min-h-screen p-4 items-center flex flex-col">
            <div className="flex justify-end">
                <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="hover:bg-destructive/10 hover:text-destructive self-center"
                >
                    Sign out
                </Button>
            </div>
            {/* Rest of your home page content */}
        </div>
    );
}
