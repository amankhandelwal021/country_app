import React, { useState } from 'react'
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

const Navbar = () => {

    const [isDarkMode, setIsDarMode] = useState(false);

    const handleDarkMode = () => {
        setIsDarMode(!isDarkMode)
        document.body.classList.toggle("dark");
    }

    return (
        <div className={`flex items-center justify-between py-5 px-10 dark:bg-[#2B3844] bg-white drop-shadow-md sticky top-0 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <p className='font-bold dark:text-white'>Where is the world?</p>
            <div className="dark:text-white flex items-center space-x-2 hover:cursor-pointer hover:opacity-45 duration-300" onClick={handleDarkMode}>
                {!isDarkMode ? <FaMoon /> : <BsFillSunFill />}
                <p>{!isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
        </div>
    )
}

export default Navbar
