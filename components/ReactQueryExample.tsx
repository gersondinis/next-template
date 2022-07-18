import {Button, Card, CardContent, CardHeader, Stack} from '@mui/material';
import {PostAPI} from '../xhr';
import {LoadingScreen} from './LoadingScreen';


export const ReactQueryExample = () => {
  const {data, isLoading} = PostAPI.useGetList();
  const createPostMutation = PostAPI.useCreate();

  return (
    <Card raised>
      <CardHeader title={'React query'} subheader={'Server state management'} />
      <CardContent>
        <LoadingScreen loading={isLoading || createPostMutation.isLoading} />
        <ul>
          {data?.slice(-5).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
        <Stack>
          <Button
            variant={'contained'}
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
