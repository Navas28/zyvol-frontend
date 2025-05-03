import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Home/Footer";
import StoreProvider from "@/StoreProvider/StoreProvider";
import { Toaster } from "sonner";
import AuthSync from "@/components/Auth/AuthSync";

const roboto = Roboto({
    subsets: ["latin"],
    variable: "--font-roboto",
    weight: "400",
});

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: "400",
});

export const metadata: Metadata = {
    title: "Zyvol",
    description: "Zyvol is your go-to online store for the latest and greatest sneakers. Shop the best in footwear today!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <ClerkProvider>
                <html lang="en">
                    <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
                        <AuthSync/>
                        <Navbar />
                        {children}
                        <Toaster/>
                        <Footer />
                    </body>
                </html>
            </ClerkProvider>
        </StoreProvider>
    );
}
