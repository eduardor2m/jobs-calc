import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import Image from 'next/image';
import Link from 'next/link';

import { useJob } from '../hooks/useJob';
import { useProfile } from '../hooks/useProfile';
import styles from '../styles/components/Header.module.scss';

export const Header: React.FC = () => {
  const { job } = useJob();
  const { profile } = useProfile();
  return (
    <header className={styles.header}>
      <div className={styles.wrapperOne}>
        <div className={styles.logo}>
          <Image src={'/assets/Simbol.svg'} width={48} height={48} />
          <h1>JobsCalc</h1>
        </div>
        <div className={styles.alert}>
          <FiAlertCircle size={24} color="#F1972C" />
          <p>
            Você tem{' '}
            {job.reduce((acc, cur) => acc + (cur.status === false ? 1 : 0), 0)}{' '}
            projeto
            {job.reduce((acc, cur) => acc + (cur.status === false ? 1 : 0), 0) >
            1
              ? 's'
              : ''}{' '}
            em andamento
          </p>
        </div>
        <div className={styles.perfil}>
          <div className={styles.infoPerfil}>
            <h3>{profile.name ? profile.name : 'Crie um perfil'}</h3>
            <a href="/profile">
              <Link href={'/profile'}>
                <p className={styles.linkPerfil}>Ver perfil</p>
              </Link>
            </a>
          </div>
          <div className={styles.wrapperImage}>
            <Image
              src={profile.url || '/assets/Simbol.svg'}
              className={styles.imagePerfil}
              layout="fill"
            />
          </div>
        </div>
      </div>
      <div className={styles.wrapperTwo}>
        <div className={styles.wrapperProjects}>
          <div className={styles.projectBox}>
            <h2>{job.length}</h2>
            <p>Projetos ao total</p>
          </div>
          <div className={styles.projectBox}>
            <h2>
              {job.reduce(
                (acc, cur) => acc + (cur.status === false ? 1 : 0),
                0
              )}{' '}
            </h2>
            <p>Em andamento</p>
          </div>
          <div className={styles.projectBox}>
            <h2>
              {job.reduce(
                (acc, cur) => acc + (cur.status === false ? 0 : 1),
                0
              )}{' '}
            </h2>
            <p>Encerrados</p>
          </div>
        </div>

        <Link href="/job">
          <a className={styles.buttonNewJob} href="/job">
            <div>
              <h2>+</h2>
            </div>
            <p>ADICIONAR NOVO JOB</p>
          </a>
        </Link>
      </div>
    </header>
  );
};
