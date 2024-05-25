import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Link href={"https://wp-preview-wp.angelovski.top/admin"} target="blank">
        <Image src={"/w-logo-blue-white-bg.png"} width={30} height={30} />
      </Link>
      <Head>
        <title>WP Preview</title>
      </Head>
      <main
        className={`flex max-w-screen-2xl mx-auto flex-col p-24 ${inter.className}`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
