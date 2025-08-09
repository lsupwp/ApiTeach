import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;