/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useGenukaState } from "../utils/genuka.store";
import { removeTags } from "../utils/helpers";

const AddToCart = ({
  removeFromCart,
  addToCart,
  productInCart,
  quantityInCart,
  product,
  seeDetails,
}) => {
  return (
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
          <span className="h-8 items-center flex px-2">{quantityInCart}</span>
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
  );
};
export const ProductLine = ({
  quantityInCart,
  seeDetails,
  product,
  defaultImage,
  currency,
  addToCart,
  removeFromCart,
}) => {
  const [srcImage, setSrcImage] = useState(
    product.medias.length > 0 ? product.medias[0].thumb : defaultImage
  );
  const discount = (1 - product.discounted_price / product.price) * 100;
  const { productInCart } = useGenukaState();
  return (
    <div
      className="flex gap-4 bg-white shadow-sm hover:shadow-lg p-2 rounded-md"
      onClick={() => seeDetails(product)}
    >
      <div className="md:h-32 md:w-32 h-24 w-24 relative shrink-0">
        <Image
          src={srcImage}
          alt={"Picture of " + product.name}
          className="object-cover h-full w-full rounded-sm"
          fill={true}
          blurDataURL={defaultImage}
          placeholder="blur"
          onError={(e) => {
            setSrcImage(defaultImage);
          }}
        />
           {discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full">
          -{Math.ceil(discount)}%
        </div>
      )}
        {quantityInCart ? (
          <div className="absolute top-2 left-0 bg-primary text-white px-3 py-0">
            {quantityInCart}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col break-words overflow-hidden">
        <h4 className="text-base md:text-lg line-clamp-1">{product.name}</h4>

        <div className="font-medium justify-end flex-col items-end text-md text-primary">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: currency.code,
            maximumFractionDigits: 0,
          }).format(product.discounted_price)}

          {product.price > product.discounted_price && (
            <small className="pl-1 hidden sm:inline-block text-xs line-through text-slate-700">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: currency.code,
                maximumFractionDigits: 0,
              }).format(product.price)}
            </small>
          )}
        </div>
        <div className="text-sm text-slate-500 mt-2 !font-light line-clamp-3 description break-words">
          {removeTags(product.description)}
        </div>
       
      </div>
    </div>
  );
};

function ProductCard({
  quantityInCart,
  seeDetails,
  product,
  defaultImage,
  currency,
  addToCart,
  removeFromCart,
  model = "rectangle",
}) {
  const [srcImage, setSrcImage] = useState(
    product.medias.length > 0 ? product.medias[0].thumb : defaultImage
  );
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
    <div
      className={
        (model === "square" ? "sm:h-64 h-40" : " sm:h-96 h-64 ") +
        " rounded-md  overflow-hidden relative"
      }
      onClick={() => seeDetails(product)}
    >
      <Link className="block" href={url}>
        <Image
          src={srcImage}
          alt={"Picture of " + product.name}
          className="object-cover h-full w-full"
          fill={true}
          blurDataURL={defaultImage}
          placeholder="blur"
          onError={(e) => {
            setSrcImage(defaultImage);
          }}
        />
      </Link>
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full">
          -{Math.ceil(discount)}%
        </div>
      )}
      {quantityInCart ? (
        <div className="absolute top-2 left-0 bg-primary text-white px-3 py-0">
          {quantityInCart}
        </div>
      ) : null}
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
            <AddToCart
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              productInCart={productInCart}
              quantityInCart={quantityInCart}
              product={product}
              seeDetails={seeDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
