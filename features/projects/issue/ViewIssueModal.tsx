import { PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetIssueById } from "./useIssueQuery";

import FullScreenLoading from "@/components/loading/FullScreenLoading";
import IssueSummary from "./IssueSummary";
import IssueDescription from "./IssueDescription";
import IssueDetails from "./IssueDetails";
import IssueCategory from "./IssueCategory";
import IssueTypeSelector from "./IssueType";
import IssueHistory from "./IssueHistory";

interface Props {
    issueId: string;
    open: boolean;
    onClose: () => void;
}

interface WrapperWithLabelProps extends PropsWithChildren {
    label: string;
}

export function WrapperWithLabel({ label, children }: WrapperWithLabelProps) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            {children}
        </div>
    );
}

function ViewIssueModal({ open, onClose, issueId }: Props) {
    const { data: issue, ...issueState } = useGetIssueById(issueId);

    if (issueState.isLoading) return <FullScreenLoading />;
    else if (!issue) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="h-full max-h-[700px] w-full max-w-6xl overflow-hidden p-4"
            >
                <div className="grid grid-cols-[1fr_400px] grid-rows-[auto_1fr] overflow-hidden">
                    <div className="col-span-2 p-4">
                        <DialogTitle>
                            {`${issue.project.key}-${issue.number}`}
                        </DialogTitle>
                    </div>
                    <div className="space-y-4 overflow-auto p-4 scrollbar-hide">
                        <IssueSummary issue={issue} />
                        <WrapperWithLabel label="Description">
                            <IssueDescription issue={issue} />
                        </WrapperWithLabel>
                        <Tabs defaultValue="comments">
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
                                <IssueHistory issueId={issue.id} />
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="space-y-4 p-4">
                        <div className="flex gap-4">
                            <IssueCategory issue={issue} />
                            <IssueTypeSelector issue={issue} />
                        </div>
                        <IssueDetails issueId={issueId} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ViewIssueModal;
