"use client";

import React, { useState } from "react";
import NavigationMenu, { type Item } from "@/components/NavigationMenu";
import CreateProjectModal from "@/features/projects/CreateProjectModal";

enum MenuItem {
    "PROJECT" = "PROJECT",
    "ISSUES" = "ISSUES",
}

const listItems: Item[] = [
    {
        title: "Project",
        description:
            "Click to start a new project. Easily create and manage your project details.",
        value: "PROJECT",
    },
    {
        title: "Issues",
        description:
            "Click to create a new issue. Track and manage project tasks effortlessly.",
        value: "ISSUES",
    },
];

function CreateButton() {
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);

    const selectAction = (value: string) => {
        switch (value) {
            case MenuItem.PROJECT:
                return setCreateProjectModalOpen(true);
            default:
        }
    };

    return (
        <>
            <NavigationMenu
                items={listItems}
                onSelect={(value) => selectAction(value)}
            >
                Create
            </NavigationMenu>
            <CreateProjectModal
                open={createProjectModalOpen}
                onClose={() => setCreateProjectModalOpen(false)}
            />
        </>
    );
}

export default CreateButton;
