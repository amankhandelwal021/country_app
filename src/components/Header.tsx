import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowUp } from "react-icons/md";

interface Props {
  regions: string[];
  setSelectedRegion: (region: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRegion: string;
}

const Header = ({
  regions,
  setSelectedRegion,
  searchQuery,
  setSearchQuery,
  selectedRegion
}: Props) => {
  const [active, setActive] = useState(false);

  return (
    <div className="md:flex items-start justify-between py-10 md:px-12 px-6 md:space-y-0 space-y-5">
      <div className="dark:bg-[#2B3844] bg-white flex items-center md:w-1/4 py-3 px-5 space-x-5 rounded-md dark:text-white">
        <IoSearchOutline />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          className="text-sm flex-1 border-none outline-none dark:bg-[#2B3844]"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="md:fixed md:top-24 md:right-16">
        <div
          className="flex items-center justify-between dark:bg-[#2B3844] bg-white dark:text-white  w-48 py-3 px-5 rounded-md hover:cursor-pointer "
          onClick={() => setActive(!active)}
        >
          <p>{selectedRegion && selectedRegion.length > 0 ? selectedRegion : "Filter By Region"}</p>
          <MdKeyboardArrowUp
            className={`text-xl ${!active ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        {active && (
          <div className="text-start  px-5 py-3 mt-1 rounded-md dark:bg-[#2B3844] bg-white dark:text-white  space-y-2 h-36  overflow-scroll no-scrollbar">
            {regions &&
              regions.length > 0 &&
              regions.map((region: string, index: number) => (
                <p
                  key={index}
                  className="hover:opacity-40 duration-300 hover:cursor-pointer"
                  onClick={() => {
                    setSelectedRegion(region)
                    setActive(false)
                  }}
                >
                  {region}
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
