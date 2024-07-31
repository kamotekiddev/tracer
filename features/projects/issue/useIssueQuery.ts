import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ErrorResponse } from "@/features/interfaces";
import * as issueService from "./issueService";
import { Issue, IssueWithProject } from "./issue.types";
import { QueryKeys } from "@/lib/query-keys";
import { queryClient } from "@/providers/QueryProvider";
import { CreateIssueRequest } from "./CreateIssueInline";

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
