import type { AppProps } from "next/app";
import "../styles/index.scss";
import "../styles/app.scss";
import { Wrapper } from "../components";
import { AppContextProvider } from "@/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <main className="app">
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </main>
    </AppContextProvider>
  );
}
