import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const ResponseDetail = () => {
  const [data, setData] = useState([]);
  const { id } = useParams(); // id will act as the formId
  console.log("Form ID from params:", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3031/responses`);
        const jsonData = await res.json();
        console.log("Fetched Data:", jsonData);
        setData(jsonData);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchData();
  }, []);

  const filteredResponses = data.filter(entry => entry.formId === id);
  console.log("Filtered Responses:", filteredResponses);

  // Dynamically get headers from the first item (excluding formId)
  const tableHeaders =
    filteredResponses.length > 0
      ? Object.keys(filteredResponses[0]).filter(key => key !== "formId")
      : [];

  return (
    <div className="overflow-x-auto rounded-lg shadow p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">Responses for Form ID: {id}</h2>

      {filteredResponses.length > 0 ? (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {tableHeaders.map((key, index) => (
                <th key={index} className="border px-4 py-2 text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredResponses.map((item, index) => (
              <tr key={index} className="border-t">
                {tableHeaders.map((key, i) => (
                  <td key={i} className="border px-4 py-2">
                    {item[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No responses found for this form.</p>
      )}
    </div>
  );
};

export default ResponseDetail;
