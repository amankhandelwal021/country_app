import React from "react";
import { Link } from "react-router-dom";

interface Country {
    name: {
        common: string;
    };
    flags: {
        svg: string;
        alt: string;
    };
    population: number;
    region: string;
    capital: string[];
    cca3: string;
}

interface Props {
    country: Country;
}
const CountryCard = ({ country }: Props) => {

    return (
        <Link
            to={{
                pathname:
                    country.name.common.toLowerCase()
                        .split(" ")
                        .join("-"),
                search: `?code=${country.cca3}`
            }}
            className="md:w-64 w-full bg-white dark:bg-[#2B3844] dark:text-white hover:cursor-pointer rounded-md"
        >
            <img
                src={country.flags.svg}
                alt={country.flags.alt}
                className="h-36 w-full object-cover rounded-t-md"
            />
            <div className="text-start px-5 py-5 space-y-1">
                <p className="font-semibold text-md mb-4">
                    {country.name.common}
                </p>
                <p className="text-xs font-semibold">
                    Population: <span className="font-thin"> {country.population.toLocaleString('en-IN')}</span>
                </p>
                <p className="text-xs font-semibold">
                    Region: <span className="font-thin">{country.region}</span>
                </p>
                <p className="text-xs font-semibold">
                    Capital:{" "} <span className="font-thin">{country.capital && country.capital.length > 0 ? country.capital[0] : "NA"}</span>
                </p>
            </div>
        </Link>
    );
};

export default CountryCard;
