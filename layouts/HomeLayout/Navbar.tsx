import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainNavigation from "./MainNavigation";
import CreateButton from "./CreateButton";

function Navbar() {
    return (
        <header className="flex items-center justify-between gap-4 px-8">
            <div className="flex items-center gap-20">
                <h1 className="font-bold">Tracer</h1>
                <nav className="flex size-full items-center gap-8">
                    <MainNavigation />
                    <CreateButton />
                </nav>
            </div>
            <Avatar className="size-8">
                <AvatarImage />
                <AvatarFallback className="text-xs font-semibold">
                    CN
                </AvatarFallback>
            </Avatar>
        </header>
    );
}

export default Navbar;
