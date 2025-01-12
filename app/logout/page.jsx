'use client';
import useAuth from "@/stores/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        auth.logout();
        router.push("/");
    }, []);

    return null;
}
