import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface Props {
    title?: string;
    message?: string;
}
function InlineError({
    title = "Error",
    message = "Something went wrong.",
}: Props) {
    return (
        <Alert variant="destructive" className="h-max">
            <InfoIcon className="size-5" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}

export default InlineError;
