import type { AppProps } from "next/app";
import "../styles/index.scss";
import "../styles/app.scss";
import { Wrapper } from "../components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="app">
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </main>
  );
}
