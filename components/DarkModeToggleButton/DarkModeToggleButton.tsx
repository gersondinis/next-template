import {DarkMode, LightMode} from '@mui/icons-material';
import {Box, IconButton} from '@mui/material';
import {actions, useStore} from '../../store';


export const DarkModeToggleButton = () => {
    const {app: {darkMode}} = useStore();

    return (
      <Box>
        <IconButton onClick={actions.app.toggleDarkMode} size={'large'}>
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Box>
    );
  };