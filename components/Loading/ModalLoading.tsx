import { Oval } from "react-loader-spinner";
import { DialogOverlay } from "../ui/dialog";

function ModalLoading() {
    return (
        <DialogOverlay className="grid place-items-center bg-neutral-950/10 backdrop-blur-sm">
            <Oval
                visible={true}
                height="80"
                width="80"
                strokeWidth={5}
                secondaryColor="#ffffff"
                color="#4287f5"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </DialogOverlay>
    );
}

export default ModalLoading;
