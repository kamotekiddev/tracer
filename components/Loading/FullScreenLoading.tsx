import { Oval } from "react-loader-spinner";

function FullScreenLoading() {
    return (
        <div className="fixed inset-0 z-[1000] grid place-items-center bg-neutral-950/10 backdrop-blur-sm">
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
        </div>
    );
}

export default FullScreenLoading;
