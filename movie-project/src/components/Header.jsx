import PropTypes from "prop-types";
import { useState } from "react";

function Header({ onSearch }) {
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (e) => setSearchValue(e.target.value);

    const handleSearch = () => onSearch(searchValue);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="p-4 bg-black flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-[30px] uppercase font-bold text-red-700">Movie</h1>
                <nav className="flex items-center space-x-4">
                    <a href="#" className="text-white">Home</a>
                    <a href="#" className="text-white">About</a>
                    <a href="#" className="text-white">Contact</a>
                </nav>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="p-3 text-black bg-white border border-gray-300 rounded"
                />
                <button
                    className="p-2 text-white bg-red-600 rounded"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
}

Header.propTypes = {
    onSearch: PropTypes.func,
};

export default Header;
