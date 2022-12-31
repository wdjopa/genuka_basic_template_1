import Link from "next/link";
import React, { useEffect, useRef } from "react";

function CollectionTag({ collection, onSelect, isSelected }) {
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  useEffect(() => {
    if (isSelected) {
      executeScroll();
    }
  }, []);
  return (
    <Link
      href={"/collections/" + collection.id}
      ref={myRef}
      // onClick={() => onSelect(collection.id)}
      className={
        "rounded-3xl min-w-max mr-3 px-4 cursor-pointer py-1.5 text-sm " +
        (isSelected
          ? " bg-active "
          : "hover:text-gray-700 text-gray-500 bg-gray-100")
      }
    >
      {collection.name}
    </Link>
  );
}

export default CollectionTag;
