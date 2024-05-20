import React, { PropsWithChildren } from "react";
import HomeLayout from "@/layouts/HomeLayout";

function Layout({ children }: PropsWithChildren) {
    return <HomeLayout>{children}</HomeLayout>;
}

export default Layout;
