import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import Link from 'next/link';

import styles from '../styles/components/HeaderSmall.module.scss';

type Props = {
  title: string;
};

export const HeaderSmall: React.FC<Props> = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <a href="/">
          <Link href="/">
            <AiOutlineArrowLeft size={24} color="#BFBFCC" />
          </Link>
        </a>
        <p>{title}</p>
        <div />
      </div>
    </header>
  );
};
