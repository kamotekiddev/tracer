import { PropsWithChildren } from "react";

import Navbar from "./Navbar";

function HomeLayout({ children }: PropsWithChildren) {
    return (
        <main className="h-screen grid grid-rows-[auto_1fr]">
            <Navbar />
            <div className="p-4">{children}</div>
        </main>
    );
}

export default HomeLayout;
