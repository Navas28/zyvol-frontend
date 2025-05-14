import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const {userId} = await auth()

    if(!userId){
        redirect("/sign-in")
    }

    const user = await clerkClient.users.getUser(userId)
    const role = user.publicMetadata.role;

    if(role !== "admin"){
        redirect("/not-authorized")
    }
    return (
        <div className="flex min-h-screen">
            {/* <sideBar/>  */}
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
}
