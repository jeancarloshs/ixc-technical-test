import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function tokenVerify() {
    const router = useRouter();
    const [token, setToken] = useState<String | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
        if (!token) {
            router.push('/');
            alert("Sessão expirada");
        }
    }, [router]);

    return;
}