import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MemoryProvider as MemoryContext } from "../contexts/MemoryContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MemoryContext>
      <Component {...pageProps} />
    </MemoryContext>
  );
}
