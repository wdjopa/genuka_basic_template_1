import React, { useEffect, useState } from "react";
import {
  getCollectionProducts,
  getProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

function Products({ company }) {
  const {
    search_mode,
    searched_products,
    products,
    collection,
    collection_product_list_pagination,
  } = useGenukaState();
  const dispatch = useGenukaDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [productDetailed, setProductDetailed] = useState(undefined);

  const openDetails = (product) => {
    setProductDetailed(product);
    setModalOpen(true);
  };

  useEffect(() => {
    if (company.id) {
      getProducts(dispatch, company.id, collection_product_list_pagination);
    }
  }, [company]);

  const changePagination = (pagination) => {
    if (collection) {
      getCollectionProducts(dispatch, company.id, collection.id, pagination);
    } else {
      getProducts(dispatch, company.id, pagination);
    }
  };

  const _products = search_mode ? searched_products : products;

  if (!_products || !company) {
    return <></>;
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 sm:grid-flow-row ">
        {_products.map((product) => (
          <ProductCard
            key={"product_card" + product.id}
            product={product}
            currency={company.currency}
            defaultImage={company.logo}
            seeDetails={openDetails}
          />
        ))}
      </div>
      {productDetailed && (
        <ProductModal
          isOpen={modalOpen}
          currency={company.currency}
          product={productDetailed}
          setIsOpen={setModalOpen}
        />
      )}
      <div className="my-6" />
      <Pagination
        pagination={collection_product_list_pagination}
        onChange={changePagination}
      />
    </>
  );
}

export default Products;
