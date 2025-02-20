'use client'

import { useEffect, useState } from "react";

export default function User() {
    const [total, setTotal] = useState(0);

    const count = () => {
        setTotal(total + 1);
    }

    useEffect(() => {
        count()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">{total}</h1>
                <button 
                    onClick={count} 
                    className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-600 transition"
                >
                    Click Button
                </button>
            </div>
        </div>
    );
}
