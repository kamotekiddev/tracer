import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import * as projectService from "./projectService";
import { QueryKeys } from "@/lib/query-keys";
import { ErrorResponse } from "../interfaces";
import { ProjectBackLog, ProjectWithCompleteDetails } from "./projects.types";
import { User } from "../interfaces/user";

export const useGetProject = (projectId: string) =>
    useQuery<ProjectWithCompleteDetails, AxiosError<ErrorResponse>>({
        queryFn: () => projectService.getProjectById(projectId),
        queryKey: [QueryKeys.PROJECT, projectId],
    });

export const useGetProjectBacklogs = (projectId: string) =>
    useQuery<ProjectBackLog[], AxiosError<ErrorResponse>>({
        queryFn: () => projectService.getProjectBacklogs(projectId),
        queryKey: [QueryKeys.PROJECT_BACKLOGS, projectId],
    });

export const useGetProjectMembers = (projectId: string) =>
    useQuery<User[], AxiosError<ErrorResponse>>({
        queryFn: () => projectService.getProjectMembers(projectId),
        queryKey: [QueryKeys.PROJECT_MEMBERS, projectId],
    });
