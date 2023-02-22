import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

export function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: '1'
        }
      }
    ],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params: { id = 1 } }) {
  const item = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  ).then((res) => res.json());

  return {
    props: {
      item
    }
  };
}

const News = ({ item }) => {
  const [val, setVal] = useState(item.title);
  const router = useRouter();

  const update = useCallback(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: val }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then(() => {
      alert('Updated!');
      router.push('/');
    });
  }, [router, item, val]);

  return (
    <>
      <Head>
        <title>Edit</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className='item'>
          <h5>
            {item.id} - {item.title}
          </h5>
          <input
            type='text'
            id='first'
            name='first'
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <div>
            <button onClick={() => router.push('/')}>Cancel</button>
            <button onClick={update}>Update</button>
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

export default News;
