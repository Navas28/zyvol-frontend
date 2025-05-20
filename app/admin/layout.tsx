export default async function AdminLayout({ children }: { children: React.ReactNode }) {
   
    return (
        <div className="flex min-h-screen">
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
}
