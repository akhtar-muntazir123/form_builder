import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
const FormDetail = () => {
  const [res,setRes]=useState([])
  const [data, setData] = useState([]);
  const [currForm, setCurrForm] = useState(null); // Use null instead of []
  const param=useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3031/forms`);
        const jsonData = await res.json();
        console.log(jsonData);
        setData(jsonData);
        // Find and set the form with id "F001"
        const selectedForm = jsonData.find((form) => form.id === param.id);
        setCurrForm(selectedForm || null);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {currForm ? (
        <div key={currForm.id} className="p-9">
          <h2 className="text-3xl my-5 font-semibold">{currForm.name}</h2>

          {/* Ensure currForm.fields exists before mapping */}
          {currForm.fields &&
            currForm.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="mb-4">
                {/* Text Input */}
                {field.type === "text" && (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    maxLength={parseInt(field.charLimit)} // Ensure it's a number
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e)=>{}}
                  />
                )}

                {/* Radio Input */}
                {field.type === "radio" && (
                  <div>
                    <p className="my-1.5">{field.placeholder}</p>
                    {field.radioOptions.map((option, optionIndex) => (
                      <label key={optionIndex} className="mr-4">
                        <input
                          type="radio"
                          name={`radio-${fieldIndex}`}
                          value={option}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/*Submit button  */}
            <button className="bg-green-500 px-5 py-3 rounded-lg text-white hover:bg-green-400">Submit</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default FormDetail;
