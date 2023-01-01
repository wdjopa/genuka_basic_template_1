import Image from "next/image";
import React, { useState } from "react";

function ProductImage({ product, ...props }) {
  const [image, setImage] = useState(
    product.medias.length > 0
      ? product.medias[0].thumb
      : "/assets/placeholder.png"
  );
  return (
    <Image
      {...props}
      src={image}
      fill={!props.width && !props.height}
      width={props.width}
      height={props.height}
      onError={() => {
        setImage("/assets/placeholder.png");
      }}
      alt={"Product " + product.name}
      style={{ objectFit: "contain", backgroundColor: "white" }}
    />
  );
}

export default ProductImage;
