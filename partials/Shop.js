import React from "react";
import CollectionsTags from "../components/CollectionsTags";
import Products from "../components/Products";
import SearchBar from "../components/SearchBar";
import {
  searchProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";

function Shop({ company }) {
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
      <SearchBar company={company} searchProduct={searchProduct} />
      {!search_mode && <CollectionsTags company={company} />}
      <Products company={company} />
    </>
  );
}

export default Shop;
