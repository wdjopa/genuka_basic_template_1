/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function Error404({ company }) {
  const [url, setUrl] = useState("https://genuka.com");
  useEffect(() => {
    if (document) {
      setUrl(document.location.href);
    }
  }, []);
  const css = `
  :root {
    --primary-color: #FF9900;
    --background-color-light: #FF990007;
  }
`;
  if (!company) {
    company = {
      logo: "https://dashboard.genuka.com/logo.png",
      description:
        "La page que vous souhaitez atteindre n'est pas disponible — Genuka",
      name: "404 - Genuka",
    };
  }
  const head = (
    <>
      <style>{css}</style>
      <title>Genuka Template</title>
      <link rel="favicon" href={company.logo ? company.logo : ""} />
      <link rel="icon" href={company.logo ? company.logo : ""} />
      <meta
        name="description"
        content={company?.description?.replace(/<[^>]*>?/gm, "")}
      />
      <meta
        name="keywords"
        content={company?.description
          ?.replace(/<[^>]*>?/gm, "")
          .split(" ")
          .join(", ")}
      />
      <meta name="author" content={"Genuka for " + company.name} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={company.name} />
      <meta name="msapplication-TileColor" content="#222" />
      <meta
        name="msapplication-TileImage"
        content={
          company.logo
            ? company.logo
            : company.medias && company.medias.length > 0
            ? company.medias[0].link
            : ""
        }
      />
      <meta name="theme-color" content="#222" />
      <meta property="og:title" content={company.name} />
      <meta
        property="og:description"
        content={company?.description?.replace(/<[^>]*>?/gm, "")}
      />
      <meta
        property="og:image"
        content={
          company.logo
            ? company.logo
            : company.medias && company.medias.length > 0
            ? company.medias[0].link
            : ""
        }
      />
      <meta property="og:type" content="company" />
      <meta property="og:site_name" content={company.name} />
    </>
  );
  if (company.id)
    return (
      <>
        <Head>{head}</Head>

        <div className="bg-primary-light h-screen w-screen flex justify-center items-center">
          <h1 className="text-9xl my-9">404</h1>
          <h2 className="text-4xl my-5">Cette page n'existe pas</h2>
          <a className="underline text-primary" href={url.replace("/404", "")}>
            <div className="btn bg-primary text-white p-4 px-8">
              Revenir à l'accueil
            </div>
          </a>
        </div>
      </>
    );
  else
    return (
      <>
        <Head>{head}</Head>

        <div className="p-5 bg-primary-light h-screen w-screen flex justify-center items-center flex-col">
          <h1 className="text-9xl my-9">404</h1>
          <h2 className="text-4xl text-center my-5">
            Désolé, cette entreprise n'existe pas ou n'est plus disponible.
          </h2>
          <p className="text-center">
            Créez votre propre boutique en ligne avec{" "}
            <a
              className="underline text-primary"
              href={"https://genuka.com/?from=" + url}
            >
              Genuka
            </a>
            .
          </p>
        </div>
      </>
    );
}
