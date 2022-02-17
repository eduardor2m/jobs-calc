/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { HeaderSmall } from '../../components/headerSmall';
import { useJob } from '../../hooks/useJob';
import { useProfile } from '../../hooks/useProfile';
import styles from '../../styles/pages/Edit.module.scss';

const Job: NextPage = () => {
  const { job, editJob } = useJob();
  const { profile } = useProfile();
  const router = useRouter();
  const id = router.query.id as string;

  const [name, setName] = useState('');
  const [money, setMoney] = useState(0);
  const [hours, setHours] = useState(0);
  const [hoursDay, setHoursDay] = useState(0);
  // const [daysProject, setDaysProject] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const jobEdit = job.find((job) => job.id === id);
      if (jobEdit) {
        setName(jobEdit.title);
        setMoney(Number(jobEdit.price));
        setHours(jobEdit.hours);
        setHoursDay(jobEdit.hoursDay);
        // setDaysProject(jobEdit.deadline);
      }
    };
    getData();
  }, [id, job]);

  function handlerEditJob() {
    const jobEditF = {
      id,
      number: 1,
      title: name.charAt(0).toUpperCase().concat(name.slice(1)),
      price: (hours * profile.valueHour).toString(),
      hours,
      hoursDay,
      deadline: Number((hours / hoursDay).toFixed(2)),
      status: true,
    };
    editJob(id, jobEditF);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Job</title>
        <meta name="description" content="Job" />
        <link rel="icon" href="/assets/Simbol.png" />
      </Head>
      <HeaderSmall title="Adicionar Novo Job" />
      <main className={styles.main}>
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
                    handlerEditJob();
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
      </main>
    </div>
  );
};

export default Job;
