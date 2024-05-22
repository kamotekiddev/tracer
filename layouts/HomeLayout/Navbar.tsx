import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function Navbar() {
    return (
        <header className="flex items-center gap-4 px-8 p-4 justify-between">
            <div className="flex gap-20 items-center">
                <h1 className="font-bold">Tracer</h1>
                <nav className="flex gap-8 items-center">
                    <Link href="/issues" className="text-sm font-semibold">
                        Your Work
                    </Link>
                    <Link href="/projects" className="text-sm font-semibold">
                        Projects
                    </Link>
                    <Button size="sm">Create</Button>
                </nav>
            </div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </header>
    );
}

export default Navbar;
