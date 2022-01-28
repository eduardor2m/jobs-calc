import React, { useState } from 'react';
import { FiTrash, FiEdit3 } from 'react-icons/fi';

import Link from 'next/link';

import styles from '../styles/components/CardJob.module.scss';
import { Modal } from './modal';

type CardJobProps = {
  data: {
    id: string;
    number: number;
    title: string;
    price: string;
    deadline: number;
    status: boolean;
  };
};

export const CardJob: React.FC<CardJobProps> = ({ data }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      {modal && <Modal changeModal={() => setModal(!modal)} jobId={data.id} />}
      <div className={styles.cardJob}>
        <p className={styles.number}>{data.number}</p>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.deadline}>
          <p>Prazo</p>
          <h3>
            {data.deadline >= 2
              ? data.deadline + ' dias '
              : data.deadline + ' dia '}
            para entrega
          </h3>
        </div>
        <div className={styles.price}>
          <p>Valor</p>
          <h3>R$ {data.price}</h3>
        </div>
        <div
          className={styles.status}
          style={{
            backgroundColor: data.status ? '#faeceb' : '#e8f8e8',
            color: data.status ? '#eb3b35' : '#36b336',
          }}
        >
          {data.status ? <p>Encerrado</p> : <p>Em andamento</p>}
        </div>
        <div className={styles.wrapperButtons}>
          <Link
            href={{
              pathname: '/edit/[...id]',
              query: {
                id: data.id,
              },
            }}
          >
            <button>
              <FiEdit3 size={24} color="#787880" />
            </button>
          </Link>
          <button onClick={() => setModal(true)}>
            <FiTrash size={24} color="#787880" />
          </button>
        </div>
      </div>
    </>
  );
};
