import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
    return (
        <header className="flex items-center gap-4 p-4 justify-between shadow-md">
            <h1 className="font-bold">Tracer</h1>
            <nav className="flex gap-4 items-center">
                <Link href="/projects">Projects</Link>
                <Link href="/issues">Issues</Link>
            </nav>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </header>
    );
}

export default Navbar;
