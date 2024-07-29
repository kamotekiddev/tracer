"use client";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";
import { ClockIcon, EllipsisIcon } from "lucide-react";

import { useGetProject, useGetProjectCategories } from "../useProjectQuery";
import { Button } from "@/components/ui/button";
import StartSprintView from "./StartSprintView";
import FullScreenLoading from "@/components/loading/FullScreenLoading";
import CompleteSprintModal from "./CompleteSprintModal";
import CategoryCard from "./CategoryCard";

interface Props {
    projectId: string;
}

function ProjectContent({ projectId }: Props) {
    const { data: project, ...projectState } = useGetProject(projectId);
    const { data: categories, ...categoriesState } =
        useGetProjectCategories(projectId);

    const daysRemaining = useMemo(() => {
        if (!project?.currentSprint) return null;
        const startDate = new Date(project.currentSprint.startDate);
        const endDate = new Date(project.currentSprint.endDate);

        const daysDiff = differenceInDays(endDate, startDate);
        if (daysDiff > 0) return `${daysDiff} Days`;

        return `${daysDiff} Day`;
    }, [project?.currentSprint]);

    if (projectState.isLoading || categoriesState.isLoading)
        return <FullScreenLoading />;
    else if (!project?.currentSprintId) return <StartSprintView />;

    return (
        <div className="relative grid grid-rows-[auto_auto_1fr] gap-4 p-4">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-2xl font-semibold">
                    {project?.key} {`Sprint ${project.currentSprint?.number}`}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                        <ClockIcon className="size-5" /> {daysRemaining}
                    </div>
                    <CompleteSprintModal sprintId={project.currentSprintId} />
                    <Button variant="secondary" className="size-9 p-0">
                        <EllipsisIcon className="size-5" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div>Dito Search</div>
                <div>Dito Assignee</div>
                <div>Filter by type</div>
            </div>
            <div className="flex gap-2">
                {categories?.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        sprintId={project.currentSprintId as string}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProjectContent;
