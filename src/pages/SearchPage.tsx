import { useSearchStores } from "@/api/StoreApi";
import OfferFilter from "@/components/OfferFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedOffers: string[];
    sortOption: string;
}

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedOffers: [],
        sortOption: "najbolje",
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { results, isLoading } = useSearchStores(searchState, city);

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1,
        }))
    }

    const setSelectedOffers = (selectedOffers: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedOffers,
            page: 1,

        }))
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }))
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    }

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    }

    if (isLoading) {
        return <span>Loading...</span>
    }
    if (!results?.data || !city) {
        return <span>Nema pronađenih rezultata.</span>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <OfferFilter selectedOffers={searchState.selectedOffers} onChange={setSelectedOffers}
                    isExpanded={isExpanded} onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery} placeHolder="Pretraži po ponudi ili imenu prodavnice"
                    onReset={resetSearch}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results.pagination.total} city={city} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>
                {
                    results.data.map((store) => (
                        <SearchResultCard key={store._id} store={store} />
                    ))
                }
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    );
};

export default SearchPage;