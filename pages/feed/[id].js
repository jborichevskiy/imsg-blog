import Head from "next/head";
import Image from "next/legacy/image";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Linkify from "react-linkify";

const SinglePageView = (props) => {
  // const { feed } = props;
  console.log(props)
  
  const feed = props.feed;
  const { query } = useRouter();
  const queryFormat = query.format;
  const id = 1;

  const format = queryFormat || "html";
  const baseImageURL =
    "https://notes-site.mypinata.cloud/ipfs/";

  return (
    <div className={styles.container}>
      <Head>
        <title>notes.site</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}></h1>

        {format && format === "html" && (
          <div className="flex flex-col">
            {feed?.map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      "margin-bottom": "1rem",
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <img
                      layout="fill"
                      objectFit="contain"
                      width= "100%"
                      key={item.id}
                      alt=""
                      src={`${baseImageURL}${item.media_ipfs}`}
                    ></img>
                    {/* monospaced created_at time */}
                    <span style={{fontFamily: "monospace", color: "gray"}}>
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
                );
              })}
          </div>
        )}

        {format && format === "json" && (
          <pre>{JSON.stringify(feed, null, 2)}</pre>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>powered by caffeine</span>
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const id  = query.id;
  console.log({ id });

  const url = `https://imsg-blog.vercel.app/api/data?author=${id}`;

  const data = await fetch(url);
  const dataJSON = await data.json();

  return {
    props: {
      feed: dataJSON,
    },
  }
}

export default SinglePageView;
