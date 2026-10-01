import type { ChangeEvent } from "react";
import { Search } from "lucide-react";

type DiscoverSearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
};
function DiscoverSearchBar({ query, setQuery }: DiscoverSearchBarProps) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full sm:w-64">
      <Search className="text-soft pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2" />
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        className="field w-full pl-10! outline-none"
      />
    </div>
  );
}

export default DiscoverSearchBar;

