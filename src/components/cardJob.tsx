import React, { useState } from 'react';
import { FiTrash, FiEdit3, FiRefreshCw, FiCheck } from 'react-icons/fi';

import Link from 'next/link';

import { useJob } from '../hooks/useJob';
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

  const { changeStatusJob } = useJob();
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
            backgroundColor: data.status ? '#e8f8e8' : '#98c1d9',
            color: data.status ? '#36b336' : '#3d5a80',
          }}
        >
          {data.status ? <p>Concluído</p> : <p>Em andamento</p>}
        </div>
        <div className={styles.actions}>
          <button
            onClick={() => changeStatusJob(data.id)}
            style={{
              backgroundColor: data.status ? '#98c1d9' : '#e8f8e8',
              color: data.status ? '#3d5a80' : '#36b336',
            }}
          >
            {data.status === true ? (
              <FiRefreshCw color="#3d5a80" size="20px" />
            ) : (
              <FiCheck color="#36b336" size="20px" />
            )}
          </button>
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
