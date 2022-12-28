import Image from "next/image";
import React from "react";

function Header({ company }) {
  if (!company) return <></>;
  return (
    <>
      <div className="flex justify-center content-center py-4">
        {company.logo && (
          <Image
            className="rounded"
            width={60}
            height={60}
            src={company.logo}
            alt={company.name}
          />
        )}
        <h2 className="ml-2 flex items-center">
          <span className="text-2xl font-semibold">{company.name}</span>
        </h2>
      </div>
      <div className="text-center">
        <p>{company.description}</p>
      </div>
    </>
  );
}

export default Header;
