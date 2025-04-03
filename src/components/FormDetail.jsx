import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
const FormDetail = () => {
  const [res, setRes] = useState({});
  const [data, setData] = useState([]);
  const [currForm, setCurrForm] = useState(null); // Use null instead of []
  const param = useParams();

  // Generate a unique response ID (for example, "RES005")
  const generateResponseId = () =>
    `RES${Math.floor(1000 + Math.random() * 9000)}`;

  // Handle text input change
  const handleChange = (id, value) => {
    setRes((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    console.log(res);
  };
  // Handle form submission
  const handleSubmit = async () => {
    console.log("response:", res);
    // You can send formData to an API or process it further
    const submissionData = {
      id: generateResponseId(), // Unique response ID
      ...res, // Spread responses directly
      formId: currForm.id, // Include form ID
    };
    try {
      const response = await fetch("http://localhost:3031/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        setRes((prev) => {
          const clearedResponses = {};
          Object.keys(prev).forEach((key) => {
            clearedResponses[key] = ""; // Clear inputs after submission
          });
          return clearedResponses;
        });
      } else {
        alert("Error submitting form.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

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
                {field.type === "text" && (<>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e) =>
                      handleChange(field.placeholder, e.target.value)
                    }
                  />
                </>
                 
                )}
                {/* Number Input */}
                {field.type === "number" && (<>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    maxLength={parseInt(field.charLimit)} // Ensure it's a number
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e) =>
                      handleChange(field.placeholder, e.target.value)
                    }
                  />
                </>
                 
                )}

                {/* Date Input */}
                {field.type === "date" && (<>
                  <input
                    type="date"
                    placeholder={field.placeholder}
                    className="w-1/5 p-2 border border-gray-300 rounded"
                    onChange={(e) =>
                      handleChange(field.placeholder, e.target.value)
                    }
                  />
                </>
                 
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
                          onChange={(e) =>
                            handleChange(field.placeholder, e.target.value)
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

          {/*Submit button  */}
          <button
            className="bg-green-500 px-5 py-3 rounded-lg text-white hover:bg-green-400"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default FormDetail;
