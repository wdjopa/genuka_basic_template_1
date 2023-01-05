export const tail = ([x, ...xs], elt) => {
  return [...xs, elt];
};
export const addAVariantOption = (_variants, { variant, option }) => {
  let variants = [];
  // si la variant n'existe pas, on la rajoute, ensuite, on rajoute l'option
  if (!_variants.map((v) => v.slug).includes(variant.slug)) {
    let _new_variant = { ...variant, options: [] };
    _new_variant.options.push(option);
    variants = [..._variants, _new_variant];
  } else {
    // si la variante existe déjà, on vérifie
    // Si l'option existe déjà, on le retire
    // Si l'option n'existe pas encore, on vérifie le nombre d'options possibles
    variants = _variants.map((v) => {
      if (v.slug === variant.slug) {
        return {
          ...v,
          options:
            v.max_choices > v.options.length
              ? [...v.options, option]
              : tail(v.options, option),
        };
      }
      return v;
    });
  }
  return variants;
};

export const validatePhoneNumber = (input_str) => {
  var intlPhone = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  var localPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return intlPhone.test(input_str) || localPhone.test(input_str);
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getMetaData = ({ css, company, product, article, collection }) => {
  if (company && !(product || collection || article)) {
    return (
      <>
        <style>{css}</style>
        <meta charSet="utf-8" />
        <title>{company.name + " - " + company.description}</title>
        <link rel="favicon" href={company.logo ? company.logo : ""} />
        <link rel="icon" href={company.logo ? company.logo : ""} />
        <meta
          name="description"
          content={
            company?.description?.replace(/<[^>]*>?/gm, "").length > 0
              ? company?.description?.replace(/<[^>]*>?/gm, "")
              : "Achetez vos produits sur " + company.name
          }
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
              ? company.medias[0].thumb
              : ""
          }
        />
        <meta property="og:type" content="company" />
        <meta property="og:site_name" content={company.name} />
      </>
    );
  } else if (collection && !product) {
    return (
      <>
        <style>{css}</style>
        <meta charSet="utf-8" />
        <title>
          {company.name +
            " | " +
            collection.name +
            " - " +
            collection.description}
        </title>
        <link rel="favicon" href={company.logo ? company.logo : ""} />
        <link rel="icon" href={company.logo ? company.logo : ""} />
        <meta
          name="description"
          content={
            company?.description?.replace(/<[^>]*>?/gm, "").length > 0
              ? company?.description?.replace(/<[^>]*>?/gm, "")
              : "Achetez vos produits sur " + company.name
          }
        />
        <meta
          name="keywords"
          content={collection?.description
            ?.replace(/<[^>]*>?/gm, "")
            .split(" ")
            .join(", ")}
        />
        <meta name="author" content={"Genuka for " + company.name} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content={collection.name} />
        <meta name="msapplication-TileColor" content="#222" />
        <meta
          name="msapplication-TileImage"
          content={
            collection.medias?.[0]
              ? collection.medias[0].thumb
              : company.logo
              ? company.logo
              : company.medias && company.medias.length > 0
              ? company.medias[0].link
              : ""
          }
        />
        <meta name="theme-color" content="#222" />
        <meta
          property="og:title"
          content={company.name + " | " + collection.name}
        />
        <meta
          property="og:description"
          content={collection?.description?.replace(/<[^>]*>?/gm, "")}
        />
        <meta
          property="og:image"
          content={
            collection.medias?.[0]
              ? collection.medias[0].thumb
              : company.logo
              ? company.logo
              : company.medias && company.medias.length > 0
              ? company.medias[0].link
              : ""
          }
        />
        <meta property="og:type" content="product's collection" />
        <meta property="og:site_name" content={collection.name} />
      </>
    );
  } else if (product) {
    return (
      <>
        <style>{css}</style>
        <title>
          {company.name +
            " | " +
            product.name +
            " - " +
            product?.description?.replace(/<[^>]*>?/gm, "")}
        </title>
        <meta charSet="utf-8" />
        <link rel="favicon" href={company.logo ? company.logo : ""} />
        <link rel="icon" href={company.logo ? company.logo : ""} />
        <meta
          name="description"
          content={
            product?.description?.replace(/<[^>]*>?/gm, "").length > 0
              ? product?.description?.replace(/<[^>]*>?/gm, "")
              : "Achetez votre produit " +
                product.name +
                " chez " +
                company.name
          }
        />
        <meta
          name="keywords"
          content={product?.description
            ?.replace(/<[^>]*>?/gm, "")
            .split(" ")
            .join(", ")}
        />
        <meta name="author" content={"Genuka for " + company.name} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          name="apple-mobile-web-app-title"
          content={company.name + " | " + product.name}
        />
        <meta name="msapplication-TileColor" content="#222" />
        <meta
          name="msapplication-TileImage"
          content={
            product.medias?.[0]
              ? product.medias[0].thumb
              : company.logo
              ? company.logo
              : company.medias && company.medias.length > 0
              ? company.medias[0].link
              : ""
          }
        />
        <meta name="theme-color" content="#222" />
        <meta property="og:title" content={product.name} />
        <meta
          property="og:description"
          content={product?.description?.replace(/<[^>]*>?/gm, "")}
        />
        <meta
          property="og:image"
          content={
            product.medias?.[0]
              ? product.medias[0].thumb
              : company.logo
              ? company.logo
              : company.medias && company.medias.length > 0
              ? company.medias[0].link
              : ""
          }
        />

        <meta property="og:type" content="product" />
        <meta property="og:site_name" content={product.name} />
        <meta itemProp="name" content={product.name} />
        <meta
          itemProp="description"
          content={
            product?.description?.replace(/<[^>]*>?/gm, "").length > 0
              ? product?.description?.replace(/<[^>]*>?/gm, "")
              : "Achetez votre produit " +
                product.name +
                " chez " +
                company.name
          }
        />
        <meta itemProp="price" content={product.discounted_price} />
        <meta
          itemProp="availability"
          content={product.infinite_stocks ? "En stock" : product.stocks}
        />
        <meta itemProp="price" content={product.discounted_price} />
        <meta itemProp="priceCurrency" content={company.currency.code} />
        <meta
          itemProp="image"
          content={
            product.medias?.[0]
              ? product.medias[0].thumb
              : company.logo
              ? company.logo
              : company.medias && company.medias.length > 0
              ? company.medias[0].link
              : ""
          }
        />
      </>
    );
  } else if (article) {
    const description =
      removeHTML(article.properties?.resume).length > 0
        ? removeHTML(article.properties?.resume)
        : article.title + " | " + company.name;
    const text = article.text;
    const image = article.medias?.[0]
      ? article.medias[0].link
      : company.logo
      ? company.logo
      : company.medias && company.medias.length > 0
      ? company.medias[0].link
      : "";
    return (
      <>
        <style>{css}</style>
        <title>
          {company.name +
            " | " +
            article.title +
            " - " +
            removeHTML(article?.properties?.resume)}
        </title>
        <meta charSet="utf-8" />
        <link rel="favicon" href={company.logo ? company.logo : ""} />
        <link rel="icon" href={company.logo ? company.logo : ""} />
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={text
            ?.replace(/<[^>]*>?/gm, "")
            .split(" ")
            .join(", ")}
        />
        <meta name="author" content={"Genuka for " + company.name} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          name="apple-mobile-web-app-title"
          content={company.name + " | " + article.title}
        />
        <meta name="msapplication-TileColor" content="#222" />
        <meta name="msapplication-TileImage" content={image} />
        <meta name="theme-color" content="#222" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={article.title} />
        <meta itemProp="name" content={article.title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={image} />
      </>
    );
  } else {
    return (
      <>
        <style>{css}</style>
        <meta charSet="utf-8" />
        <title>{company.name + " - " + company.description}</title>
        <link rel="favicon" href={company.logo ? company.logo : ""} />
        <link rel="icon" href={company.logo ? company.logo : ""} />
        <meta
          name="description"
          content={
            company?.description?.replace(/<[^>]*>?/gm, "").length > 0
              ? company?.description?.replace(/<[^>]*>?/gm, "")
              : "Achetez vos produits sur " + company.name
          }
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
              ? company.medias[0].thumb
              : ""
          }
        />
        <meta property="og:type" content="company" />
        <meta property="og:site_name" content={company.name} />
      </>
    );
  }
};

