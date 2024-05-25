import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Head from "next/head";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Link
        href="https://wp-preview-wp.angelovski.top/admin"
        target="_blank"
        title="WP Preview Wordpress link
      "
      >
        <img
          src="/w-logo-blue-white-bg.png"
          width={30}
          height={30}
          alt="WP link logo"
        />
      </Link>
      <Head>
        <title>WP Preview</title>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <main
        className={`flex max-w-screen-2xl mx-auto flex-col p-24 ${inter.className}`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
