import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header({ company }) {
  if (!company) return <></>;
  return (
    <div className="mb-5 border-b border-primary/20">
      <Link href="/" className="flex justify-center items-center py-4">
        {company.logo && (
          <Image
            className="rounded"
            width={50}
            height={50}
            src={company.logo}
            style={{ maxHeight: 50, objectFit: "cover" }}
            alt={"Logo of " + company.name}
          />
        )}
        <h1 className="ml-7 flex items-center">
          <span className="text-3xl text-center font-normal text-primary font-title">
            {company.name}
          </span>
        </h1>
      </Link>

      {/* <div className="text-center my-6">
        <h4>{company.description}</h4>
      </div> */}
    </div>
  );
}

export default Header;
