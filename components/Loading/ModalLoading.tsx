import { RotatingLines } from "react-loader-spinner";
import { DialogOverlay } from "../ui/dialog";

function ModalLoading() {
    return (
        <DialogOverlay className="grid place-items-center bg-neutral-950/10 backdrop-blur-sm">
            <RotatingLines
                visible={true}
                width="50"
                strokeColor="black"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
        </DialogOverlay>
    );
}

export default ModalLoading;
