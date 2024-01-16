'use client';
import axios from 'axios';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

type Envelope = {
  name: string;
  amount: number;
  remaining: number;
  daysUntilReset: number;
}

export default function Home() {

  const [envelopes, setEnvelopes] = useState<Envelope[] | null>(null);

  useEffect(() => {
    async function handleGetEnvelopes() {
      await axios.get('http://localhost:3000//api/getEnvelopes').then((res) => res.status === 200 ? setEnvelopes(res.data) : console.error("something went wrong"))
    }
    handleGetEnvelopes();
  }, [])

  async function handleGetEnvelopes() {
    await axios.get('http://localhost:3000//api/getEnvelopes').then((res) => res.status === 200 ? setEnvelopes(res.data) : console.error("something went wrong"))
  }

  async function handleGetEnvelope(id: string) {
    await axios.get(`http://localhost:3000//api/getEnvelopes/${id}`).then((res) => res.status === 200 ? console.log(res.data) : console.error("something went wrong"))
  }

  async function createNewEnvelope(envelope: Envelope) {
    await axios.post(`/api/newEnvelope`, envelope).then(res => console.log(res))
  }

  async function updateEnvelope(name: string, amount: number) {
    await axios.put(`/api/updateEnvelope`, { name, amount }).then(res => console.log(res))
  }

  async function deleteEnvelope(name: string) {
    await axios.delete(`/api/deleteEnvelope/${name}`).then(res => console.log(res))
  }

  return (
    <main className={styles.mainContainer}>
      {envelopes ?
        envelopes.map((envelope) => {
          return (
            <div key={envelope.name}>
              <h2>{envelope.name}</h2>
              <p>${envelope.remaining} / {envelope.amount}</p>
              <p>{envelope.daysUntilReset} days remaining</p>
            </div>
          )
        })
        :
        null}
      <button onClick={handleGetEnvelopes} className={styles.change}>Get Budgets</button>
      <button onClick={() => handleGetEnvelope('Mortgage')} className={styles.change}>Get Budget</button>
      <button onClick={() => createNewEnvelope({ name: "new", amount: 400, remaining: 100, daysUntilReset: 13 })} className={styles.change}>Add Budget</button>
      <button onClick={() => updateEnvelope("Utilities", 800)} className={styles.change}>Change Budget</button>
      <button onClick={() => deleteEnvelope("Utilities")} className={styles.change}>Delete Budget</button>
    </main>
  )
}
