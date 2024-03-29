/* eslint-disable react-hooks/exhaustive-deps */
// import Layout from "../partials/Layout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../partials/Layout";
import Shop from "../partials/Shop";
import Stories from "../partials/Stories";
import { genuka_api_2021_10 } from "../utils/configs";
import {
  getCollectionProducts,
  getProduct,
  getProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";
import { getMetaData } from "../utils/helpers";
import fetch from "isomorphic-fetch";

export default function Home({
  company,
  productFromServer,
  collectionFromServer,
}) {
  const css = `
    :root {
      --primary-color: ${
        company.settings?.default_template?.main_color ?? "#FF9900"
      };
      --background-color-light: ${
        company.settings?.default_template?.main_color ?? "#FF9900"
      }07;
    }
    ${
      company.settings?.default_template?.title_font_url
        ? `
    @font-face{
      font-family: "Customer Primary";
      src: url("${company.settings?.default_template?.title_font_url}");
      font-display: swap;
    }
    .font-title{
      font-family: "Customer Primary";
    }`
        : ""
    }
  `;
  const meta = getMetaData({
    css,
    company,
    product: productFromServer,
    collection: collectionFromServer,
  });
  const router = useRouter();
  const { slug, ...pagination } = router.query;
  const dispatch = useGenukaDispatch();
  const { collection_product_list_pagination } = useGenukaState();

  useEffect(() => {
    dispatch({ type: "company", payload: company });
    let gotProducts = false;
    if (slug) {
      switch (slug[0]) {
        case "collections":
          getCollectionProducts(dispatch, company.id, slug[1], {
            ...collection_product_list_pagination,
            ...pagination,
            page: pagination.current_page,
          });
          gotProducts = true;
          if (slug[2] == "products") {
            if (productFromServer) {
              dispatch({ type: "product_success", payload: productFromServer });
            } else {
              getProduct(dispatch, slug[3]);
            }
          }
          break;
        case "products":
          if (productFromServer) {
            dispatch({ type: "product_success", payload: productFromServer });
          } else {
            getProduct(dispatch, slug[1]);
          }
          break;
        case "search":
          break;
      }
    }
    if (!gotProducts) {
      getProducts(dispatch, company.id, {
        ...collection_product_list_pagination,
        ...pagination,
        page: pagination.current_page,
      });
    }
  }, [company]);

  return (
    <Layout head={meta} company={company}>
      <Stories company={company} />
      <Shop css={css} company={company} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const ipAddress =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const headers = {
    "X-Forwarded-For": ipAddress,
    "User-Agent": userAgent,
  };

  let company, result, collection, product;
  const url = req.headers.host;

  try {
    result = await fetch(
      `${genuka_api_2021_10}/companies/byurl/?url=${url}&clientIp=${ipAddress}`,
      {
        headers: headers,
      }
    );
    company = await result.json();
    if (!company.id) throw new Error(company);
  } catch (error) {
    try {
      result = await fetch(
        `${genuka_api_2021_10}/companies/byurl/?url=https://${url}&clientIp=${ipAddress}`,
        {
          headers: headers,
        }
      );
      company = await result.json();
      if (!company.id) throw new Error(company);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
        props: {
          company,
        },
      };
    }
  }
  const path = req.url;
  const slug = path.split("/");
  slug.shift();
  let props = {
    company,
  };
  if (slug.length > 1) {
    switch (slug[0]) {
      case "collections":
        if (slug[2] == "products") {
          const response = await fetch(
            `${genuka_api_2021_10}/products/slug/${slug[3]}`
          );
          product = await response.json();
        }
        break;
      case "products":
        const response = await fetch(
          `${genuka_api_2021_10}/products/slug/${slug[1]}`
        );
        product = await response.json();
        break;
      case "search":
        break;
    }
    if (product) props.productFromServer = product;
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props,
  };
}
