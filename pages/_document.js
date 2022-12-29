import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  console.log("Render Document");
  return (
    <Html lang="fr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
