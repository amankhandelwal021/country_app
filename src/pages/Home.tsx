import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import axios from 'axios';
import CountryCard from '../components/CountryCard';

interface Country {
    name: {
      common: string;
    };
    region: string;
    altSpellings: string[];
    flags: {
        svg: string;
        alt: string;
    };
    population: number;
    capital: string[];
    cca3: string;
  }

const Home = () => {

    const [countries, setCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const getCountries = async () => {
        axios.get<Country[]>("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const getCountryByRegion = async () => {
        axios.get<Country[]>(`https://restcountries.com/v3.1/region/${selectedRegion}`)
            .then(response => {
                setCountries(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        if (selectedRegion.length > 0) {
            getCountryByRegion();
        }
    }, [selectedRegion])

    useEffect(() => {
        if (countries.length > 0 && selectedRegion.length === 0) {
            const uniqueRegion: string[] = []
            countries.forEach((country: Country) => {
                if (!uniqueRegion.includes(country.region)) {
                    uniqueRegion.push(country.region)
                }
            });
            setRegions(uniqueRegion);
        }
    }, [countries]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            const filteredResult = countries.filter((country: Country) => {
                const altSpellings = country.altSpellings;
                const lastSpelling = altSpellings[altSpellings.length - 1].toLowerCase();
                return lastSpelling.includes(searchQuery.toLowerCase());
            });
            setFilteredCountries(filteredResult);
        } else {
            setFilteredCountries(countries);
        }
    }, [searchQuery]);

    return (
        <div className="bg-gray-100 dark:bg-[#202C36] h-screen overflow-scroll no-scrollbar">
            <Navbar />
            <div className="">
                <Header regions={regions} setSelectedRegion={setSelectedRegion} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:px-20 px-10">
                {countries.length > 0 ? (
                    filteredCountries.length > 0 ? (
                        filteredCountries.map((country: Country, index: number) => (
                            <CountryCard key={index} country={country} />
                        ))
                    ) : (
                        countries.map((country: Country, index: number) => (
                            <CountryCard key={index} country={country} />
                        ))
                    )
                ) : (
                    <div className='dark:text-white'>
                        <p>Fetching...</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Home
