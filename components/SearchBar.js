import React, { useEffect, useState } from "react";
import useDebounce from "../utils/hooks/useDebounce";

function SearchBar({ company, searchProduct }) {
  const openFilters = () => {
    alert("Pas encore fonctionnel");
  };
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);

  useEffect(() => {
    console.log(`Recherche en cours pour ${debouncedSearchTerm}...`);
    searchProduct(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <div>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">🔍</span>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-gray-300 pl-10 pr-12 py-3 focus:border-black focus:ring-black sm:text-sm"
          placeholder="Search a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center"
          onClick={openFilters}
        >
          <div className="p-2 text-gray-400">Filtres 🎛</div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
