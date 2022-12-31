import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import {
  getCollectionProducts,
  getProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";
import Head from "next/head";

const Pagination = dynamic(() => import("./Pagination"));
const ProductCard = dynamic(() => import("./ProductCard"));
const ProductModal = dynamic(() => import("./ProductModal"));

function Products({ company, css }) {
  const {
    search_mode,
    searched_products,
    products,
    collection,
    collection_product_list_pagination,
    product,
    cart,
  } = useGenukaState();
  const dispatch = useGenukaDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [productDetailed, setProductDetailed] = useState(product);
  const router = useRouter();

  const openDetails = (product) => {
    router.push(
      (router.query.slug && !router.query.slug.includes("products")
        ? router.query.slug.join("/")
        : "") +
        "/products/" +
        product.slug,
      null,
      { shallow: true }
    );

    setProductDetailed(product);
    setModalOpen(true);
  };

  useEffect(() => {
    if (product) {
      setProductDetailed(product);
      setModalOpen(true);
    }
  }, [product]);

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

    if (collection) {
      getCollectionProducts(dispatch, company.id, collection.id, pagination);
    } else {
      getProducts(dispatch, company.id, pagination);
    }
  };

  const addProductToCart = (productInCart) => {
    dispatch({ type: "add_product", payload: productInCart });
    dispatch({
      type: "notification",
      payload: "Le produit a bien été ajouté",
      color: "red",
    });
  };

  const removeProductFromCart = (product) => {
    const productInCart = {
      quantity: -1,
      product,
    };
    dispatch({ type: "add_product", payload: productInCart });
  };

  const _products = search_mode ? searched_products : products;

  if (!_products || !company) {
    return <></>;
  }
  const head = collection && (
    <Head>
      <style>{css}</style>
      <title key="title">
        {collection.name + " - " + collection.description}
      </title>
      <link
        key="favicon"
        rel="favicon"
        href={
          collection.medias?.[0]
            ? collection.medias[0].thumb
            : company.logo
            ? company.logo
            : ""
        }
      />
      <link
        key="icon"
        rel="icon"
        href={
          collection.medias?.[0]
            ? collection.medias[0].thumb
            : company.logo
            ? company.logo
            : ""
        }
      />
      <meta
        key="description"
        name="description"
        content={collection?.description?.replace(/<[^>]*>?/gm, "")}
      />
      <meta
        key="keywords"
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
      <meta property="og:title" content={collection.name} />
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
      <meta property="og:type" content="collection" />
      <meta property="og:site_name" content={collection.name} />
    </Head>
  );
  return (
    <>
      {head}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 sm:grid-flow-row ">
        {_products.map((product) => (
          <ProductCard
            key={"product_card" + product.id}
            product={product}
            quantityInCart={cart.items.reduce((prev, curr, items) => {
              return (
                prev + (curr.product.id === product.id ? curr.quantity : 0)
              );
            }, 0)}
            addToCart={addProductToCart}
            removeFromCart={(variants) => {
              removeProductFromCart(product, variants || []);
            }}
            currency={company.currency}
            defaultImage={"/assets/placeholder.png"}
            seeDetails={openDetails}
          />
        ))}
      </div>
      {productDetailed && (
        <ProductModal
          css={css}
          isOpen={modalOpen}
          company={company}
          currency={company.currency}
          product={productDetailed}
          addToCart={addProductToCart}
          setIsOpen={(state) => {
            router.back();
            setModalOpen(state);
          }}
        />
      )}
      <div className="my-6" />
      <Pagination
        pagination={collection_product_list_pagination}
        onChange={changePagination}
      />
    </>
  );
}

export default React.memo(Products);
