//.storybook/preview.js

import {themeLight} from '../utility/mui/mui-utils';
import {ThemeProvider} from '@mui/material/styles';
import {ThemeProvider as EmotionThemeProvider} from 'emotion-theming';
import CssBaseline from '@mui/material/CssBaseline';
import {useStore} from '../store/index';


const withThemeProvider = (Story, context) => {
  const {app: {darkMode}} = useStore();

  return (
    <EmotionThemeProvider theme={themeLight}>
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
