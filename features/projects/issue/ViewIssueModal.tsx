import { PropsWithChildren } from "react";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetProjectMembers } from "../useProjectQuery";

import MemberSelection from "./MemberSelection";

import { useGetIssueById } from "./useIssueQuery";
import FullScreenLoading from "@/components/loading/FullScreenLoading";
import IssueSummary from "./IssueSummary";
import IssueDescription from "./IssueDescription";
import IssueType from "./IssueType";
import IssueAssignee from "./IssueAssignee";

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
                        <IssueSummary issue={issue} />
                        <WrapperWithLabel label="Description">
                            <IssueDescription issue={issue} />
                        </WrapperWithLabel>
                        <Tabs defaultValue="comments" className="w-[400px]">
                            <TabsList className="bg-transparent">
                                <TabsTrigger
                                    value="comments"
                                    className="data-[state=active]:bg-neutral-100"
                                >
                                    Comments
                                </TabsTrigger>
                                <TabsTrigger
                                    value="history"
                                    className="data-[state=active]:bg-neutral-100"
                                >
                                    History
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="comments">
                                {/* Comments will go here */}
                            </TabsContent>
                            <TabsContent value="history">
                                {/* History will go here */}
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="space-y-2 p-4">
                        <WrapperWithLabel label="Type">
                            <IssueType issue={issue} />
                        </WrapperWithLabel>
                        <WrapperWithLabel label="Assignee">
                            <IssueAssignee
                                issue={issue}
                                members={projectMembers || []}
                            />
                        </WrapperWithLabel>
                        <WrapperWithLabel label="Reporter">
                            <IssueAssignee
                                issue={issue}
                                members={projectMembers || []}
                            />
                        </WrapperWithLabel>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ViewIssueModal;
