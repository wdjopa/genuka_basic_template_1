/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { removeHTML } from "../utils/helpers";

function ArticleCard({ article }) {
  console.log({ article });
  return (
    <Link href={"/articles/" + article.slug} className="mx-auto w-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <img
          className="rounded-t-lg"
          src={article.medias?.[0]?.link ?? "/assets/placeholder.png"}
          alt=""
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="p-5">
          <h5 className="text-gray-900 font-bold text-xl truncate tracking-tight mb-2">
            {article.title}
          </h5>
          <p className="font-normal text-gray-700 mb-3 sm:truncate">
            {removeHTML(article.properties?.resume)}
          </p>
          <div className="flex pb-4 overflow-x-auto">
            {article.tags.map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="rounded-3xl bg-slate-100 text-primary min-w-max mr-3 px-4 cursor-pointer py-1.5 text-sm "
                >
                  {tag.name}
                </div>
              );
            })}
          </div>
          <Link
            className="text-white bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            href={"/articles/" + article.slug}
          >
            Lire plus
          </Link>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
