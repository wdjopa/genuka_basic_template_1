import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import {
  getCollectionProducts,
  getProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";
import { ProductLine } from "./ProductCard";

const ProductCard = dynamic(() => import("./ProductCard"));
const ProductModal = dynamic(() => import("./ProductModal"));

function Products({ company, css }) {
  const {
    search_mode,
    searched_products,
    products,

    product,
    cart,
  } = useGenukaState();
  console.log({ company });
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
      quantity: 1,
      product,
    };
    dispatch({ type: "remove_product", payload: productInCart });
  };

  const _products = search_mode ? searched_products : products;
  const model = company.settings.default_template?.product_layout || "square";
  if (!_products || !company) {
    return <></>;
  }
  return (
    <>
      {model === "line" ? (
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2  sm:grid-cols-3 sm:grid-flow-row ">
          {_products.map((product) => (
            <ProductLine
              model={model}
              key={"product_card" + product.id}
              product={product}
              quantityInCart={cart.items.reduce((prev, curr, items) => {
                return (
                  prev + (curr.product.id === product.id ? curr.quantity : 0)
                );
              }, 0)}
              addToCart={addProductToCart}
              removeFromCart={() => {
                removeProductFromCart(product);
              }}
              currency={company.currency}
              defaultImage={company.logo || "/assets/placeholder.png"}
              seeDetails={openDetails}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 sm:grid-flow-row ">
          {_products.map((product) => (
            <ProductCard
              model={model}
              key={"product_card" + product.id}
              product={product}
              quantityInCart={cart.items.reduce((prev, curr, items) => {
                return (
                  prev + (curr.product.id === product.id ? curr.quantity : 0)
                );
              }, 0)}
              addToCart={addProductToCart}
              removeFromCart={() => {
                removeProductFromCart(product);
              }}
              currency={company.currency}
              defaultImage={company.logo || "/assets/placeholder.png"}
              seeDetails={openDetails}
            />
          ))}
        </div>
      )}
      {productDetailed && (
        <ProductModal
          css={css}
          isOpen={modalOpen}
          company={company}
          currency={company.currency}
          product={productDetailed}
          addToCart={addProductToCart}
          setIsOpen={(state) => {
            const slug = router.query.slug;
            if (slug && slug.includes("collections")) {
              router.push("/collections/" + router.query.slug[1], null, {
                shallow: true,
              });
            } else {
              router.push("", null, { shallow: true });
            }
            // if (router.back()) {
            //   alert("back");
            // }
            // router.push(

            //     ? router.query.slug.join("/")
            //     : "",
            //   null,
            //   { shallow: true }
            // );
            // // router.push({ query: { ...router.query, ...query } }, undefined, {

            // // router.push();
            // // router.back();
            setModalOpen(state);
          }}
        />
      )}
    </>
  );
}

export default React.memo(Products);
