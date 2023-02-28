import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Project } from './Project';
import { ProjectAPI } from './ProjectAPI';

export const useProjects = () => {
  const [page, setPage] = useState(0);

  const queryInfo = useQuery(
    ['project', page],
    () => ProjectAPI.get(page + 1),

    {
      keepPreviousData: true
    }
  );

  return { ...queryInfo, page, setPage };
};

export function useSaveProject() {
  const queryClient = useQueryClient();
  return useMutation((project: Project) => ProjectAPI.put(project), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  });
}
