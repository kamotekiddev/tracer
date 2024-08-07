import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import * as projectService from "./projectService";
import { QueryKeys } from "@/lib/query-keys";
import { ErrorResponse } from "../interfaces";
import {
    Category,
    ProjectBackLog,
    ProjectWithCompleteDetails,
    ProjectWithSprints,
    Sprint,
} from "./projects.types";
import { User } from "../interfaces/user";

export const useGetProject = (projectId: string) =>
    useQuery<ProjectWithCompleteDetails, AxiosError<ErrorResponse>>({
        queryFn: () => projectService.getProjectById(projectId),
        queryKey: [QueryKeys.PROJECT, projectId],
        enabled: !!projectId,
    });

export const useGetProjectBacklogs = (projectId: string) =>
    useQuery<ProjectBackLog[], AxiosError<ErrorResponse>>({
        queryFn: () => projectService.getProjectBacklogs(projectId),
        queryKey: [QueryKeys.PROJECT_BACKLOGS, projectId],
        enabled: !!projectId,
    });

export const useGetProjectMembers = (projectId: string) =>
    useQuery<User[], AxiosError<ErrorResponse>>({
        queryFn: () => projectService.getProjectMembers(projectId),
        queryKey: [QueryKeys.PROJECT_MEMBERS, projectId],
        enabled: !!projectId,
    });

export const useGetProjectCategories = (projectId: string) =>
    useQuery<Category[], AxiosError<ErrorResponse>>({
        queryFn: () => projectService.getProjectCategories(projectId),
        queryKey: [QueryKeys.PROJECT_CATEGORIES, projectId],
        enabled: !!projectId,
    });

export const useGetProjectSprints = (projectId: string) =>
    useQuery<ProjectWithSprints, AxiosError<ErrorResponse>>({
        queryFn: () => projectService.getProjectSprints(projectId),
        queryKey: [QueryKeys.PROJECT_SPRINTS, projectId],
        enabled: !!projectId,
    });
