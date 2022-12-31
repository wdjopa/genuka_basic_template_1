/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useGenukaState } from "../utils/genuka.store";

function ProductCard({
  quantityInCart,
  seeDetails,
  product,
  defaultImage,
  currency,
  addToCart,
  removeFromCart,
}) {
  const discount = (1 - product.discounted_price / product.price) * 100;
  const { productInCart } = useGenukaState();
  const router = useRouter();
  const url =
    (router.query.slug && !router.query.slug.includes("products")
      ? router.query.slug.join("/")
      : "") +
    "/products/" +
    product.slug;
  return (
    <Link
      className="rounded-md h-64 overflow-hidden relative"
      // onClick={() => seeDetails(product)}
      href={url}
    >
      {product.medias.length > 0 ? (
        <img
          src={product.medias[0].thumb}
          alt={"Picture of " + product.name}
          className="object-cover h-full w-full"
        />
      ) : (
        <img
          src={defaultImage}
          alt={"Picture of " + product.name}
          className="object-fit self-center items-center object-center"
        />
      )}
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full">
          -{Math.ceil(discount)}%
        </div>
      )}
      {/* {quantityInCart && (
        <div className="absolute top-2 left-0 bg-primary text-white px-3 py-0">
          {quantityInCart}
        </div>
      )} */}
      <div className="bg-gradient-to-t from-black to-transparent left-0 bottom-0 h-3/5 sm:h-1/3 w-full absolute px-2 ">
        <div className="flex flex-col h-full pb-2.5 justify-end">
          <div className="flex" title={product.name}>
            <span className="text-gray-100 truncate text-md">
              {product.name}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium justify-end flex-col items-end text-lg text-white">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: currency.code,
                maximumFractionDigits: 0,
              }).format(product.discounted_price)}
              {product.price > product.discounted_price && (
                <small className="pl-1 hidden sm:inline-block text-xs line-through text-white">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: currency.code,
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </small>
              )}
            </div>
            <div
              className="flex rounded-full items-center bg-slate-50 w-fit justify-end"
              onClick={(e) => e.stopPropagation()}
            >
              {quantityInCart > 0 && (
                <>
                  <button
                    className="bg-primary text-white font-bold text-center rounded-full w-8 h-8"
                    onClick={(e) => {
                      removeFromCart();
                    }}
                  >
                    -
                  </button>
                  <span className="h-8 items-center flex px-2">
                    {quantityInCart}
                  </span>
                </>
              )}
              <button
                className="bg-primary text-white font-bold text-center rounded-full w-8 h-8"
                onClick={(e) => {
                  const hasRequiredVariants =
                    product.variants.filter((v) => v.required).length > 0;
                  if (hasRequiredVariants) {
                    if (
                      productInCart &&
                      productInCart.product &&
                      productInCart.product.id === product.id
                    ) {
                      addToCart({ ...productInCart, product });
                    } else {
                      seeDetails(product);
                    }
                  } else {
                    const pInCart = {
                      quantity: 1,
                      price: product.discounted_price,
                      product,
                      variants: [],
                    };
                    addToCart(pInCart);
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
