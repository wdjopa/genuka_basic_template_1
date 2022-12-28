/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Modal from "./ProductModal";

function ProductCard({ seeDetails, product, defaultImage, currency }) {
  console.log(currency);
  const discount = (1 - product.discounted_price / product.price) * 100;
  const addToCart = (e) => {
    e.stopPropagation();
    // TODO add to cart
  };
  return (
    <div
      className="rounded-md h-64 overflow-hidden relative"
      onClick={() => seeDetails(product)}
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
      <div className="bg-gradient-to-t from-black to-transparent left-0 bottom-0 h-3/5 sm:h-1/3 w-full absolute px-2 ">
        <div className="flex flex-col h-full pb-2.5 justify-end">
          <div className="flex" title={product.name}>
            <span className="text-gray-100 truncate text-md">
              {product.name}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium justify-end flex-col items-end text-lg text-white">
              {product.discounted_price} {currency.symbol}
              {product.price > product.discounted_price && (
                <small className="pl-1 hidden sm:inline-block text-xs line-through text-white">
                  {product.price} {currency.symbol}
                </small>
              )}
            </div>
            <div className="flex rounded-full items-center bg-slate-50 w-fit justify-end">
              {false && (
                <>
                  <button className="bg-primary text-white font-bold text-center rounded-full w-8 h-8">
                    -
                  </button>
                  <span className="h-8 items-center flex px-2">2</span>
                </>
              )}
              <button
                className="bg-primary text-white font-bold text-center rounded-full w-8 h-8"
                onClick={addToCart}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
