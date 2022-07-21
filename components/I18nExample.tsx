import {Language as LanguageIcon} from '@mui/icons-material';
import {Card, CardContent, CardHeader, Chip, Stack, Typography} from '@mui/material';
import {FormattedMessage} from 'react-intl';
import {i18nMessages} from '../i18n/I18nProvider';
import {actions, useStore} from '../store';
import {Language} from '../store/types';


export const I18nExample = () => {
  const {app: {language}} = useStore();

  return (
    <Card raised>
      <CardHeader avatar={<LanguageIcon />} title={'I18n'} subheader={'Internalization'} />
      <CardContent>
        <Typography variant={'caption'}><FormattedMessage id={'page.account_details.language'}/>:</Typography>
        <Stack direction={'row'} spacing={1}>
          {Object.keys(i18nMessages).map((lang) => {
            return (
              <Chip
                key={lang}
                label={lang}
                variant={lang === language ? 'filled' : 'outlined'}
                onClick={() => actions.app.setLanguage(lang as Language)}
              />
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};
