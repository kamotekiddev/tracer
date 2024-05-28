import { RotatingLines } from "react-loader-spinner";

function FullScreenLoading() {
    return (
        <div className="fixed inset-0 z-[1000] grid place-items-center bg-neutral-950/10 backdrop-blur-sm">
            <RotatingLines
                visible={true}
                width="50"
                strokeColor="black"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
        </div>
    );
}

export default FullScreenLoading;
