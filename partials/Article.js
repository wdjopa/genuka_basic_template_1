/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AuthorBlock from "../components/AuthorBlock";
import { diffForHumans } from "../utils/helpers";

function Article({ company, article }) {
  const image = article.medias?.[0];
  const title = article.title;
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (document || window) {
      setUrl(window.location.href);
    }
  }, []);
  return (
    <div className=" text-gray-800 font-default my-3">
      {/* <div className="mx-auto text-center w-full">
        <Link href="/articles">Voir tous les articles</Link>
      </div> */}
      {image && (
        <img
          src={image.link}
          className="rounded-lg w-full h-72 object-cover my-5"
          alt={"Image of " + article.title}
        />
      )}
      <div className="my-5">
        <h2 className="text-3xl  font-bold">{article.title}</h2>
        <p className="text-md">
          {diffForHumans(article.created_at, "fr")} (Dernière version{" "}
          {diffForHumans(article.updated_at, "fr")})
        </p>
        <p className="text-md">By {article.author}</p>
      </div>
      <div
        className="my-5 text-gray-800"
        dangerouslySetInnerHTML={{
          __html: article.text,
        }}
      ></div>
      <div className="">
        <h3 className="font-bold"> Partager l'article</h3>
        <div className="">
          <a
            target={"_blank"}
            rel="noreferrer"
            href={"https://www.facebook.com/sharer/sharer.php?u=" + url}
            className="mr-3 mt-3 inline-block social_btn facebook"
          >
            Facebook
          </a>
          <a
            target={"_blank"}
            rel="noreferrer"
            href={
              "https://twitter.com/intent/tweet?text=" + title + "&url=" + url
            }
            className="mr-3 mt-3 inline-block social_btn twitter"
          >
            Twitter
          </a>
          <a
            target={"_blank"}
            rel="noreferrer"
            href={
              "https://www.linkedin.com/shareArticle?mini=true&url=" +
              url +
              "&title=" +
              title
            }
            className="mr-3 mt-3 inline-block social_btn linkedin"
          >
            LinkedIn
          </a>
          <a
            target={"_blank"}
            rel="noreferrer"
            href={"https://api.whatsapp.com/send?text=" + title + "%20" + url}
            className="mr-3 mt-3 inline-block social_btn whatsapp"
          >
            Whatsapp
          </a>
        </div>
      </div>
      <div className="mx-auto my-4 underline text-center w-full">
        <Link href="/articles">Voir tous les articles</Link>
      </div>
      {/* <AuthorBlock article={article} company={company} /> */}
    </div>
  );
}

export default Article;
