import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";


const Forms = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);


  console.log(data);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3031/forms");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center bg-red-200 text-red-700 p-4 rounded-lg shadow-md">
        Forms
      </h1>

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      <div className="mt-6 flex flex-col items-center gap-4">
        {data.length === 0 && !error ? (
          <p className="text-gray-600 text-lg">No forms available.</p>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className="w-4/5 md:w-3/5 lg:w-2/5 bg-cyan-300 text-white text-lg font-semibold 
              py-3 px-5 rounded-lg shadow-md hover:bg-cyan-400 transition duration-300 cursor-pointer"
            >
              <NavLink to={`/forms/${item.id}`} className="text-lg font-bold text-center"> 
              {item.name}
              </NavLink>
            
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forms;
