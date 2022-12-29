import Image from "next/image";
import React from "react";

function ProductImage({ product, ...props }) {
  return (
    <Image
      {...props}
      src={product.medias.length > 0 ? product.medias[0].thumb : ""}
      fill={!props.width && !props.height}
      width={props.width}
      height={props.height}
      alt={"Product " + product.name}
      style={{ objectFit: "contain", backgroundColor: "white" }}
    />
  );
}

export default ProductImage;
