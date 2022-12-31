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
            alt={"Logo of " + company.name}
          />
        )}
        <h1 className="ml-2 flex items-center">
          <span className="text-2xl font-semibold">{company.name}</span>
        </h1>
      </div>
      <div className="text-center">
        <h2>{company.description}</h2>
      </div>
    </>
  );
}

export default Header;
