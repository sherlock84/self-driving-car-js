import type { NextPage } from 'next';
import Head from 'next/head';
import PlayCanvas from '../components/PlayCanvas';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <PlayCanvas />
      <Head>
        <title>Self Driving Car - ReactJS</title>
      </Head>
    </div>
  );
};

export default Home;
