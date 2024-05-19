import React, { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="h-screen grid place-items-center p-4">{children}</div>
    );
}

export default AuthLayout;
