import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import Articles from "../../partials/Articles";
import Layout from "../../partials/Layout";
import { genuka_api_2021_10 } from "../../utils/configs";
import {
  getArticles,
  useGenukaDispatch,
  useGenukaState,
} from "../../utils/genuka.store";
import { getMetaData } from "../../utils/helpers";

function ArticlesList({ company }) {
  const css = `
  :root {
    --primary-color: ${
      company.settings?.default_template?.main_color ?? "#FF9900"
    };
    --background-color-light: ${
      company.settings?.default_template?.main_color ?? "#FF9900"
    }07;
  }
`;
  const meta = getMetaData({
    css,
    company,
  });

  const { search_mode, articles_list_pagination } = useGenukaState();
  const dispatch = useGenukaDispatch();
  const router = useRouter();
  const searchArticle = (searchTerm) => {
    if (searchTerm.length > 3) {
      searchArticles(dispatch, company.id, searchTerm);
    } else {
      if (searchTerm.length == 0) {
        dispatch({ type: "search_mode", payload: false });
      }
    }
  };
  const changePagination = (pagination) => {
    const {
      first,
      last,
      prev,
      path,
      from,
      last_page,
      total,
      next,
      to,
      page,
      ...query
    } = pagination;
    router.push({ query: { ...router.query, ...query } }, undefined, {
      shallow: true,
    });

    getArticles(dispatch, company.id, pagination);
  };
  //   console.log({ company });
  return (
    <Layout head={meta} company={company}>
      {/* <SearchBar
        placeholder={"Recherchez un article"}
        onSearch={searchArticle}
      /> */}
      <Link
        className="rounded-2 bg-white p-2 px-4 text-sm my-3 text-primary inline-block sm:w-auto w-full sm:text-left text-center"
        href={"/"}
      >
        🛒 Consultez nos produits 🛍
      </Link>
      <Articles company={company} />
      <div className="my-6" />
      {!search_mode && (
        <Pagination
          pagination={articles_list_pagination}
          onChange={changePagination}
        />
      )}
    </Layout>
  );
}

export default ArticlesList;

export async function getServerSideProps(context) {
  let company, result, article;
  const { req, res } = context;
  const ipAddress =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress;
  const url = req.headers.host;
  //   console.log({ url });
  try {
    result = await fetch(
      `${genuka_api_2021_10}/companies/byurl/?clientIp=${ipAddress}&url=${url}`
    );
    company = await result.json();
    if (!company.id) throw new Error(company);
  } catch (error) {
    console.error(error);
    try {
      result = await fetch(
        `${genuka_api_2021_10}/companies/byurl/?clientIp=${ipAddress}&url=https://${url}`
      );
      company = await result.json();
      if (!company.id) throw new Error(company);
    } catch (error) {
      console.error(error);
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
  let props = {
    company,
  };

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props,
  };
}
