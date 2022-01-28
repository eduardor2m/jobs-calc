import type { NextPage } from 'next';
import Head from 'next/head';

import { FormProfile } from '../components/formProfile';
import { HeaderSmall } from '../components/headerSmall';
import styles from '../styles/pages/Profile.module.scss';

const Profile: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
        <link rel="icon" href="/assets/Simbol.png" />
      </Head>
      <HeaderSmall title="Meu perfil" />
      <main className={styles.main}>
        <FormProfile />
      </main>
    </div>
  );
};

export default Profile;
