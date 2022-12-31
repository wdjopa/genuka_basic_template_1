import dynamic from "next/dynamic";
import React from "react";
import {
  searchProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";

const CartComponent = dynamic(() => import("../components/CartComponent"));
const CollectionsTags = dynamic(() => import("../components/CollectionsTags"));
const Products = dynamic(() => import("../components/Products"));
const SearchBar = dynamic(() => import("../components/SearchBar"));

function Shop({ company, css }) {
  const { search_mode } = useGenukaState();
  const dispatch = useGenukaDispatch();

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
      <Products css={css} company={company} />
      {/* <OrderStatusPage /> */}
    </>
  );
}

export default Shop;
