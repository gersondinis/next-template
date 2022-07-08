import {CacheProvider, EmotionCache} from '@emotion/react';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {AppProps} from 'next/app';
import {FC} from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.css';
import {darkTheme} from '../styles/theme/dark';
import {lightTheme} from '../styles/theme/light';
import {createEmotionCache} from '../utility/mui/createEmotionCache';
import {useStore} from '../utility/store';
import {ReactQueryProvider} from '../xhr/utils/ReactQueryProvider';
import {SnackbarProvider} from '../utility/notistack/SnackbarProvider';
import {SnackbarUtilsConfigurator} from '../utility/notistack/SnackbarUtils';


export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const themeDark = createTheme(darkTheme);
const themeLight = createTheme(lightTheme);

export const App: FC<MyAppProps> = ({Component, pageProps, emotionCache = clientSideEmotionCache}) => {
  const {app: {darkMode}} = useStore();

  return (
    <ReactQueryProvider>
      <SnackbarProvider>
        <SnackbarUtilsConfigurator />
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={darkMode ? themeDark : themeLight}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </SnackbarProvider>
    </ReactQueryProvider>
  );
};

export default App;
