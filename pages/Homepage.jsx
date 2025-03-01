import React from "react";
import { NavLink, Link } from "react-router";
const Homepage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <h1 className="text-4xl sm:text-5xl w-full py-4 text-center bg-gray-100 shadow-md">
        Form Builder
      </h1>
      <div className="flex justify-center items-center w-full flex-grow">
        <div className="flex flex-col sm:flex-row justify-evenly items-center bg-red-100 w-11/12 sm:w-3/4 md:w-1/2 h-auto sm:h-96 rounded-xl shadow-lg p-5">
          <button className="bg-red-500 text-white w-full sm:w-1/3 py-5 px-6 rounded-xl text-lg sm:text-xl font-semibold hover:bg-red-600 transition-all">
            <NavLink to="/">Admin</NavLink>
          </button>
          <button className="bg-blue-500 text-white w-full sm:w-1/3 py-5 px-6 rounded-xl text-lg sm:text-xl font-semibold hover:bg-blue-600 transition-all mt-4 sm:mt-0">
            <NavLink to="/forms">User</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
