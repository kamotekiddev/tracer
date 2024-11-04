import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ErrorResponse } from "@/features/interfaces";
import * as issueService from "./issueService";
import * as userService from "@/features/services/userService";
import {
    CommentIssueRequest,
    Issue,
    IssueComment,
    IssueHistory,
    IssueWithProject,
    UpdateIssueRequest,
} from "./issue.types";
import { QueryKeys } from "@/lib/query-keys";
import { queryClient } from "@/providers/QueryProvider";
import { CreateIssueRequest } from "./CreateIssueInline";
import { User } from "@/features/interfaces/user";
import { Category } from "../projects.types";

export const useGetIssueById = (issueId: string) =>
    useQuery<IssueWithProject, AxiosError<ErrorResponse>>({
        queryFn: () => issueService.getIssueById(issueId),
        queryKey: [QueryKeys.ISSUE, issueId],
        enabled: !!issueId,
    });

export const useCreateIssue = () =>
    useMutation<Issue, AxiosError<ErrorResponse>, CreateIssueRequest>({
        mutationFn: (data) => issueService.createIssue(data),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.PROJECT],
            }),
    });

export const useGetIssueHistory = (issueId: string) =>
    useQuery<IssueHistory[], AxiosError<ErrorResponse>>({
        queryFn: () => issueService.getIssueHistory(issueId),
        queryKey: [QueryKeys.ISSUE_HISTORY, issueId],
    });

export const useGetIssueAssignee = (userId?: string) =>
    useQuery<User, AxiosError<ErrorResponse>>({
        queryFn: () => userService.getUserById(userId),
        queryKey: [QueryKeys.USER, userId],
        enabled: !!userId,
    });

export const useGetIssueCategory = (categoryId: string) =>
    useQuery<Category, AxiosError<ErrorResponse>>({
        queryFn: () => issueService.getCategoryById(categoryId),
        queryKey: [QueryKeys.CATEGORY, categoryId],
        enabled: !!categoryId,
    });

export const useUpdateIssue = () =>
    useMutation<Issue, AxiosError<ErrorResponse>, UpdateIssueRequest>({
        mutationFn: (data) => issueService.updateIssue(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.PROJECT],
            });
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.ISSUE],
            });
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.ISSUE_HISTORY],
            });
        },
    });

export const useGetIssueComments = (issueId: string) =>
    useQuery<IssueComment[], AxiosError<ErrorResponse>>({
        queryFn: () => issueService.getIssueComments(issueId),
        queryKey: [QueryKeys.ISSUE_COMMENTS],
    });

export const useComment = () =>
    useMutation<IssueComment, AxiosError<ErrorResponse>, CommentIssueRequest>({
        mutationFn: (data) => issueService.comment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.ISSUE_COMMENTS],
            });
        },
    });
