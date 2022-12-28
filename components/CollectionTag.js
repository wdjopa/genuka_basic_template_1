import React from "react";

function CollectionTag({ collection, onSelect, isSelected }) {
  return (
    <div
      onClick={() => onSelect(collection.id)}
      className={
        "rounded-3xl min-w-max mr-3 px-4 cursor-pointer py-1.5 text-sm " +
        (isSelected
          ? " bg-active "
          : "hover:text-gray-700 text-gray-500 bg-gray-100")
      }
    >
      {collection.name}
    </div>
  );
}

export default CollectionTag;
