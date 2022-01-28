import React from 'react';
import { BiTrashAlt } from 'react-icons/bi';

import { useJob } from '../hooks/useJob';
import styles from '../styles/components/Modal.module.scss';

type ModalProps = {
  jobId: string;
  changeModal: () => void;
};

export const Modal: React.FC<ModalProps> = ({ changeModal, jobId }) => {
  const { removeJob } = useJob();
  return (
    <div className={styles.container} onClick={() => changeModal()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <BiTrashAlt size={40} color="#787880" />
        </div>
        <div className={styles.modalBody}>
          <h1>Excluir Job</h1>
          <p>
            Tem certeza que deseja excluir este job?
            <br />
            Esta ação não poderá ser desfeita.
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.buttonModal}
            onClick={() => {
              changeModal();
            }}
          >
            Cancelar
          </button>
          <button
            className={styles.buttonModal}
            onClick={() => {
              removeJob(jobId);
              changeModal();
            }}
          >
            Excluir Job
          </button>
        </div>
      </div>
    </div>
  );
};
