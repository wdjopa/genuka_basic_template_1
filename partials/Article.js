/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import AuthorBlock from "../components/AuthorBlock";
import { diffForHumans } from "../utils/helpers";

function Article({ company, article }) {
  const image = article.medias?.[0];
  return (
    <div className=" text-gray-800 font-default my-3">
      <div className="mx-auto text-center w-full">
        <Link href="/articles">Voir tous les articles</Link>
      </div>
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
      <div className="mx-auto text-center w-full">
        <Link href="/articles">Voir tous les articles</Link>
      </div>
      {/* <AuthorBlock article={article} company={company} /> */}
    </div>
  );
}

export default Article;
