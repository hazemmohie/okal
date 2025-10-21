import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function Units() {
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
  return <div className="bg-[#1F242E] h-[75vh] text-slate-300"></div>;
  // <div className="p-6 text-slate-300">
  //   <h2 className="text-xl font-bold mb-4">🏠 Properties Data</h2>

  //   <table className="min-w-full border-collapse border border-gray-300 text-sm">
  //     <thead className="bg-gray-100">
  //       <tr>
  //         {data[0] &&
  //           Object.keys(data[0]).map((key) => (
  //             <th
  //               key={key}
  //               className="border border-gray-300 px-3 py-2 text-left"
  //             >
  //               {key}
  //             </th>
  //           ))}
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {data.map((row, i) => (
  //         <tr key={i}>
  //           {Object.values(row).map((value, j) => (
  //             <td key={j} className="border border-gray-300 px-3 py-2">
  //               {String(value)}
  //             </td>
  //           ))}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // </div>
}

export default Units;
