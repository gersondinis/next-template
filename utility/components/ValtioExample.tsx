import { Add, Remove } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { actions, store, useStore } from '../store';
import ValtioDarkModeIconExample from './ValtioDarkModeExample';

export const ValtioExample = () => {
  const {count} = useStore();

  return (
    <Card raised>
      <CardHeader avatar={<ValtioDarkModeIconExample/>} title={'valtio'} subheader={'state management'}/>
      <CardContent>
        <Box sx={styles.container}>
          <IconButton onClick={actions.decCount}><Remove/></IconButton>
          <Box sx={styles.counter}>
            {count}
          </Box>
          <IconButton onClick={actions.incCount}><Add/></IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  counter: {
    display: 'flex',
    fontSize: '40px',
    padding: 1
  }
}

export default ValtioExample;