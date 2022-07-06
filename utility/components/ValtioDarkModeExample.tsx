import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import { actions, useStore } from '../store';

export const ValtioDarkModeIconExample = () => {
  const {app: { darkMode }} = useStore();

  return (
    <IconButton onClick={actions.app.toggleDarkMode} size={'large'}>
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ValtioDarkModeIconExample;
