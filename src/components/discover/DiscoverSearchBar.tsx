import type { ChangeEvent } from "react";

type DiscoverSearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
};
function DiscoverSearchBar({ query, setQuery }: DiscoverSearchBarProps) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-34 md:w-70 px-6 form m-3 h-15 mt-5"
      />
    </div>
  );
}

export default DiscoverSearchBar;

