import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/lib/query-keys";
import * as projectService from "./projectService";
import { ErrorResponse } from "../interfaces";
import { ProjectBackLog, ProjectWithCompleteDetails } from "./projects";

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
