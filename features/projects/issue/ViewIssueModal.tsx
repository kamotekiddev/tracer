import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGetIssueById } from "./useIssueQuery";
import ModalLoading from "@/components/loading/ModalLoading";
import IssueTypeSelection from "./IssueTypeSelection";
import { useState } from "react";
import { useGetProjectMembers } from "../useProjectQuery";
import { useParams } from "next/navigation";
import MemberSelection from "./MemberSelection";

interface Props {
    issueId: string;
    open: boolean;
    onClose: () => void;
}

function ViewIssueModal({ open, onClose, issueId }: Props) {
    const { projectId } = useParams<{ projectId: string }>();
    const { data: issue, ...issueState } = useGetIssueById(issueId);
    const { data: projectMembers } = useGetProjectMembers(projectId);

    const [type, setType] = useState(issue?.type || "TASK");
    const [assignee, setAssignee] = useState(issue?.assigneeId || "unassigned");

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="p-2">
                {issueState.isLoading && <ModalLoading />}
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="space-x-2">
                        {`${issue?.project.key}-${issue?.number}`}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-2 p-4">
                    <span>{issue?.summary}</span>
                    <div>{issue?.description}</div>
                    <IssueTypeSelection value={type} onChange={setType} />
                    <MemberSelection
                        selectedMember={assignee}
                        onSelectMember={setAssignee}
                        members={projectMembers || []}
                    />
                    <div>{issue?.reporter.email}</div>
                    <div>{issue?.assignee?.email}</div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ViewIssueModal;
