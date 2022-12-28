import React, { useEffect, useState } from "react";
import {
  getCollectionProducts,
  getPaginatedCollections,
  getProducts,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";
import CollectionTag from "./CollectionTag";

function CollectionsTags({ company }) {
  const allProductsCollection = {
    id: 0,
    name: "Tous les produits",
    slug: "all-products",
    company_id: company.id,
  };
  const {
    collection,
    collections_list,
    collection_list_pagination,
    collection_product_list_pagination,
  } = useGenukaState();
  const dispatch = useGenukaDispatch();
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    collection?.id || allProductsCollection.id
  );
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (company.id) {
      getPaginatedCollections(dispatch, company.id, collection_list_pagination);
    }
  }, [company]);

  useEffect(() => {
    if (collections_list && company)
      setCollections([allProductsCollection, ...collections_list]);
  }, [collections_list, company]);

  const onSelect = (collectionId) => {
    setSelectedCollectionId(collectionId); // Update only the Id
    if (collectionId == 0) {
      dispatch({ type: "collection", payload: undefined });
      getProducts(dispatch, company.id, collection_product_list_pagination);
    } else {
      getCollectionProducts(
        dispatch,
        company.id,
        collectionId,
        collection_product_list_pagination
      );
    }
  };
  console.log({ selectedCollectionId });
  if (!company || !collections) {
    return <></>;
  }
  return (
    <div className="flex py-4 overflow-x-auto">
      {collections.map((collection, i) => (
        <CollectionTag
          isSelected={
            (selectedCollectionId && collection.id == selectedCollectionId) ||
            (!selectedCollectionId && collection.id == 0)
          }
          onSelect={onSelect}
          key={"collection_" + collection.id}
          collection={collection}
        />
      ))}
    </div>
  );
}

export default CollectionsTags;
