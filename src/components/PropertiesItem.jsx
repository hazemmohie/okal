// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const PropertiesItem = () => {
  // eslint-disable-next-line react/prop-types
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the Excel file from the public folder
    fetch("/properties.xlsx")
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      })
      .catch((error) => console.error("Error reading Excel file:", error));
  }, []);
  console.log(data);

  return (
    <>
      <div
        className="lg:w-1/4 md:w-2/5 max-w-[350px] w-full cursor-pointer shadow-2xl shadow-indigo-900  backdrop-blur-xl border border-white/20    rounded-lg m-4  bg-transparent   transition-transform duration-500 ease-out
        [transform-style:preserve-3d] 
        hover:[transform:rotateY(8deg)_scale(1.07)_translateZ(30px)]
        hover:shadow-indigo-700/40"
        style={{ perspective: "1000px" }}
      >
        <div className="mt-4 py-2 px-4 pb-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            In {10}
          </h3>

          <p className="mt-1">
            <b>Price: </b>
            {100} <span></span>
          </p>
          <div className="flex justify-between">
            <span className="mt-1">Bedrooms: {100}</span>
            <span className="mt-1">Bathrooms: {100}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesItem;
