import {AxiosInstance} from 'axios';
import {useMutation, useQuery} from 'react-query';
import {queryClient, httpClient as client} from './client';

export interface IGenerateCrudEndpointsArgs {
  type: any;
  endpoint: string;
  httpClient?: AxiosInstance;
};

export const CRUD_KEYS = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

export const generateCrudEndpoints = ({type, endpoint, httpClient = client}: IGenerateCrudEndpointsArgs) => {
  return {
    useGetList: <T>() => useQuery([type, CRUD_KEYS.READ], () => httpClient.get<T>(endpoint).then(({data}) => data)),
    useGet: <T>(id: number) => useQuery([type, id], () => httpClient.get<T>(`${endpoint}/${id}`).then(({data}) => data)),
    useCreate: <T>() =>
      useMutation([type, CRUD_KEYS.CREATE], (entity: T) => httpClient.post(endpoint, entity), {
        onSuccess: () => queryClient.invalidateQueries([type, CRUD_KEYS.READ])
      }),
    useUpdate: <T>() =>
      useMutation([type, CRUD_KEYS.UPDATE], (id: number, entity: T) => httpClient.patch(`${endpoint}/${id}`, entity), {
        onSuccess: () => queryClient.invalidateQueries([type, CRUD_KEYS.READ])
      }),
    useDelete: () =>
      useMutation([type, CRUD_KEYS.DELETE], (id) => httpClient.delete(`${endpoint}/${id}`), {
        onSuccess: () => queryClient.invalidateQueries([type, CRUD_KEYS.READ])
      })
  };
};