export function removeHTML(str) {
  return str?.replace(/<[^>]*>/g, "") ?? "";
}

export function diffForHumans(dateStr, language = "en") {
  const date = new Date(dateStr);
  const currentDate = new Date();
  const diffInSeconds = (currentDate - date) / 1000;

  if (language === "en") {
    if (diffInSeconds < 60) {
      return `${Math.round(diffInSeconds)} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.round(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.round(diffInSeconds / 3600)} hours ago`;
    } else if (diffInSeconds < 2592000) {
      return `${Math.round(diffInSeconds / 86400)} days ago`;
    } else if (diffInSeconds < 31536000) {
      return `${Math.round(diffInSeconds / 2592000)} months ago`;
    } else {
      return `${Math.round(diffInSeconds / 31536000)} years ago`;
    }
  } else if (language === "fr") {
    if (diffInSeconds < 60) {
      return `il y a ${Math.round(diffInSeconds)} secondes`;
    } else if (diffInSeconds < 3600) {
      return `il y a ${Math.round(diffInSeconds / 60)} minutes`;
    } else if (diffInSeconds < 86400) {
      return `il y a ${Math.round(diffInSeconds / 3600)} heures`;
    } else if (diffInSeconds < 2592000) {
      return `il y a ${Math.round(diffInSeconds / 86400)} jours`;
    } else if (diffInSeconds < 31536000) {
      return `il y a ${Math.round(diffInSeconds / 2592000)} mois`;
    } else {
      return `il y a ${Math.round(diffInSeconds / 31536000)} ans`;
    }
  } else {
    throw new Error(`Invalid language: ${language}`);
  }
}
