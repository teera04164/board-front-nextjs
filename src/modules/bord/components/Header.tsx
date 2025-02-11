import React from "react";
import { SearchBar } from "@/modules/bord/components/SearchBar";
import { CommunityDropdown } from "@/components/dropdown/CommunityDropdown";
import { SearchState } from "@/stores/types";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface IHeader {
    searchState: SearchState;
    setSearchText: (text: string) => void;
    setSearching: (isSearching: boolean) => void;
    onCommunityChange: (communityId: string) => void;
    onCreatePost: () => void;
}

const Header = ({
    searchState,
    setSearchText,
    setSearching,
    onCommunityChange,
    onCreatePost
}: IHeader) => {
    const mdUp = useBreakpoint("md");
    return (
        <div>
            <div className="flex justify-between items-center">
                <SearchBar
                    isSearching={searchState.isSearching}
                    setSearching={setSearching}
                    searchText={searchState.searchText}
                    setSearchText={setSearchText}
                />
                {!searchState.isSearching || mdUp ? (
                    <div className="flex gap-2 justify-end w-full md:max-w-[268px]">
                        <div className="max-w-44">
                            <CommunityDropdown
                                value={searchState.communityId}
                                onChange={onCommunityChange}
                                title="Community"
                                triggerClassName="bg-transparent border-none shadow-none item-center"
                                menuClassName="w-52"
                            />
                        </div>
                        <button
                            onClick={onCreatePost}
                            className="md:block btn w-full btn-primary text-white max-w-28 px-0 pl-0 pr-0"
                        >
                            Create +
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Header;
