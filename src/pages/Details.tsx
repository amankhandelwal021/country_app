import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaArrowRight } from "react-icons/fa6";

interface CountryInfo {
    flags: {
        svg: string;
        alt: string;
    };
    name: {
        common: string;
        nativeName?: {
            eng: {
                official: string;
            };
        };
    };
    population: number;
    region: string;
    subregion?: string;
    capital?: string[];
    demonyms?: string[];
    currencies?: string[];
    languages?: string[];
    borders?: string[];
}

const Details = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation();
    const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/alpha/${searchParams.get("code")}`)
            .then((response) => {
                setCountryInfo(response.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [searchParams.get("code")]);

    return (
        <div className="dark:text-white dark:bg-[#202C36] h-screen overflow-scroll">
            <Navbar />
            <div className="h-28 flex items-center justify-start md:px-10 px-5 lg:py-10 py-0"
                onClick={() => navigate(-1)}
            >
                <div className="flex items-center justify-start hover:cursor-pointer hover:opacity-45 duration-300 space-x-3 dark:bg-[#2B3844] py-2 px-5 rounded-md">
                    <FaArrowRight className="rotate-180" />
                    <span>Back</span>
                </div>
            </div>
            {countryInfo ? (
                <div className="xl:flex items-center justify-center md:px-10 px-5 lg:py-10 py-0 md:pb-0 pb-5 xl:space-x-24 xl:space-y-0 space-y-7">
                    <div className="">
                        <img
                            src={countryInfo?.flags?.svg}
                            alt={countryInfo?.flags?.alt}
                            className="h-72 w-auto rounded-xl object-contain"
                        />
                    </div>
                    <div className="flex-col space-y-5">
                        <p className="text-2xl font-bold text-start">
                            {countryInfo?.name?.common ? countryInfo.name.common : "NA"}
                        </p>
                        <div className="md:flex justify-start xl:justify-between items-start text-start md:space-x-40 xl:space-y-0 space-y-10">
                            <div>
                                <p className="text-lg font-semibold">Native Name:{" "}
                                    {countryInfo?.name?.nativeName?.eng?.official ? <span className="font-normal">{countryInfo.name.nativeName.eng.official}</span> : <span className="font-normal">NA</span>}
                                </p>
                                <p className="text-lg font-semibold">Population:{" "}
                                    {countryInfo?.population ? <span className="font-normal">{countryInfo.population.toLocaleString('en-IN')}{" "}</span> : <span className="font-normal">NA</span>}
                                </p>
                                <p className="text-lg font-semibold">Region:{" "}
                                    {countryInfo?.region ? <span className="font-normal">{countryInfo.region}</span> : <span className="font-normal">NA</span>}
                                </p>
                                <p className="text-lg font-semibold">Sub Region:{" "}
                                    {countryInfo?.subregion ? <span className="font-normal">{countryInfo.subregion}</span> : <span className="font-normal">NA</span>}
                                </p>
                                <p className="text-lg font-semibold">Capital:{" "}
                                    {countryInfo?.capital && countryInfo?.capital?.length > 0 ? <span className="font-normal">{countryInfo.capital[0]}{" "}</span> : <span className="font-normal">NA</span>}
                                </p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Top Level Domians:{" "}
                                    {countryInfo?.demonyms ? <span className="font-normal">{Object.keys(countryInfo.demonyms).join(",")}</span> : <span className="font-normal">NA</span>}
                                </p>
                                <p className="text-lg font-semibold">Currencies:{" "}
                                    {countryInfo?.currencies ? <span className="font-normal">{Object.keys(countryInfo.currencies).join(",")}</span> : <span className="font-normal">NA</span>}
                                </p>
                                <p className="text-lg font-semibold">Language:{" "}
                                    {countryInfo?.languages ? <span className="font-normal">{Object.keys(countryInfo.languages).join(",")}</span> : <span className="font-normal">NA</span>}
                                </p>
                            </div>
                        </div>
                        {countryInfo?.borders?.length && (
                            <div className="flex items-center space-x-3">
                                <p className="text-lg font-semibold whitespace-nowrap">Border Countries:</p>
                                <div className="flex items-center w-80 overflow-scroll no-scrollbar space-x-3">
                                    {countryInfo.borders.map((country: string, index: number) => (
                                        <Link to={{
                                            pathname: pathname,
                                            search: `?code=${country}`
                                        }}>
                                            <div className="px-10 py-1 dark:text-white dark:bg-[#2B3844] border-gray-200 dark:border-none border-2 drop-shadow-md rounded-md hover:cursor-pointer hover:opacity-45 duration-300">{country}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>Fetching details...</p>
            )}
        </div>
    );
};

export default Details;
