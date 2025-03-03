import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addField } from "../src/redux/slice/formSlice";
const Admin = () => {
  const fieldType = useSelector((state) => state.form.fieldType);
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

  return (
    <div className="h-screen">
      <h1 className="flex w-full justify-center text-5xl p-3 mb-5">Admin</h1>
      <button className="absolute top-[25px] right-[5%] bg-green-400 px-4 py-2 text-white rounded-md">
        View Responses
      </button>
      <div className="flex flex-row h-[80vh]">
        {/* left panel */}
        <div className="bg-[#f9f9f9] w-1/5 flex flex-col justify-start m-2 rounded-sm">
          <h3 className="text-center my-4 text-2xl">Form Components</h3>
          <hr className="w-full" />
          {types.map((type, typeIndex) => (
            <button
              key={typeIndex}
              className="relative h-14 flex flex-row justify-start items-center focus:bg-[#d7e8ff] focus:after:content-['\2059'] focus:after:text-[#1f6b9a] focus:after:absolute focus:after:right-4 focus:after:text-2xl"
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
        </div>

        {/* middle panel  */}
        <div className=" w-3/5 flex flex-col justify-start m-2 rounded-sm outline-1 outline-dashed">
          <div
            className="bg-[#f9f9f9] w-full flex flex-col justify-startrounded-xl h-fit p-4 mb-5"
            draggable="true"
          >
            <label className="font-semibold">
              Form Name<i className="fa-solid fa-pencil ml-2"></i>
            </label>
            <input
              type="text"
              className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
            />
          </div>
          <div className="bg-[#f9f9f9] w-full flex flex-col justify-startrounded-xl h-fit p-4 mb-5">
            <label className="font-semibold">Your Name</label>
            <input
              type="text"
              className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
            />
          </div>
        </div>

        {/* right panel */}

        <div className="bg-[#f9f9f9] w-1/5 flex flex-col justify-start m-2 rounded-xl">
          <h3 className="text-center my-4 text-2xl">Field Setting</h3>
          <hr className="w-full" />
          {/* choosing different fields */}

          {/* text */}
          {fieldType == "text" ? (
            <div className="p-3">
              <label className="mt-3">Label name</label>
              <input
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 mb-3 rounded-sm"
              />

              <label className="mt-3">Placeholder name</label>
              <input
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
              />
            </div>
          ) : null}

          {/* number */}
          {fieldType == "number" ? (
            <div className="p-3">
              <label className="">Enter Number</label>
              <input
                placeholder="placeholder"
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
              />
            </div>
          ) : null}

          {/* radio */}
          {fieldType == "radio" ? (
            <div className="p-3">
              <label className="">Enter Radio</label>
              <input
                placeholder="placeholder"
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
              />
            </div>
          ) : null}

          {/* date */}
          {fieldType == "date" ? (
            <div className="p-3">
              <label className="">date </label>
              <input
                placeholder="placeholder"
                type="text"
                className="px-1 h-7 w-full bg-white mt-1 rounded-sm"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Admin;
