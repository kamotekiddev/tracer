import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FullProject } from '@/types/project';
import { Project } from '@prisma/client';

enum ProjectQueryKey {
    getProjects = 'get-projects',
}

export const useGetProjects = () =>
    useQuery<{ data: FullProject[] }>({
        queryFn: () => axios.get('/api/projects/read'),
        queryKey: [ProjectQueryKey.getProjects],
    });

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation<{ data: Project }, AxiosError, string>(
        (id) => axios.delete(`/api/projects/${id}`),
        {
            onSettled: () =>
                queryClient.invalidateQueries([ProjectQueryKey.getProjects]),
        },
    );
};
