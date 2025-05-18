"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function CancelPage() {
    const router = useRouter();
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/cart");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-md w-full text-center">
                <div className="mx-auto mb-6 flex items-center justify-center">
                    <XCircle className="h-20 w-20 text-red-500" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Payment Cancelled</h1>
                <div className="h-1 w-16 bg-red-500 mx-auto my-6"></div>
                <p className="text-gray-600 text-lg mb-8">
                    Your payment process was cancelled. No charges have been made to your account.
                </p>
                <div className="space-y-4 mb-8 text-left bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className="font-medium text-red-600">Cancelled</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Order status:</span>
                        <span className="font-medium text-gray-800">Not placed</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Payment:</span>
                        <span className="font-medium text-gray-800">No charges applied</span>
                    </div>
                </div>
                <p className="text-gray-500 mt-8 text-sm">You will be redirected to your cart in 3 seconds...</p>
            </div>
        </div>
    );
}
