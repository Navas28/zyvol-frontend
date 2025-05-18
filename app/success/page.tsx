"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    const router = useRouter();
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/cart");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-md w-full text-center">
                <div className="mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle className="h-20 w-20 text-green-500" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
                <div className="h-1 w-16 bg-green-500 mx-auto my-6"></div>
                <p className="text-gray-600 text-lg mb-8">
                    Thank you for your purchase. Your order has been received and is now being processed.
                </p>
                <div className="space-y-4 mb-8 text-left bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Order number:</span>
                        <span className="font-medium text-gray-800">#ORD-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className="font-medium text-green-600">Confirmed</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Est. delivery:</span>
                        <span className="font-medium text-gray-800">3-5 business days</span>
                    </div>
                </div>
                <p className="text-gray-500 mt-8 text-sm">You will be redirected to your orders in 3 seconds...</p>
            </div>
        </div>
    );
}
