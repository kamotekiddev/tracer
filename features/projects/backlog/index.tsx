import { Input } from "@/components/ui/input";
import BacklogList from "./BacklogList";

function Backlog() {
    return (
        <div className="grid grid-rows-[auto_1fr] gap-6 p-4">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold">Backlog</h1>
                <div className="flex gap-4">
                    <Input placeholder="Search" />
                    <Input placeholder="Filter" />
                </div>
            </div>
            <BacklogList />
        </div>
    );
}

export default Backlog;
