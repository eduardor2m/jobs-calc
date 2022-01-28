import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import Image from 'next/image';
import Link from 'next/link';

import { useJob } from '../hooks/useJob';
import styles from '../styles/components/Header.module.scss';

export const Header: React.FC = () => {
  const { job } = useJob();
  return (
    <header className={styles.header}>
      <div className={styles.wrapperOne}>
        <div className={styles.logo}>
          <Image src={'/assets/Simbol.svg'} width={48} height={48} />
          <h1>JobsCalc</h1>
        </div>
        <div className={styles.alert}>
          <FiAlertCircle size={24} color="#F1972C" />
          <p>Você tem 2 horas livres no seu dia</p>
        </div>
        <div className={styles.perfil}>
          <div className={styles.infoPerfil}>
            <h3>Eduardo</h3>
            <a href="/profile">
              <Link href={'/profile'}>
                <p className={styles.linkPerfil}>Ver perfil</p>
              </Link>
            </a>
          </div>
          <div className={styles.wrapperImage}>
            <Image
              src={
                'https://i.pinimg.com/originals/99/cf/9f/99cf9ff40f47e1f3faf0f85f78180f4c.jpg'
              }
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
