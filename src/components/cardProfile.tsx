import React from 'react';

import Image from 'next/image';

import styles from '../styles/components/CardProfile.module.scss';

type CardProfileProps = {
  data: {
    name: string;
    price: string;
  };
};

export const CardProfile: React.FC<CardProfileProps> = ({ data }) => {
  return (
    <div className={styles.cardProfile}>
      <section className={styles.wrapperOne}>
        <div className={styles.wrapperImage}>
          <Image
            src={
              'https://i.pinimg.com/originals/99/cf/9f/99cf9ff40f47e1f3faf0f85f78180f4c.jpg'
            }
            className={styles.imagePerfil}
            layout="fill"
          />
        </div>
        <h1>{data.name}</h1>
      </section>
      <section className={styles.wrapperTwo}>
        <p>
          O valor da sua hora é <br />
          <span>{data.price} reais</span>
        </p>
        <button>Salvar dados</button>
      </section>
    </div>
  );
};
