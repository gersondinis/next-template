import en from './locale/en.json';
import pt from './locale/pt.json';
import es from './locale/es.json';
import it from './locale/it.json';
import pl from './locale/pl_PL.json';
import {Language} from '../store/types';
import {createIntl, createIntlCache, RawIntlProvider} from 'react-intl';
import {FC, ReactNode, useMemo} from 'react';
import {useStore} from '../store';


const cache = createIntlCache();

export const i18nMessages = {
  [Language.EN]: en,
  [Language.PT]: pt,
  [Language.ES]: es,
  [Language.IT]: it,
  [Language.PL]: pl
};

export let intl = createIntl({locale: Language.EN, messages: i18nMessages[Language.EN]}, cache);

export const t = (id: string) => intl.formatMessage({id});

export const I18nProvider: FC<II18nProvider> = ({children}) => {
  const {app: {language}} = useStore();

  intl = useMemo(() => createIntl({locale: language, messages: i18nMessages[language]}, cache), [language]);

  return (
    <RawIntlProvider value={intl}>
      {children}
    </RawIntlProvider>
  );
};

export interface II18nProvider {
  children: ReactNode;
}
