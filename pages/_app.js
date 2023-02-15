import "../styles/globals.css";
import { GenukaProvider } from "../utils/genuka.store";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }) {
  return (
    <GenukaProvider>
      <GoogleAnalytics gaMeasurementId="G-MRPCJW45BE" />
      <Component {...pageProps} />
    </GenukaProvider>
  );
}
