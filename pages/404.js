/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";

export default function Error404({ company }) {
  const [url, setUrl] = useState("https://genuka.com");
  useEffect(() => {
    if (document) {
      setUrl(document.location.href);
    }
  }, []);
  if (company)
    return (
      <div className="bg-primary-light h-screen w-screen flex justify-center items-center">
        <h1 className="text-9xl my-9">404</h1>
        <h2 className="text-4xl my-5">Cette page n'existe pas</h2>
        <a className="underline text-primary" href={url.replace("/404", "")}>
          <div className="btn bg-primary text-white p-4 px-8">
            Revenir à l'accueil
          </div>
        </a>
      </div>
    );
  else
    return (
      <div className="bg-primary-light h-screen w-screen flex justify-center items-center flex-col">
        <h1 className="text-9xl my-9">404</h1>
        <h2 className="text-4xl text-center my-5">
          Désolé, cette entreprise n'existe pas ou n'est plus disponible.
        </h2>
        <p>
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
    );
}
