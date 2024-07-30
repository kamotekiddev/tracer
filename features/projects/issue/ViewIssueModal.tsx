import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
    open: boolean;
    onClose: () => void;
}

function ViewIssueModal({ open, onClose }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>View ticket</DialogContent>
        </Dialog>
    );
}

export default ViewIssueModal;
