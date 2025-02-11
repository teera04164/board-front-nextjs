"use client"
import { cn } from '@/utils/classname';
import { CiSearch } from "react-icons/ci";
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface ISearchBar {
  isSearching: boolean;
  setSearching: (isSearching: boolean) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export function SearchBar({ isSearching, setSearching, searchText, setSearchText }: ISearchBar) {
  const mdUp = useBreakpoint("md");

  const handleBlurSearch = () => {
    if (searchText === '') {
      setSearching(false);
    }
  };

  const handleSetSearching = (isSearch: boolean) => {
    if (!mdUp) {
      setSearching(isSearch);
    }
  };

  return (
    <>
      <label
        onClick={() => handleSetSearching(true)}
        className={cn('input md:w-full flex items-center gap-2 md:max-w-[535px] rounded-[8px] bg-transparent md:border-green-100', {
          'w-full': isSearching,
        })}
      >
        <CiSearch className="h-8 w-8 md:h-8 md:w-8 opacity-70" />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          onBlur={handleBlurSearch}
          type="text"
          className={cn('grow placeholder-[#5B5B5B]', {
            hidden: !isSearching,
            'md:block': true,
          })}
          placeholder="Search"
        />
      </label>
    </>
  );
}