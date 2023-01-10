import { genuka_api_2021_10 } from "../utils/configs";

function generateSiteMap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->
       ${pages
         .map(({ url, lastmod, changefreq = "monthly", priority }) => {
           return `
         <url>
             <loc>${`${url}`}</loc>
             <lastmod>${`${lastmod}`}</lastmod>
             <changefreq>${`${changefreq}`}</changefreq>
             <priority>${`${priority}`}</priority>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res, req }) {
  let company, result, collection, product;
  const url = req.headers.host;
  try {
    result = await fetch(`${genuka_api_2021_10}/companies/byurl/?url=${url}`);
    company = await result.json();
    if (!company.id) throw new Error(company);
  } catch (error) {
    try {
      result = await fetch(
        `${genuka_api_2021_10}/companies/byurl/?url=https://${url}`
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

  result = await fetch(
    `${genuka_api_2021_10}/companies/${company.id}/products?per_page=1000`
  );
  const { data: products } = await result.json();

  result = await fetch(
    `${genuka_api_2021_10}/companies/${company.id}/collections?per_page=1000`
  );
  const { data: collections } = await result.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap([
    {
      url: `${url.includes("http") ? url : "https://" + url}`,
      lastmod: company.created_at,
      changefreq: "yearly",
      priority: 1,
    },
    ...collections.map((collection) => {
      return {
        url: `${url.includes("http") ? url : "https://" + url}/collections/${
          collection.id
        }`,
        lastmod: collection.updated_at,
        changefreq: "monthly",
        priority: 0.75,
      };
    }),
    ...products.map((product) => {
      return {
        url: `${url.includes("http") ? url : "https://" + url}/products/${
          product.slug
        }`,
        lastmod: product.updated_at,
        changefreq: "weekly",
        priority: 0.5,
      };
    }),
  ]);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props: {},
  };
}

export default SiteMap;
