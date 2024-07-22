import { MoreHorizontalIcon } from "lucide-react";
import type { Category } from "../projects";
import CreateTicketModal from "./CreateTicketModal";

interface Props {
    category: Category;
}

function CategoryCard({ category }: Props) {
    return (
        <>
            <div className="grid min-w-[300px] grid-rows-[auto_1fr] overflow-hidden rounded-lg border bg-neutral-50">
                <div className="flex items-center justify-between gap-4 bg-neutral-100 p-2 font-semibold">
                    <h1>{category.name}</h1>
                    <MoreHorizontalIcon />
                </div>
                <div className="group">
                    <div className="invisible group-hover:visible">
                        <CreateTicketModal />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryCard;
