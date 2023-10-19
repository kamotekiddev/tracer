import axios from 'axios';
import { useQuery } from 'react-query';
import { FullProject } from '@/types/project';

export const useGetProjects = () =>
    useQuery<{ data: FullProject[] }>({
        queryFn: () => axios.get('/api/projects/read'),
    });
