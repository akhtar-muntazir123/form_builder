import React from "react";


const Form1 = () => {
  const [data, setData] = useState([]);
  const [currForm, setCurrForm] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3031/forms");
        const jsonData = await res.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {data.length > 0 &&
        data.map((form, formIndex) =>
          form.id == "F001" ? (
            <div key="formIndex">
              <h2>{form.name}</h2>

              {/* select  the required*/}
            { const selectedForm = data.find((form) => form.id === "F001");
            setCurrForm(selectedForm)}


              {currForm.fields.map((field, fieldIndex) => {
                <div key={fieldIndex} className="mb-4">
                  {/* Text Input */}
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      maxLength={field.charLimit}
                      pattern={field.regex}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  )}

                  {/* Radio Input */}
                  {field.type === "radio" && (
                    <div>
                      <p className="font-medium">{field.placeholder}</p>
                      {field.radioOptions.map((option, optionIndex) => (
                        <label key={optionIndex} className="mr-4">
                          <input
                            type="radio"
                            name={`radio-${formIndex}-${fieldIndex}`}
                            value={option}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>;
              })}
            </div>
          ) : null
        )}
    </>
  );
};

export default Form1;
