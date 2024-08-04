import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md">
      <nav className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        <div className="text-2xl font-semibold text-gray-800">Instagram</div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          </div>
        </div>
      </nav>
      <div className="side"></div>
    </div>
  );
};

export default Navbar;
