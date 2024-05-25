import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`flex max-w-screen-2xl mx-auto flex-col p-24 ${inter.className}`}
    >
      <Component {...pageProps} />
    </main>
  );
}
