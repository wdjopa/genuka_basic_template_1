import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import {
  getCollectionProducts,
  getProduct,
  getProducts,
  searchProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";

const CartComponent = dynamic(() => import("../components/CartComponent"));
const CollectionsTags = dynamic(() => import("../components/CollectionsTags"));
const Products = dynamic(() => import("../components/Products"));
const SearchBar = dynamic(() => import("../components/SearchBar"));

function Shop({ company }) {
  const router = useRouter();
  const { slug, ...pagination } = router.query;
  const dispatch = useGenukaDispatch();
  const { search_mode, collection_product_list_pagination } = useGenukaState();
  console.log({ collection_product_list_pagination });
  useEffect(() => {
    let gotProducts = false;
    if (slug) {
      switch (slug[0]) {
        case "collections":
          getCollectionProducts(dispatch, company.id, slug[1], {
            ...collection_product_list_pagination,
            ...pagination,
            page: pagination.current_page,
          });
          gotProducts = true;
          if (slug[2] == "products") {
            getProduct(dispatch, slug[3]);
          }
          break;
        case "products":
          getProduct(dispatch, slug[1]);
          break;
        case "search":
          break;
      }
    }
    if (!gotProducts) {
      getProducts(dispatch, company.id, {
        ...collection_product_list_pagination,
        ...pagination,
        page: pagination.current_page,
      });
    }
  }, [company]);

  const searchProduct = (searchTerm) => {
    if (searchTerm.length > 3) {
      searchProducts(dispatch, company.id, searchTerm);
    } else {
      if (searchTerm.length == 0) {
        dispatch({ type: "search_mode", payload: false });
      }
    }
  };

  return (
    <>
      <CartComponent company={company} />
      <SearchBar company={company} searchProduct={searchProduct} />
      {!search_mode && <CollectionsTags company={company} />}
      <Products company={company} />
      {/* <OrderStatusPage /> */}
    </>
  );
}

export default Shop;
