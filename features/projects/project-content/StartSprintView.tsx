import CreateSprintModal from "./CreateSprintModal";

function StartSprintView() {
    return (
        <div className="grid place-items-center">
            <div className="space-y-4 text-center">
                <h1 className="text-xl font-bold">No Sprint Available</h1>
                <p>Start sprint and create tickets</p>
                <CreateSprintModal />
            </div>
        </div>
    );
}

export default StartSprintView;
