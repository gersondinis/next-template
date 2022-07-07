import {AxiosInstance} from 'axios';
import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from 'react-query';
import {snackbarUtils} from '../../utility/notistack/SnackbarUtils';
import {queryClient, httpClient as client} from './client';

export interface ICRUDFactoryArgs {
  type: any;
  endpoint: string;
  httpClient?: AxiosInstance;
}

export const CRUD_KEYS = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

export const CRUDFactory = <T>({type, endpoint, httpClient = client}: ICRUDFactoryArgs) => {
  return {
    useGetList: () =>
      useQuery([type, CRUD_KEYS.READ], () => httpClient.get<T[]>(endpoint).then(({data}) => data), {
        onError: (e: Error) => {
          snackbarUtils.error(e?.message);
        }
      }),
    useGet: ({id}: {id: number}) =>
      useQuery([type, id], () => httpClient.get<T>(`${endpoint}/${id}`).then(({data}) => data), {
        onError: (e: Error) => {
          snackbarUtils.error(e?.message);
        }
      }),
    useCreate: () =>
      useMutation([type, CRUD_KEYS.CREATE], (entity: T) => httpClient.post(endpoint, entity), {
        onSuccess: () => {
          snackbarUtils.success('Success');
          queryClient.invalidateQueries([type, CRUD_KEYS.READ]);
        },
        onError: (e: Error) => {
          snackbarUtils.error(e?.message);
        }
      }),
    useUpdate: () =>
      useMutation([type, CRUD_KEYS.UPDATE], (id: number, entity: T) => httpClient.patch(`${endpoint}/${id}`, entity), {
        onSuccess: () => {
          snackbarUtils.success('Success');
          queryClient.invalidateQueries([type, CRUD_KEYS.READ]);
        },
        onError: (e: Error) => {
          snackbarUtils.error(e?.message);
        }
      }),
    useDelete: () =>
      useMutation([type, CRUD_KEYS.DELETE], (id: number) => httpClient.delete(`${endpoint}/${id}`), {
        onSuccess: () => {
          snackbarUtils.success('Success');
          queryClient.invalidateQueries([type, CRUD_KEYS.READ]);
        },
        onError: (e: Error) => {
          snackbarUtils.error(e?.message);
        }
      })
  };
};
