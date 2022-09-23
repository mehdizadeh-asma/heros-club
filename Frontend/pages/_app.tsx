import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/index";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
