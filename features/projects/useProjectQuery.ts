import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/providers/QueryProvider";
import { QueryKeys } from "@/lib/query-keys";
import * as projectService from "./projectService";
import { ErrorResponse } from "../interfaces";
import {
    CategoryWithIssueAndProject,
    Issue,
    ProjectBackLog,
    ProjectWithCompleteDetails,
} from "./projects";
import { CreateIssueRequest } from "./project-content/CreateTicketInline";

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

export const useCreateIssue = () =>
    useMutation<Issue, AxiosError<ErrorResponse>, CreateIssueRequest>({
        mutationFn: (data) => projectService.createIssue(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.PROJECT],
            });
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.PROJECT_CATEGORIES_WITH_ISSUES],
            });
        },
    });

export const useGetProjectCategories = (projectId: string) =>
    useQuery<CategoryWithIssueAndProject[], AxiosError<ErrorResponse>>({
        queryFn: () => projectService.getProjectCategories(projectId),
        queryKey: [QueryKeys.PROJECT_CATEGORIES_WITH_ISSUES, projectId],
    });
