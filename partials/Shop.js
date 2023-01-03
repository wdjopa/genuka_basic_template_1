import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import Pagination from "../components/Pagination";
import {
  getCollectionProducts,
  getProducts,
  searchProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";

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
  return (
    <>
      <CartComponent company={company} />
      <SearchBar company={company} searchProduct={searchProduct} />
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
