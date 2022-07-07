import {useQuery} from 'react-query';
import {httpClient} from '../utils/client';
import {CRUD_KEYS, generateCrudEndpoints} from '../utils/helpers';

export const type = 'POST';
export const endpoint = '/posts';
export const KEYS = {
  ...CRUD_KEYS,
  COMMENTS: 'COMMENTS'
};

export interface Post {
  id?: number;
  title: string
}

export const endpoints = {
  ...generateCrudEndpoints({type, endpoint, httpClient}),
  useGetPostComments: (id: number) =>
    useQuery([type, id, KEYS.COMMENTS], () => httpClient.get(`${endpoint}/${id}/comments`).then(({data}) => data))
};

export default endpoints;
