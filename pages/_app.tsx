import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {AppProps} from 'next/app';
import {FC, useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import {I18nProvider} from '../i18n/I18nProvider';
import {clientSideEmotionCache, themeDark, themeLight} from '../utility/mui/mui-utils';
import {actions, useStore} from '../utility/store';
import {ReactQueryProvider} from '../xhr/utils/ReactQueryProvider';


export const App: FC<MyAppProps> = ({Component, pageProps, emotionCache = clientSideEmotionCache}) => {
  const {app: {darkMode}} = useStore();

  useEffect(() => void actions.app.init(), []);

  return (
    <ReactQueryProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={darkMode ? themeDark : themeLight}>
          <I18nProvider>
            <CssBaseline />
            <Component {...pageProps} />
            <ToastContainer theme={darkMode ? 'dark' : 'light'}/>
          </I18nProvider>
        </ThemeProvider>
      </CacheProvider>
    </ReactQueryProvider>
  );
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default App;
