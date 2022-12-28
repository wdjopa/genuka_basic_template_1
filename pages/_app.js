import "../styles/globals.css";
import { GenukaProvider } from "../utils/genuka.store";

export default function App({ Component, pageProps }) {
  return (
    <GenukaProvider>
      <Component {...pageProps} />
    </GenukaProvider>
  );
}
