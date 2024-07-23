import { Button } from "@/components/ui/button";
import MembersTable from "./MembersTable";

function Members() {
    return (
        <div className="grid grid-rows-[auto_1fr] gap-6 p-4">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold">Project Members</h1>
                <Button size="sm">Add Member</Button>
            </div>
            <div className="overflow-hidden rounded-lg border">
                <MembersTable />
            </div>
        </div>
    );
}

export default Members;
