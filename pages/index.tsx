import {Box, Link, Stack, Typography} from '@mui/material';
import {NextPage} from 'next';
import Head from 'next/head';
import {I18nExample} from '../components/I18nExample';
import {ReactHookFormExample} from '../components/ReactHookFormExample/ReactHookFormExample';
import {ReactQueryExample} from '../components/ReactQueryExample';
import {ValtioExample} from '../components/ValtioExample';


export const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next App Template</title>
        <meta name={'description'} content={'Template'} />
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

      <Box sx={styles.root}>
        <Typography variant={'h1'}>
          <Link href={'https://nextjs.org'} sx={styles.titleLink}>Next.js</Link> template
        </Typography>
        <Stack sx={styles.examplesContainer}>
          <ValtioExample />
          <ReactQueryExample />
          <ReactHookFormExample />
          <I18nExample />
        </Stack>
      </Box>
    </>
  );
};

const styles = {
  root: {
    gap: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  titleLink: {
    fontWeight: 'bold',
    color: 'primary.main',
    textDecoration: 'none'
  },
  examplesContainer: {
    direction: {xs: 'column', xl: 'row'},
    m: 2,
    gap: 2
  }
};

export default Home;
