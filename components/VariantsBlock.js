import React, { useState } from "react";

function Variant({
  variant,
  selectVariantOption,
  productInCart,
  clearVariant,
}) {
  const [variantIsOpened, setVariantIsOpened] = useState(true);
  return (
    <div style={{ margin: "20px 0" }}>
      <b
        className="text-lg block"
        onClick={() => {
          setVariantIsOpened(!variantIsOpened);
        }}
      >
        <span
          style={{
            transform: "rotate(" + (!variantIsOpened ? 0 : 90) + "deg)",
            display: "inline-block",
          }}
        >
          ▶
        </span>{" "}
        {variant.name}{" "}
        <span style={{ color: "#dd5f5f" }}>
          {variant.required ? "[Obligatoire]" : ""}
        </span>
      </b>
      {!variantIsOpened ? (
        <></>
      ) : (
        <>
          <small>
            {variant.max_choices} choix {variant.max_choices > 1 ? "max" : ""}{" "}
            possible.{" "}
            <span
              as="u"
              onClick={() => {
                clearVariant({ variant });
              }}
              cursor={"pointer"}
            >
              Annuler tous les choix
            </span>
          </small>
          <div className="text-sm mb-2">{variant.description}</div>
          {variant.options.map((option) => {
            const isSelected = productInCart.variants
              .find((v) => v.slug === variant.slug)
              ?.options?.map((o) => o.id)
              ?.includes(option.id);
            return (
              <div
                title={option.description}
                className={
                  "mr-1 mb-1 cursor-pointer border-2 rounded-md w-fit px-3 inline-block border-gray-800 " +
                  (isSelected ? "bg-black text-white" : "bg-white text-black")
                }
                key={Math.random()}
                onClick={() => {
                  if (!isSelected) selectVariantOption({ variant, option });
                }}
              >
                {option.name}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

function VariantsBlock({
  product,
  selectVariantOption,
  productInCart,
  clearVariant,
}) {
  if (product.variants.length === 0) return <></>;
  return (
    <div>
      {product.variants.map((variant, i) => {
        return (
          <Variant
            key={"variant_" + i}
            variant={variant}
            selectVariantOption={selectVariantOption}
            productInCart={productInCart}
            clearVariant={clearVariant}
          />
        );
      })}
    </div>
  );
}

export default VariantsBlock;
