"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HistoryTransactions from "@/components/transactions/HistoryTransactions";
import useAuth from "@/stores/store";

const HistoryPage = () => {
    const [transactions, setTransactions] = useState([]);
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!auth.user) {
            router.push("/login");
            return;
        }

        const fetchTransactions = async () => {
            try {
                const response = await fetch(`/api/transactions/getTransactions?username=${auth.user.username}`);
                if (!response.ok) throw new Error("Failed to fetch transactions");
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };

        fetchTransactions();
    }, [auth.user, router]);

    return <HistoryTransactions transactions={transactions} />;
};

export default HistoryPage;
