import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainNavigation from "./MainNavigation";
import CreateButton from "./CreateButton";

function Navbar() {
    return (
        <header className="flex items-center gap-4 px-8 justify-between">
            <div className="flex gap-20 items-center">
                <h1 className="font-bold">Tracer</h1>
                <nav className="flex gap-8 items-center size-full py-4">
                    <MainNavigation />
                    <CreateButton />
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
