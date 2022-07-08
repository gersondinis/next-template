import {useQuery} from 'react-query';
import {snackbarUtils} from '../../utility/notistack/SnackbarUtils';
import {httpClient} from '../utils/client';
import {CRUD_KEYS, CRUDFactory} from '../utils/helpers';


export const type = 'POST';
export const endpoint = '/posts';
export const KEYS = {
  ...CRUD_KEYS,
  COMMENTS: 'COMMENTS'
};

export interface Post {
  id?: number;
  title: string;
  userId?: number;
  body?: string;
}

export const PostAPI = {
  ...CRUDFactory<Post>({type, endpoint, httpClient}),
  useGetPostComments: (id: number) =>
    useQuery([type, id, KEYS.COMMENTS], () => httpClient.get<Post>(`${endpoint}/${id}/comments`).then(({data}) => data), {
      onError: (e: Error) => {
        snackbarUtils.error(e?.message);
      }
    })
};
