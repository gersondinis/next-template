import { Stack } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ValtioExample from '../utility/components/ValtioExample'

export const Home: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://nextjs.org">Next.js</a> template
        </h1>
        <Stack direction={'row'} m={2} gap={2}>
          <ValtioExample/>
        </Stack>
      </main>
    </div>
  )
}

export default Home;
