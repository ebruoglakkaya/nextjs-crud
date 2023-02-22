import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const Add = () => {
  const [val, setVal] = useState('');
  const router = useRouter();

  const add = useCallback(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: 'POST',
      body: JSON.stringify({ title: val }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then(() => {
      alert('Added!');
      router.push('/');
    });
  }, [router, val]);

  return (
    <>
      <Head>
        <title>Add</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className='item' >
          <input
            type='text'
            id='title'
            name='title'
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <div>
            <button onClick={() => router.push('/')}>Cancel</button>
            <button onClick={add}>Add</button>
          </div>
        </div>

        <style jsx>{`
          .item,
          .h5 {
            color: black;
          }
        `}</style>
      </main>
    </>
  );
};

export default Add;
