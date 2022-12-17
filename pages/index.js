import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>imsg.blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          you&#39;ve found <a href="https://imsg-blog.vercel.app">msg.blog</a>
        </h1>

        <p className={styles.description}>
          a plcae to turn your messages into a blog
          <br></br><br></br>
          coming soon
        </p>

        {/* <p className={styles.description}>
          get started by sending a message to{' '}
          <code className={styles.code}>share@notes.site</code>{' '}
          <br></br>
          we'll send you back a link to your new blog.
        </p> */}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
