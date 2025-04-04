import React, { useState } from "react";
import { NavLink, Link } from "react-router";
import { Button } from "@mui/material";
import backImage from "../src/assets/images/background.jpg";
import { blue } from "@mui/material/colors";
const Homepage = () => {
  const [user, setUser] = useState(true);
  return (
    <div
      className="flex flex-col w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backImage})` }}
    >
      <h1 className="text-4xl sm:text-5xl w-full py-4 text-center bg-[#E5F3FD] shadow-md">
        Form Builder
      </h1>
      <h3 className="flex justify-center text-4xl mt-12 text-[#1876d2] font-bold font-fangsong">Build forms, collect responses, shape decisions — all in one click. </h3>
      <div className="flex justify-center items-center w-full flex-grow ">
        <div
          className="flex flex-col sm:flex-row justify-evenly items-center w-10/12 sm:w-2/3 md:w-4/10 h-1/3 sm:h-96 md:h-52
           rounded-xl shadow-lg p-5 bg-[#0d88e117]"
          // style={{background: "radial-gradient(black, transparent)"}}
        >
          {user ? (
            <NavLink to="/admin">
              {" "}
              <Button
                variant="contained"
                color="success"
                sx="width:200px;height:50px"
              >
                Admin
              </Button>
            </NavLink>
          ) : (
            <NavLink to="/auth">
              <Button
                variant="contained"
                color="success"
                sx="width:200px;height:50px"
              >
                Admin
              </Button>
            </NavLink>
          )}
          <NavLink to="/forms"><Button variant="contained"  sx="width:200px;height:50px">
            User
          </Button></NavLink>
          {/* <button className="bg-red-400 text-black w-full sm:w-1/3 py-5 px-6 rounded-4xl text-lg sm:text-xl font-semibold hover:bg-red-600 transition-all">
           {user?<NavLink to="/admin">Admin</NavLink>:<NavLink to="/auth">Admin</NavLink>} 
          </button>
          <button className="bg-blue-400 text-white w-full sm:w-1/3 py-5 px-6 rounded-4xl text-lg sm:text-xl font-semibold hover:bg-blue-600 transition-all mt-4 sm:mt-0">
            <NavLink to="/forms">User</NavLink>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
