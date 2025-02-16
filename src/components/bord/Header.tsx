import React from "react";
import { CommunityDropdown } from "@/components/dropdown/CommunityDropdown";
import { SearchState } from "@/stores/types";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { SearchBar } from "./SearchBar";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { Button } from "../common/button/Button";

interface IHeader {
  searchState: SearchState;
  setSearchText: (text: string) => void;
  setSearching: (isSearching: boolean) => void;
  onCommunityChange: (communityId: string) => void;
  onCreatePost: () => void;
}

const Header = ({ searchState, setSearchText, setSearching, onCommunityChange, onCreatePost }: IHeader) => {
  const mdUp = useBreakpoint("md");
  const { isAuthenticated } = useCheckAuth();
  return (
    <div>
      <div className="flex items-center justify-between">
        <SearchBar
          isSearching={searchState.isSearching}
          setSearching={setSearching}
          searchText={searchState.searchText}
          setSearchText={setSearchText}
        />
        {!searchState.isSearching || mdUp ? (
          <div className="flex w-full justify-end gap-2 md:max-w-[268px]">
            <div className="max-w-44">
              <CommunityDropdown
                value={searchState.communityId}
                onChange={onCommunityChange}
                title="Community"
                triggerClassName="bg-transparent border-none shadow-none item-center"
                menuClassName="w-52"
              />
            </div>
            {isAuthenticated && <Button onClick={onCreatePost}>Create +</Button>}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
