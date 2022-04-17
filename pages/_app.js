import Head from "next/head";

import "react-h5-audio-player/lib/styles.css";
import "../styles/globals.css";
import "animate.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Online Audiobook Player</title>

        <meta charSet="utf-8" />
        <meta name="theme-color" content="#282828" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="online, audiobook, player" />
        <meta name="description" content="Online audiobook player" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes"
        />

        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          sizes="16x16"
          type="image/png"
          href="/icons/icon-16x16.png"
        />
        <link
          rel="icon"
          sizes="32x32"
          type="image/png"
          href="/icons/icon-32x32.png"
        />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png"></link>
        <link
          href="/icons/icon-152x152.png"
          rel="apple-touch-icon-precomposed"
        ></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
