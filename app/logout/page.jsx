'use client'
import useAuth from "@/stores/store";
import { useRouter } from "next/navigation";

export default function logout()
{
    const auth = useAuth();
    auth.logout();
    const router = useRouter();
    router.push("/");
}