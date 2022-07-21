import {AxiosInstance} from 'axios';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';
import {httpClient as client, queryClient} from './client';


export interface ICRUDFactoryArgs {
  type: string;
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
          toast.error(e?.message);
        }
      }),
    useGet: ({id}: {id: number}) =>
      useQuery([type, id], () => httpClient.get<T>(`${endpoint}/${id}`).then(({data}) => data), {
        onError: (e: Error) => {
          toast.error(e?.message);
        }
      }),
    useCreate: () =>
      useMutation([type, CRUD_KEYS.CREATE], (entity: T) => httpClient.post(endpoint, entity), {
        onSuccess: () => {
          toast.success('Success');
          queryClient.invalidateQueries([type, CRUD_KEYS.READ]);
        },
        onError: (e: Error) => {
          toast.error(e?.message);
        }
      }),
    useUpdate: () =>
      useMutation([type, CRUD_KEYS.UPDATE], ({id, entity}: {id: number, entity: T}) => httpClient.patch(`${endpoint}/${id}`, entity), {
        onSuccess: () => {
          toast.success('Success');
          queryClient.invalidateQueries([type, CRUD_KEYS.READ]);
        },
        onError: (e: Error) => {
          toast.error(e?.message);
        }
      }),
    useDelete: () =>
      useMutation([type, CRUD_KEYS.DELETE], (id: number) => httpClient.delete(`${endpoint}/${id}`), {
        onSuccess: () => {
          toast.success('Success');
          queryClient.invalidateQueries([type, CRUD_KEYS.READ]);
        },
        onError: (e: Error) => {
          toast.error(e?.message);
        }
      })
  };
};
