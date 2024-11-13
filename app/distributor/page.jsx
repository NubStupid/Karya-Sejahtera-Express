'use client'
import useAuth from "@/stores/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const auth = useAuth();
    useEffect(() => {
        if(auth.user.role != "distributor")
            router.push('/');
    }, []);
    return (
        <>
            dashboard
        </>
    )
}