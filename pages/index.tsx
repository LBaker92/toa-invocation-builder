import type { NextPage } from 'next';
import Head from 'next/head'
import InvocationDisplay from '../components/InvocationDisplay';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (<>
    <Head>
      <title>Invocation Builder</title>
      <meta name="description" content="A web based raid invocation UI for OSRS." />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <InvocationDisplay />
    </main>
  </>)
}

export default Home
