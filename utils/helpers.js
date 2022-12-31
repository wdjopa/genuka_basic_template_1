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

export const getMetaData = ({ css, company, product, collection }) => {
  if (!product && !collection) {
    return (
      <>
        <style>{css}</style>
        <meta charset="utf-8" />
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
        <meta charset="utf-8" />
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
          content={collection?.description?.replace(/<[^>]*>?/gm, "")}
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
  } else {
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
        <meta charset="utf-8" />
        <link rel="favicon" href={company.logo ? company.logo : ""} />
        <link rel="icon" href={company.logo ? company.logo : ""} />
        <meta
          name="description"
          content={product?.description?.replace(/<[^>]*>?/gm, "")}
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
        <meta itemprop="name" content={product.name} />
        <meta itemprop="description" content={product.description} />
        <meta itemprop="price" content={product.discounted_price} />
        <meta
          itemprop="availability"
          content={product.infinite_stocks ? "En stock" : product.stocks}
        />
        <meta itemprop="price" content={product.discounted_price} />
        <meta itemprop="priceCurrency" content={company.currency.code} />
        <meta
          itemprop="image"
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
  }
};
