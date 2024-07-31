import { ArchiveIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { User } from "@/features/interfaces/user";

interface Props {
    selectedMember: string;
    members: User[];
    onSelectMember: (userId: string) => void;
}

function MemberSelection({ selectedMember, members, onSelectMember }: Props) {
    return (
        <Select value={selectedMember} onValueChange={onSelectMember}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {!members.length && (
                    <div className="flex cursor-default items-center gap-2 p-4 text-neutral-400">
                        <ArchiveIcon />
                        No data to select
                    </div>
                )}
                <SelectItem value="unassigned">
                    <div className="group flex items-center gap-2">
                        <Avatar className="size-7">
                            <AvatarFallback className="bg-primary text-xs font-medium uppercase text-primary-foreground">
                                UA
                            </AvatarFallback>
                        </Avatar>
                        <span className="group-hover:text-primary">
                            Unassigned
                        </span>
                    </div>
                </SelectItem>
                {members.map((member) => {
                    const cleanMemberNames = [
                        member.firstName,
                        member.middleName,
                        member.lastName,
                    ].filter(Boolean);

                    const memberInitial = cleanMemberNames
                        .map((name) => name?.charAt(0))
                        .join("")
                        .substring(0, 2);

                    return (
                        <SelectItem key={member.id} value={member.id}>
                            <div className="group flex items-center gap-2">
                                <Avatar className="size-7">
                                    <AvatarFallback className="bg-primary text-xs font-medium uppercase text-primary-foreground">
                                        {memberInitial}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="group-hover:text-primary">
                                    {[
                                        member.firstName,
                                        member.middleName,
                                        member.lastName,
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                </span>
                            </div>
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}

export default MemberSelection;
