import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
// import Whatsapp from "../components/icons/Whatsapp";
import Whatsapp from "../public/assets/whatsapp.svg";

import Pagination from "../components/Pagination";
import {
  getCollectionProducts,
  getProducts,
  searchProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";
import Image from "next/image";
import Link from "next/link";

const CartComponent = dynamic(() => import("../components/CartComponent"));
const CollectionsTags = dynamic(() => import("../components/CollectionsTags"));
const Products = dynamic(() => import("../components/Products"));
const SearchBar = dynamic(() => import("../components/SearchBar"));

function Shop({ company, css }) {
  const { search_mode, collection, collection_product_list_pagination } =
    useGenukaState();
  const dispatch = useGenukaDispatch();
  const router = useRouter();

  const searchProduct = (searchTerm) => {
    if (searchTerm.length > 3) {
      searchProducts(dispatch, company.id, searchTerm);
    } else {
      if (searchTerm.length == 0) {
        dispatch({ type: "search_mode", payload: false });
      }
    }
  };

  const changePagination = (pagination) => {
    const {
      first,
      last,
      prev,
      path,
      from,
      last_page,
      total,
      next,
      to,
      page,
      ...query
    } = pagination;
    router.push({ query: { ...router.query, ...query } }, undefined, {
      shallow: true,
    });

    if (collection) {
      getCollectionProducts(dispatch, company.id, collection.id, pagination);
    } else {
      getProducts(dispatch, company.id, pagination);
    }
  };
  const phoneNumber = company.phone
    .replaceAll(" ", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "")
    .replaceAll(" ", "");
  let hasWhatsapp = company.settings.default_template.whatsapp
    ? company.settings.default_template.whatsapp.active
    : phoneNumber != ""
    ? true
    : false;
  const message = company.settings.default_template.whatsapp?.message ?? "";

  return (
    <>
      <CartComponent company={company} />
      {hasWhatsapp && (
        <a
          target={"_blank"}
          rel="noreferrer"
          href={"https://wa.me/" + phoneNumber + "?text=" + message}
          className="floating_button"
        >
          <Image
            src="/assets/whatsapp.svg"
            alt="Whatsapp icon"
            height={25}
            width={25}
          />
        </a>
      )}
      <Link
        className="rounded-2 bg-white p-2 px-4 text-sm my-3 text-primary inline-block"
        href={"/articles"}
      >
        📚 Consultez notre Blog 📚
      </Link>
      <SearchBar
        placeholder={"Recherchez un produit"}
        onSearch={searchProduct}
      />
      {!search_mode && <CollectionsTags company={company} />}
      <Products css={css} company={company} />
      <div className="my-6" />
      {!search_mode && (
        <Pagination
          pagination={collection_product_list_pagination}
          onChange={changePagination}
        />
      )}
      {/* <OrderStatusPage /> */}
    </>
  );
}

export default Shop;
