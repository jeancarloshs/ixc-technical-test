"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function tokenVerify() {
    const router = useRouter();
    const [token, setToken] = useState<String | null>(null);

    useEffect(() => {
        const token = Cookies.get("token") as string;
        setToken(token);
        if (!token) {
            router.push('/');
            alert("Sessão expirada");
        }
    }, [router]);

    return;
}