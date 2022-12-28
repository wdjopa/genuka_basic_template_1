import Image from "next/image";
import React from "react";

function GenukaBar() {
  return (
    <a href="https://genuka.com/register" target="_blank" rel="noreferrer">
      <div className="genuka_bar">
        <Image
          src="https://dashboard.genuka.com/logo.png"
          alt="Logo Genuka"
          width={15}
          height={15}
        />
        Réalisé avec Genuka
      </div>
    </a>
  );
}

export default GenukaBar;
