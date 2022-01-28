import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { useProfile } from '../hooks/useProfile';
import styles from '../styles/components/FormProfile.module.scss';

export const FormProfile: React.FC = () => {
  const { addProfile, profile } = useProfile();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [money, setMoney] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [weeks, setWeeks] = useState(0);
  const [calcHour, setCalcHour] = useState('');

  useEffect(() => {
    const calc = () => {
      return (money / ((hours * days * (52.143 - weeks)) / 12)).toFixed(2);
    };
    setCalcHour(calc);
  }, [money, hours, days, weeks]);

  function handlerAddProfile() {
    addProfile({
      id: String(Math.random()),
      name: name,
      url: url,
      valueHour: Number(calcHour),
    });
    setName('');
    setUrl('');
    setMoney(0);
    setHours(0);
    setDays(0);
    setWeeks(0);
    setCalcHour('');
  }

  return (
    <div className={styles.wrapperProfileCards}>
      <div className={styles.cardProfile}>
        <section className={styles.wrapperOne}>
          <div className={styles.wrapperImage}>
            <Image
              src={url || profile.url || '/assets/Simbol.svg'}
              className={styles.imagePerfil}
              layout="fill"
            />
          </div>
          <h1>{profile.name || name}</h1>
        </section>
        <section className={styles.wrapperTwo}>
          {profile.valueHour ? (
            <p>
              O valor da sua hora é <br />
              <span>R$ {profile.valueHour} reais</span>
            </p>
          ) : null}
          {calcHour && money && hours && weeks && days && !profile.valueHour ? (
            <p>
              O valor da sua hora é <br />
              <span>R$ {calcHour} reais</span>
            </p>
          ) : null}
          {!profile.valueHour &&
          !calcHour &&
          !money &&
          !hours &&
          !weeks &&
          !days ? (
            <p>
              Preencha os dados para saber
              <br />
              <span>O valor da sua hora</span>
            </p>
          ) : null}

          <button
            onClick={() =>
              calcHour && money && hours && weeks && days
                ? handlerAddProfile()
                : () => {
                    alert('Preencha todos os dados');
                  }
            }
          >
            Salvar dados
          </button>
        </section>
      </div>
      <div className={styles.formProfile}>
        <div className={styles.dataProfile}>
          <div>
            <h1>Dados do perfil</h1>
          </div>
          <div className={styles.wrapperInputProfile}>
            <input
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Link da foto"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.dataPlanning}>
          <div className={styles.wrapperTitle}>
            <h1>Planejamento</h1>
          </div>
          <div className={styles.inputsPlanning}>
            <div className={styles.wrapperTwoInputs}>
              <div className={styles.wrapperInputPlanning}>
                <p>
                  Quanto eu
                  <br />
                  quero ganhar por mês?
                </p>
                <input
                  type="number"
                  placeholder="R$"
                  value={money}
                  className={styles.input}
                  onChange={(e) => {
                    setMoney(Number(e.target.value));
                  }}
                />
              </div>
              <div className={styles.wrapperInputPlanning}>
                <p>
                  Quantas horas <br />
                  quero trabalhar por dia?
                </p>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => {
                    setHours(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className={styles.wrapperTwoInputs}>
              <div className={styles.wrapperInputPlanning}>
                <p>
                  Quantos dias quero <br />
                  trabalhar por semana?
                </p>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => {
                    setDays(Number(e.target.value));
                  }}
                />
              </div>
              <div className={styles.wrapperInputPlanning}>
                <p>
                  Quantas semanas <br />
                  por ano você quer tirar férias?
                </p>
                <input
                  type="number"
                  value={weeks}
                  onChange={(e) => {
                    setWeeks(Number(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
