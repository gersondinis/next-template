import {Button, Card, CardContent, CardHeader, Stack} from '@mui/material';
import {PostAPI} from '../xhr';
import {Post} from '../xhr/endpoints/post';
import {LoadingScreen} from './LoadingScreen';

export const ReactQueryExample = () => {
  const {data, isLoading} = PostAPI.useGetList<Post[]>();
  const createPostMutation = PostAPI.useCreate();

  return (
    <Card raised>
      <CardHeader title={'react-query'} subheader={'server state management'} />
      <CardContent>
        <LoadingScreen loading={isLoading || createPostMutation.isLoading} />
        <ul>
          {data?.slice(-5).map((post: Post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
        <Stack>
          <Button
            variant='contained'
            onClick={() => {
              createPostMutation.mutate({
                id: Date.now(),
                title: 'Do Laundry'
              });
            }}
          >
            POST
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
