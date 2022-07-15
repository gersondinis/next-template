import {CacheProvider, EmotionCache} from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {AppProps} from 'next/app';
import {FC} from 'react';
import {ToastContainer} from 'react-toastify';
import {darkTheme} from '../styles/theme/dark';
import {lightTheme} from '../styles/theme/light';
import {createEmotionCache} from '../utility/mui/createEmotionCache';
import {useStore} from '../utility/store';
import {ReactQueryProvider} from '../xhr/utils/ReactQueryProvider';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';


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
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={darkMode ? themeDark : themeLight}>
          <CssBaseline />
          <Component {...pageProps} />
          <ToastContainer theme={darkMode ? 'dark' : 'light'}/>
        </ThemeProvider>
      </CacheProvider>
    </ReactQueryProvider>
  );
};

export default App;
