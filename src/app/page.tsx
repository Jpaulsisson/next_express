'use client';
import axios from 'axios';
import styles from './page.module.css';
import { useState } from 'react';

export default function Home() {

  const [random, setRandom] = useState(0);

  // async function handleRandomChange() {
  //   const new_random = await fetch('http://localhost:3000//api/getRandom', {
  //     method: "GET",
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //     .then(res => res.json())
  //   setRandom(new_random);
  // }
  async function handleRandomChange() {
    await axios.get('http://localhost:3000//api/getRandom').then((res) => res.status === 200 ? setRandom(res.data) : console.error("something went wrong"))
  }

  return (
    <main className={styles.mainContainer}>
      <h2 className={styles.random}>Random is currently: {random} {random === 0 ? '(default)' : null}</h2>
      <button onClick={handleRandomChange} className={styles.change}>Change Random</button>
    </main>
  )
}
