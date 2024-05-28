import { PropsWithChildren } from "react";

import Navbar from "./Navbar";

function HomeLayout({ children }: PropsWithChildren) {
    return (
        <main className="grid h-screen grid-rows-[auto_1fr] divide-y">
            <Navbar />
            <div className="grid">{children}</div>
        </main>
    );
}

export default HomeLayout;
