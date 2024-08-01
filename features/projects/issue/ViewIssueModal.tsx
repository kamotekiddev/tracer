import { PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { useGetProjectMembers } from "../useProjectQuery";
import { Textarea } from "@/components/ui/textarea";

import MemberSelection from "./MemberSelection";
import IssueTypeSelection from "./IssueTypeSelection";

import { useGetIssueById } from "./useIssueQuery";
import FullScreenLoading from "@/components/loading/FullScreenLoading";
import IssueInput from "./IssueInput";

interface Props {
    issueId: string;
    open: boolean;
    onClose: () => void;
}

interface WrapperWithLabelProps extends PropsWithChildren {
    label: string;
}

function WrapperWithLabel({ label, children }: WrapperWithLabelProps) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            {children}
        </div>
    );
}

function ViewIssueModal({ open, onClose, issueId }: Props) {
    const { projectId } = useParams<{ projectId: string }>();
    const { data: issue, ...issueState } = useGetIssueById(issueId);
    const { data: projectMembers, ...projectMembersState } =
        useGetProjectMembers(projectId);

    const [summary, setSummary] = useState(issue?.summary || "");
    const [type, setType] = useState(issue?.type || "TASK");
    const [assignee, setAssignee] = useState(issue?.assigneeId || "unassigned");
    const [reporter, setReporter] = useState(issue?.reporterId || "unassigned");
    const [description, setDescription] = useState(issue?.description || "");

    useEffect(() => {
        if (!issue) return;
        setSummary(issue.summary);
        setDescription(issue.description || "");
        setAssignee(issue.assigneeId || "unassigned");
        setType(issue.type);
    }, [issue]);

    if (issueState.isLoading || projectMembersState.isLoading)
        return <FullScreenLoading />;
    else if (!issue) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="min-h-[700px] w-full max-w-6xl p-4"
            >
                <div className="grid grid-cols-[1fr_400px] grid-rows-[auto_1fr]">
                    <div className="col-span-2 p-4">
                        <DialogTitle>
                            {`${issue.project.key}-${issue.number}`}
                        </DialogTitle>
                    </div>
                    <div className="space-y-4 p-4">
                        <IssueInput
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            onSave={() => {}}
                        />
                        <WrapperWithLabel label="Description">
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </WrapperWithLabel>
                    </div>
                    <div className="space-y-2 p-4">
                        <WrapperWithLabel label="Type">
                            <IssueTypeSelection
                                value={type}
                                onChange={setType}
                            />
                        </WrapperWithLabel>
                        <WrapperWithLabel label="Assignee">
                            <MemberSelection
                                selectedMember={assignee}
                                onSelectMember={setAssignee}
                                members={projectMembers || []}
                            />
                        </WrapperWithLabel>
                        <WrapperWithLabel label="Reporter">
                            <MemberSelection
                                selectedMember={reporter}
                                onSelectMember={setReporter}
                                members={projectMembers || []}
                            />
                        </WrapperWithLabel>
                        <div>{/* Attachments */}</div>
                        <div>{/* Activities */}</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ViewIssueModal;
