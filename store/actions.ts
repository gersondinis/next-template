import localforage from 'localforage';
import {store} from './store';
import {Language, LANGUAGE_KEY} from './types';


export const actions = {
  app: {
    init: async () => {
      const language = await localforage.getItem(LANGUAGE_KEY) ?? Language.EN;
      store.app.language = language as Language;
      localforage.setItem(LANGUAGE_KEY, language);
    },
    setLanguage: (language: Language) => {
      store.app.language = language;
      localforage.setItem(LANGUAGE_KEY, language);
    },
    setDarkMode: (enable: boolean) => store.app.darkMode = enable,
    toggleDarkMode: () => store.app.darkMode = !store.app.darkMode,
  },
  incCount: () => store.count++,
  decCount: () => store.count--,
};
