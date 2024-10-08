import { useNavigate } from "react-router-dom";

import SearchBar, { SearchForm } from "@/components/SearchBar";
import appDownloadImage from "../assets/appDownload.png"
import landingImage from "../assets/landing.png"

const HomePage = () => {
    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-green-600">
                    Organska dobrota na dlanu
                </h1>

                <div className="block md:hidden text-xl flex-col gap-4">
                    <span className="text-xl">Pretraži po gradu ili općini</span>
                    <div style={{ height: '20px' }}></div>
                    <SearchBar placeHolder="" onSubmit={handleSearchSubmit} searchQuery={""}  />
                </div>

                <div className="hidden md:block text-xl flex-col gap-4">
                    <span className="text-xl">Klik te dijeli od sreće</span>
                    <div style={{ height: '20px' }}></div>
                    <SearchBar placeHolder="Pretraži po gradu ili općini" onSubmit={handleSearchSubmit} searchQuery={""} />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">Sa sela do vašeg stola!</span>
                    <span>bosanskohercegovačka proizvodnja</span>
                    <img src={appDownloadImage} />
                </div>
            </div>
        </div>
    )
};

export default HomePage;