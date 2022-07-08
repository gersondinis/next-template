import {store} from './store';

export const actions = {
  app: {
    setDarkMode: (enable: boolean) => store.app.darkMode = enable,
    toggleDarkMode: () => store.app.darkMode = !store.app.darkMode,
  },
  incCount: () => store.count++,
  decCount: () => store.count--,
};
