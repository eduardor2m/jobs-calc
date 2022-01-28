import type { NextPage } from 'next';
import Head from 'next/head';

import { CardJob } from '../components/cardJob';
import { Header } from '../components/header';
import { useJob } from '../hooks/useJob';
import styles from '../styles/pages/Home.module.scss';

// const jobs = [
//   {
//     id: '1',
//     number: 1,
//     title: 'Desenvolvimento',
//     price: '1000,00',
//     deadline: '5 dias para entrega',
//     status: true,
//   },
//   {
//     id: '1',
//     number: 1,
//     title: 'Pizzaria Guloso',
//     price: '4500,00',
//     deadline: '3 dias para entrega',
//     status: false,
//   },
// ];

const Home: NextPage = () => {
  const { job } = useJob();
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/assets/Simbol.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        {job.map((job) => {
          return <CardJob key={job.id} data={job} />;
        })}
      </main>
    </div>
  );
};

export default Home;
