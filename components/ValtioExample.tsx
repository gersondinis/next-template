import {Add, Remove, DarkMode, LightMode} from '@mui/icons-material';
import {Box, Card, CardContent, CardHeader, IconButton} from '@mui/material';
import {actions, useStore} from '../utility/store';


export const DarkModeIcon = () => {
  const {app: {darkMode}} = useStore();

  return (
    <IconButton onClick={actions.app.toggleDarkMode} size={'large'}>
      {darkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export const ValtioExample = () => {
  const {count} = useStore();

  return (
    <Card raised>
      <CardHeader avatar={<DarkModeIcon />} title={'valtio'} subheader={'state management'} />
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
