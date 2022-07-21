import createCache from '@emotion/cache';
import {createTheme} from '@mui/material';
import {darkTheme} from '../../styles/theme/dark';
import {lightTheme} from '../../styles/theme/light';


export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export const clientSideEmotionCache = createEmotionCache();
export const themeDark = createTheme(darkTheme);
export const themeLight = createTheme(lightTheme);