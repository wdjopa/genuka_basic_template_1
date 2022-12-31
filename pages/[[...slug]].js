// import Layout from "../partials/Layout";
import { useEffect } from "react";
import Layout from "../partials/Layout";
import Shop from "../partials/Shop";
import Stories from "../partials/Stories";
import { genuka_api_2021_10 } from "../utils/configs";
import { useGenukaDispatch } from "../utils/genuka.store";

export default function Home({ company }) {
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
  const meta = (
    <>
      <style>{css}</style>
      <title>{company.name + " - " + company.description}</title>
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
  const dispatch = useGenukaDispatch();
  useEffect(() => {
    dispatch({ type: "company", payload: company });
  }, [company]);
  return (
    <Layout head={meta} company={company}>
      <Stories company={company} />
      <Shop company={company} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let company, result;
  const { req } = context;
  const url = req.headers.host;
  try {
    result = await fetch(`${genuka_api_2021_10}/companies/byurl/?url=${url}`);
    company = await result.json();
    if (!company.id) throw new Error(company);
    return {
      props: {
        company,
      },
    };
  } catch (error) {
    try {
      result = await fetch(
        `${genuka_api_2021_10}/companies/byurl/?url=https://${url}`
      );
      company = await result.json();
      if (!company.id) throw new Error(company);
      return {
        props: {
          company,
        },
      };
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
}
