import {Add, Remove} from '@mui/icons-material';
import {Box, Card, CardContent, CardHeader, IconButton} from '@mui/material';
import {actions, useStore} from '../store';
import {DarkModeToggleButton} from './DarkModeToggleButton/DarkModeToggleButton';


export const ValtioExample = () => {
  const {count} = useStore();

  return (
    <Card raised>
      <CardHeader avatar={<DarkModeToggleButton />} title={'Valtio'} subheader={'State management'} />
      <CardContent>
        <Box sx={styles.container}>
          <IconButton onClick={actions.decCount}>
            <Remove />
          </IconButton>
          <Box sx={styles.counter}>{count}</Box>
          <IconButton onClick={actions.incCount}>
            <Add />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    display: 'flex',
    fontSize: '40px',
    padding: 1
  }
};
