import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";


const Response = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3031/responses");
        const jsonData = await res.json();
        console.log(jsonData, "here is the data show");
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const groupedByFormId = data.reduce((acc, entry) => {
    const { formId } = entry;
    if (!acc[formId]) {
      acc[formId] = [];
    }
    acc[formId].push(entry);
    return acc;
  }, {});

  console.log(groupedByFormId);


  return (
  
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center bg-red-200 text-red-700 p-4 rounded-lg shadow-md">
        Responses
      </h1>

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      <div className="mt-6 flex flex-col items-center gap-4">
      {Object.entries(groupedByFormId).map(([formId, responses]) => (
        <div key={formId} className="w-4/5 md:w-3/5 lg:w-2/5 bg-cyan-300 text-white text-lg font-semibold 
        py-3 px-5 rounded-lg shadow-md hover:bg-cyan-400 transition duration-300 cursor-pointer">
          <NavLink to={`/res/${formId}`}><h2>Form ID: {formId}</h2></NavLink>

        </div>
      ))}
      </div>
    </div>
  );
};

export default Response;
