import type { NextPage } from 'next';
import Head from 'next/head';

import { FormJob } from '../components/formJob';
import { HeaderSmall } from '../components/headerSmall';
import styles from '../styles/pages/Profile.module.scss';

const Job: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Job</title>
        <meta name="description" content="Job" />
        <link rel="icon" href="/assets/Simbol.png" />
      </Head>
      <HeaderSmall title="Adicionar Novo Job" />
      <main className={styles.main}>
        <FormJob />
      </main>
    </div>
  );
};

export default Job;
