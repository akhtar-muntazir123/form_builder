import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addField } from "../src/redux/slice/formSlice";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";

const Admin = () => {
  const fieldType = useSelector((state) => state.form.fieldType);
  const [formName, setFormName] = useState("");

  //we will use this to map the form item
  const [formItems, setFormItems] = useState([]);

  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);

  const [radioOption, setRadioOption] = useState(["", "", "", ""]);
  const handleRadioChange = (index, value) => {
    const newOption = [...radioOption];
    newOption[index] = value;
    setRadioOption(newOption);
  };

  const types = [
    {
      type: "text",
      label: "Text Field",
      icon: <i className="fa-solid fa-font focus:text-light"></i>,
    },
    {
      type: "number",
      label: "Number Field",
      icon: <i className="fa-solid fa-hashtag"></i>,
    },
    {
      type: "radio",
      label: "Radio Button",
      icon: <i className="fa-solid fa-circle-dot"></i>,
    },
    {
      type: "date",
      label: "Date Field",
      icon: <i className="fa-solid fa-calendar-days"></i>,
    },
  ];
  const dispatch = useDispatch();

  console.log("fieldType", fieldType);

  //code for adding field

  const handleAddField = () => {
    // handling text and numbers
    if (fieldType == "text" || fieldType == "number") {
      if (fieldType && placeholder && label) {
        setFormItems([
          ...formItems,
          { type: fieldType, label: label, placeholder: placeholder },
        ]);
        console.log("form items", formItems);
      }
    }
    //  handling radio
    else if (fieldType == "radio") {
      if (radioOption.length > 0 && label) {
        setFormItems([
          ...formItems,
          { type: fieldType, label: label, radioOptions: radioOption },
        ]);
        setRadioOption(["", "", "", ""]);
      }
      console.log("form items", formItems);
    }

    // handling date
    if (fieldType == "date") {
      if (label) {
        setFormItems([...formItems, { type: fieldType, label: label }]);
        console.log("form items", formItems);
      }
    }

    console.log("label", label);
    console.log("placeholder", placeholder);
    setPlaceholder("");
    setLabel("");
    console.log(radioOption);
  };

  // deleting item
  const deleteItem = (index) => {
    console.log("deleting item at index ", index);
    setFormItems(formItems.filter((_, i) => i != index));
  };
  //

  // code for handeling drop functionality
  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDrop = (index) => {
    if (draggedItem !== null) {
      const newItems = [...formItems];
      const [movedItem] = newItems.splice(draggedItem, 1);
      newItems.splice(index, 0, movedItem);
      setFormItems(newItems);
      setDraggedItem(null);
    }
  };
  //

  const handleSave = async (prev) => { 
    if (formName) {
      if (confirm("Confirm for submission") == true) {
        // Check if an entry with type "name" already exists
      
  
        // Generate a unique response ID (for example, "F1234")
        const generateResponseId = () =>
          `F${Math.floor(1000 + Math.random() * 9000)}`;
  
        const submissionData = {
          id: generateResponseId(),
          name: formName,
          fields: formItems,
        };
  
        console.log(JSON.stringify(submissionData));
  
        // Submitting the response
        try {
          const response = await fetch("http://localhost:3031/forms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submissionData),
          });
  
          if (response.ok) {
            alert("Form saved successfully!");
          } else {
            alert("Error saving form. Please try again.");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          alert("An error occurred while saving the form.");
        }
      }
    }
  };
  

  return (
    <div className="h-screen">
      <h1 className="flex w-full justify-center text-5xl p-3 mb-5">Admin</h1>
      <NavLink to="/res"> <button className="absolute cursor-pointer top-[25px] right-[5%] bg-green-400 px-4 py-2 text-white rounded-md">
      View Responses
      </button></NavLink>
      <div className="flex flex-row h-[80vh]">
        {/* left panel */}
        <div className="bg-[#dbdbdb] w-1/5 relative flex flex-col justify-start m-2 rounded-sm">
          <h3 className="text-center my-4 text-2xl">Form Components</h3>
          <hr className="w-full" />
          {types.map((type, typeIndex) => (
            <button
              key={typeIndex}
              className="relative h-14 flex flex-row justify-start items-center hover:bg-[#d7e8ff]  focus:bg-[#d7e8ff] focus:after:content-['\2059'] focus:after:text-[#1f6b9a] focus:after:absolute focus:after:right-4 focus:after:text-2xl"
              onClick={() => {
                dispatch(addField(type.type));
              }}
            >
              <div className="h-8 w-8 text-2xl  mx-4 bg-white rounded-xs text-[#1f6b9a] ">
                {type.icon}
              </div>
              <p className="text-xl">{type.label}</p>
            </button>
          ))}
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              bottom: "40px",
              left: "50%",
              transform: "translate(-50%, 50%)",
            }}
            onClick={handleSave}
          >
            Save Form
          </Button>
        </div>

        {/* middle panel  */}
        <div className=" w-3/5 flex flex-col justify-start m-2 rounded-sm outline-1 outline-dashed overflow-y-scroll">
          <div
            className="bg-[#dbdbdb] w-full flex flex-col justify-startrounded-xl h-fit p-4 mb-5"
            draggable="true"
          >
            <label className="font-semibold">
              Form Name<i className="fa-solid fa-pencil ml-2"></i>
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
            />
            <div
              style={{
                width: "100%",
              }}
            >
              {formItems.map((formItem, index) =>
                formItem.type != "name" ? (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    style={{
                      padding: " 0px 10px 20px 10px",
                      marginTop: "10px",
                      cursor: "move",
                      position: "relative",
                    }}
                    // className="bg-red-300"
                  >
                    <br />

                    {/* for text */}
                    {formItem.type === "text" && (
                      <div key={index} className="bg-grey-100">
                        <label className="font-semibold">
                          {formItem.label}
                        </label>
                        
                        <button
                          className="absolute right-1.5 text-white bg-red-400 rounded-sm p-0.5 top-2"
                          onClick={() => deleteItem(index)}
                        >
                          <CloseIcon />
                        </button>
                        <input
                          placeholder={formItem.placeholder}
                          type="text"
                          className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
                        />
                      </div>
                    )}

                    {/* for number */}
                    {formItem.type === "number" && (
                      <div key={index}>
                        <label className="font-semibold">
                          {formItem.label}
                        </label>
                        {index}
                        <button
                          className="absolute right-1.5 text-white bg-red-400 rounded-sm p-0.5 top-2"
                          onClick={() => deleteItem(index)}
                        >
                          <CloseIcon />
                        </button>
                        <input
                          placeholder={formItem.placeholder}
                          type="text"
                          className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
                        />
                      </div>
                    )}

                    {/* for radio */}
                    {formItem.type === "radio" && (
                      <div key={index}>
                        <label className="font-semibold">
                          {formItem.label}
                        </label>
                        {index}
                        <button
                          className="absolute right-1.5 text-white bg-red-400 rounded-sm p-0.5 top-2"
                          onClick={() => deleteItem(index)}
                        >
                          <CloseIcon />
                        </button>
                        {formItem.radioOptions?.map(
                          (option, optionIndex) =>
                            option != "" && (
                              <label key={optionIndex} className="block">
                                <input
                                  type="radio"
                                  name={`radio-group-${index}`} // Ensure radio buttons are grouped
                                  value={option}
                                  className="mr-2"
                                />
                                {option}
                              </label>
                            )
                        )}
                      </div>
                    )}

                    {/* for date */}
                    {formItem.type === "date" && (
                      <div key={index}>
                        <label className="font-semibold">
                          {formItem.label}
                        </label>
                        {index}
                        <button
                          className="absolute right-1.5 text-white bg-red-400 rounded-sm p-0.5 top-2"
                          onClick={() => deleteItem(index)}
                        >
                          <CloseIcon />
                        </button>
                        <input
                          placeholder={formItem.placeholder}
                          type="date"
                          className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
                        />
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* right panel */}

        <div className="bg-[#dbdbdb] w-1/5 flex flex-col justify-start m-2 rounded-xl relative overflow-hidden">
          <h3 className="text-center my-4 text-2xl">Field Setting</h3>
          <hr className="w-full" />
          {/* choosing different fields */}

          {/* text */}
          {fieldType == "text" ? (
            <div className="p-3">
              <label className="mt-3">Enter text label</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 mb-3 rounded-sm"
              />

              <label className="mt-3">Placeholder name</label>
              <input
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
              />
            </div>
          ) : null}

          {/* number */}
          {fieldType == "number" ? (
            <div className="p-3">
              <label className="">Enter Number label</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 mb-1.5 rounded-sm"
              />
              <label className="mt-3"> Label Placeholder</label>
              <input
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
              />
            </div>
          ) : null}

          {/* radio */}
          {fieldType == "radio" ? (
            <div className="p-3">
              <label className="">Enter Radio label</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 mb-1.5 rounded-sm"
              />
              <label className="mt-3">Add Fields :-</label>
              <br />
              {/* <AddIcon onClick={()=>radioOption<=4&&setRadioOption([...radioOption,""])}/>
                <RemoveIcon onClick={()=>setRadioOption(radioOption.slice(0, -1))}/> */}
              {radioOption.map((option, index) => (
                <div key={index}>
                  <label className="mt-1">Option {index + 1}</label>
                  <input
                    type="text"
                    className="p-1 h-6 w-full bg-white mt-1 rounded-sm"
                    value={option}
                    onChange={(e) => handleRadioChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ) : null}

          {/* date */}
          {fieldType === "date" ? (
            <div className="p-3">
              <label className="">Date label name </label>

              <input
                placeholder="placeholder"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
              />
            </div>
          ) : null}

          <button
            className="bg-green-300 text-white hover:bg-green-400 absolute bottom-0 p-3 w-full"
            onClick={handleAddField}
          >
            Add field
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
