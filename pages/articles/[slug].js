import Link from "next/link";
import React from "react";
import Article from "../../partials/Article";
import Layout from "../../partials/Layout";
import { genuka_api_2021_10 } from "../../utils/configs";
import { getMetaData } from "../../utils/helpers";

function DetailArticle({ company, article }) {
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
    article,
  });

  return (
    <Layout head={meta} company={company}>
      <Link
        className="rounded-2 bg-white p-2 px-4 text-sm my-3 text-primary inline-block sm:w-auto w-full sm:text-left text-center"
        href={"/"}
      >
        🛒 Consultez nos produits 🛍
      </Link>
      <Article company={company} article={article} />
    </Layout>
  );
}

export default DetailArticle;

export async function getServerSideProps(context) {
  let company, result, article;
  const { req, res } = context;
  const ipAddress =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress;
  const slug = context.params.slug;
  const url = req.headers.host;
  // console.log({ url });
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

  try {
    result = await fetch(
      `${genuka_api_2021_10}/companies/${company.id}/blogs/by_slug/${slug}?clientIp=${ipAddress}`
    );
    article = await result.json();
    if (!article.id) throw new Error(article);
    props.article = article;
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {
        company,
        article,
      },
    };
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props,
  };
}
