import React, { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';

import Image from 'next/image';

import { useJob } from '../hooks/useJob';
import styles from '../styles/components/FormJob.module.scss';

export const FormJob: React.FC = () => {
  const { addJob } = useJob();

  const [name, setName] = useState('');
  const [money, setMoney] = useState(0);
  const [hours, setHours] = useState(0);
  const [hoursDay, setHoursDay] = useState(0);
  const [daysProject, setDaysProject] = useState(0);

  useEffect(() => {
    const calc = () => {
      return hours * 40;
    };

    const days = () => {
      return hours / 6;
    };
    setDaysProject(days);
    setMoney(calc);
  }, [hoursDay, hours, name]);

  function handlerAddJob() {
    addJob({
      id: String(Math.random()),
      number: 1,
      title: name.charAt(0).toUpperCase().concat(name.slice(1)),
      price: money.toString(),
      hours,
      hoursDay,
      deadline: Number(daysProject.toFixed(2)),
      status: true,
    });
    setName('');
    setMoney(0);
    setHours(0);
    setHoursDay(0);
    setDaysProject(0);
  }

  return (
    <div className={styles.wrapperProfileCards}>
      <div className={styles.formProfile}>
        <div className={styles.dataProfile}>
          <div className={styles.title}>
            <h1>Dados do Job</h1>
          </div>
          <p>Nome do Job</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.wrapperInputProfile}>
            <div className={styles.wrapperInput}>
              <p>
                Quantas horas <br />
                por dia vai dedicar ao Job?
              </p>
              <input
                type="number"
                value={hoursDay}
                onChange={(e) => setHoursDay(Number(e.target.value))}
              />
            </div>
            <div className={styles.wrapperInput}>
              <p>
                Estimativa de <br />
                horas para esse job
              </p>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cardProfile}>
        <section className={styles.wrapperOne}>
          <div className={styles.wrapperImage}>
            <Image
              src="/assets/Group.svg"
              className={styles.imagePerfil}
              layout="fill"
            />
          </div>
        </section>
        <section className={styles.wrapperTwo}>
          {money ? (
            <span>{money}</span>
          ) : (
            <p>
              {' '}
              Preencha os dados ao lado para <br /> ver o valor do projeto
            </p>
          )}

          <div className={styles.wrapperButtons}>
            <button
              onClick={() => {
                handlerAddJob();
              }}
            >
              Salvar
            </button>
            <button>
              <FiTrash color="#787880" size={24} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
