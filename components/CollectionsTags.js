import { useRouter } from "next/router";
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
  const router = useRouter();

  useEffect(() => {
    if (collection) {
      setSelectedCollectionId(collection.id);
    }
  }, [collection]);

  useEffect(() => {
    console.log("getPaginatedCollections");
    if (!collections_list) {
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
      router.push("/", null, { shallow: true });
      dispatch({ type: "collection", payload: undefined });
      getProducts(dispatch, company.id, collection_product_list_pagination);
    } else {
      router.push("/collections/" + collectionId, null, { shallow: true });
      getCollectionProducts(
        dispatch,
        company.id,
        collectionId,
        collection_product_list_pagination
      );
    }
  };

  // useEffect(() => {
  //   if (selectedCollectionId)
  //     getCollectionProducts(dispatch, company.id, selectedCollectionId, {
  //       ...collection_product_list_pagination,
  //       ...pagination,
  //       page: pagination.current_page,
  //     });
  // }, [selectedCollectionId]);

  if (!company || !collections) {
    return <></>;
  }
  return (
    <div className="flex pb-4 overflow-x-auto">
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
