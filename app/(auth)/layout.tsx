import React, { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="grid h-screen place-items-center p-4">{children}</div>
    );
}

export default AuthLayout;
