/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useGenukaDispatch, useGenukaState } from "../utils/genuka.store";
import ToggleTitle from "./ToggleTitle";
import VariantsBlock from "./VariantsBlock";

function MediaReader({ mainMedia }) {
  const [isAnImage, setIsAnImage] = useState(true);
  useEffect(() => {
    if (mainMedia) {
      setIsAnImage(true);
    }
  }, [mainMedia]);

  return isAnImage ? (
    <img
      className={"h-96 w-max object-contain inline-block border-2 rounded-md"}
      style={{
        bgColor: "#55555511",
        borderColor: "transparent",
      }}
      src={mainMedia}
      onError={({ currentTarget }) => {
        setIsAnImage(false);
      }}
      alt={mainMedia}
    />
  ) : (
    <video
      style={{ height: "400px", background: "black", borderRadius: "5px" }}
      controls
      autoPlay
      src={mainMedia}
      onError={(e) => {}}
    />
  );
}
function MediasBlock({ product }) {
  const [mainMedia, setMainMedia] = useState();

  useEffect(() => {
    if (product && product.medias.length > 0) {
      setMainMedia(product.medias[0].link);
    }
  }, [product]);

  if (!mainMedia)
    return (
      <div>
        <img
          className={
            " h-96 w-96 object-contain inline-block border-2 rounded-md"
          }
          style={{
            bgColor: "#55555511",
            borderColor: "transparent",
          }}
          src={"https://via.placeholder.com/400/400"}
          alt={product.name}
        />
      </div>
    );
  return (
    <div className="flex flex-col px-2">
      {<MediaReader mainMedia={mainMedia} />}
      <div className="flex py-2 overflow-x-auto">
        {product.medias.map((media, i) => {
          return (
            <div
              className="inline-block min-w-max cursor-pointer"
              key={media.id + i}
            >
              <img
                className={
                  " h-16 w-16 object-contain inline-block border-2 rounded-sm"
                }
                style={{
                  bgColor: mainMedia === media.link ? "#EEE" : "#55555511",
                  borderColor:
                    mainMedia === media.link ? "black" : "transparent",
                }}
                onClick={() => {
                  setMainMedia(media.link);
                }}
                src={media.thumb}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://via.placeholder.com/70/000000?text=...";
                }}
                alt={product.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ProductModal = ({
  product,
  company,
  currency,
  isOpen,
  setIsOpen,
  addToCart,
}) => {
  const [qty, setQty] = useState(1);
  const dispatch = useGenukaDispatch();
  const { cart, productInCart } = useGenukaState();
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setQty(1);
  }, [isOpen]);

  useEffect(() => {
    if (
      product &&
      company &&
      (!productInCart.product || productInCart.product.id !== product.id)
    ) {
      dispatch({ type: "hydrate_product", payload: { product, company } });
      dispatch({
        type: "reviews",
        payload: {
          list: product.reviews,
          total_reviews: product.total_reviews,
          avg_reviews: product.avg_reviews,
        },
      });
    }
  }, [product, company, dispatch]);

  const clearVariant = ({ variant }) => {
    dispatch({ type: "clear_variant", payload: variant });
  };

  const selectVariantOption = ({ variant, option }) => {
    dispatch({ type: "add_variant_option", payload: { variant, option } });
  };
  const _productInCart = { ...productInCart, product } ||
    cart.items.filter((item) => item.product.id === product.id)?.[0] || {
      product,
      addToCart: new Date(),
      variants: [],
      properties: [],
      complement: "",
      note: "",
    };
  const requiredVariantsSlug = _productInCart.product.variants
    .filter((v) => v.required)
    .map((v) => v.slug);
  const canOrder =
    _productInCart.variants.length >= requiredVariantsSlug.length &&
    _productInCart.variants
      .filter((v) => v.required)
      .every(
        (v) =>
          requiredVariantsSlug.includes(v.slug) &&
          v.options.length == v.max_choices
      );
  console.log({ _productInCart, canOrder, productInCart });

  return (
    <div>
      {isOpen && (
        <div className="fixed z-50 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center ">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl md:max-w-4xl xl:max-w-5xl sm:w-full px-6 py-4">
            <div className="">
              <div className="flex items-center justify-between mb-2 border-b pb-4">
                <h2 className="text-xl sm:text-3xl leading-6 font-sm text-gray-900">
                  {product.name}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-xl sm:text-3xl leading-none font-semibold text-black hover:text-black focus:outline-none focus:text-black"
                >
                  ×
                </button>
              </div>
              <div
                className="mt-2 overflow-auto sm:h-auto px-2"
                style={{ maxHeight: "60vh" }}
              >
                <div className="flex flex-wrap justify-between">
                  <div className="w-full sm:w-1/2">
                    <MediasBlock product={product} />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="price my-3">
                      <span className="text-3xl font-semibold">
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: currency.code,
                          maximumFractionDigits: 0,
                        }).format(productInCart.price)}
                      </span>
                      {product.price > productInCart.price && (
                        <span className="line-through text-lg ml-2">
                          {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: currency.code,
                            maximumFractionDigits: 0,
                          }).format(product.price)}
                        </span>
                      )}
                    </div>

                    <div className="variants">
                      <VariantsBlock
                        product={product}
                        selectVariantOption={selectVariantOption}
                        productInCart={_productInCart}
                        clearVariant={clearVariant}
                      />
                    </div>

                    <div className="quantity flex justify-between items-center my-3">
                      <span className="font-normal text-xl">Quantité</span>
                      <div className=" flex border-2 border-primary bg-white rounded-md overflow-hidden">
                        <span
                          onClick={() => {
                            if (qty > 1) setQty(qty - 1);
                          }}
                          className="w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-slate-100"
                        >
                          —
                        </span>
                        <span className="w-8 h-8 flex justify-center items-center">
                          {qty}
                        </span>
                        <span
                          onClick={() => {
                            setQty(qty + 1);
                          }}
                          className="w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-slate-100"
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="buttons">
                      <button
                        className={
                          (canOrder
                            ? "border-primary text-primary"
                            : " text-slate-400") +
                          " btn border-2 my-2 rounded-md w-full px-4 py-2"
                        }
                        onClick={() => {
                          addToCart({ ..._productInCart, quantity: qty });
                        }}
                        disabled={!canOrder}
                      >
                        Ajouter au panier
                      </button>
                      <button
                        disabled={!canOrder}
                        className={
                          (canOrder
                            ? "border-primary bg-primary  text-white"
                            : "bg-slate-100 text-slate-400") +
                          " hidden btn border-2 my-2 rounded-md w-full px-4 py-2"
                        }
                      >
                        Acheter maintenant
                      </button>
                    </div>

                    <ToggleTitle title={"Description"} isOpenByDefault={true}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></div>
                    </ToggleTitle>
                    <ToggleTitle
                      title={`Avis (${product.reviews.length} avis)`}
                    ></ToggleTitle>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
