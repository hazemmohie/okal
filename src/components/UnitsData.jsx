import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function UnitsData() {
  const [data, setData] = useState([]);
  // const [copiedText, setCopiedtext] = useState();
  const [copiedIndex, setCopiedIndex] = useState(null);

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

  const handleCopy = async (unit, index) => {
    try {
      // preferred modern API
      const textToCopy = JSON.stringify(unit, null, 2);
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedIndex(index); // mark only this card as copied
        setTimeout(() => setCopiedIndex(null), 2000);
      });
      // reset after 2s
    } catch (err) {
      // fallback for older browsers
      // try {
      //   const textarea = document.createElement("textarea");
      //   textarea.value = String(data);
      //   textarea.style.position = "fixed";
      //   textarea.style.left = "-9999px";
      //   document.body.appendChild(textarea);
      //   textarea.select();
      //   document.execCommand("copy");
      //   document.body.removeChild(textarea);
      //   setCopied(true);
      //   setTimeout(() => setCopied(false), 1500);
      // } catch (e) {
      //   console.error("Copy failed", e);
      // }
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    area: "",
    floor: "",
    price: "",
    compound: "",
    rooms: "",
  });

  // 🔹 Handle dropdown change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Unique values for each dropdown
  const uniqueValues = {
    area: [...new Set(data.map((item) => item["Area"]))],
    floor: [...new Set(data.map((item) => item["Floor"]))],
    price: [...new Set(data.map((item) => item["Price"]))],
    compound: [...new Set(data.map((item) => item["Compound"]))],
    rooms: [...new Set(data.map((item) => item["Rooms"]))],
  };

  // 🔹 Filtering logic
  const filteredData = data.filter((item) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      item["Client Name"]?.toLowerCase().includes(term) ||
      item["Property Code"]?.toLowerCase().includes(term) ||
      item["Compound"]?.toLowerCase().includes(term) ||
      item["Type"]?.toLowerCase().includes(term);

    const matchesArea =
      !filters.area || Number(item["Area"]) <= Number(filters.area);

    const matchesPrice =
      !filters.price || Number(item["Price"]) <= Number(filters.price);

    const matchesFloor =
      !filters.floor || item["Floor"] === Number(filters.floor);

    const matchesRooms =
      !filters.rooms || Number(item["Rooms"]) <= Number(filters.rooms);

    const matchesCompound =
      !filters.compound ||
      item["Compound"]?.toLowerCase() === filters.compound.toLowerCase();

    return (
      matchesSearch &&
      matchesArea &&
      matchesFloor &&
      matchesRooms &&
      matchesPrice &&
      matchesCompound
    );
  });

  console.log(searchTerm);
  return (
    <div>
      <section className="text-slate-300 body-font">
        <div className="container px-5 py-20 w-[100%] m-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Discover Our Properties
          </h2>
          {/* 🔍 Search Input */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search by name, code, or type..."
              className="p-3 rounded-xl bg-slate-800 border border-slate-500 w-[60%] placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 🧩 Filters with Selects */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {["area", "floor", "rooms", "price", "compound"].map((key) => (
              <select
                key={key}
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                className="p-2 rounded-lg bg-slate-800 border border-slate-500 text-white w-40"
              >
                <option value="">
                  Select {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
                {uniqueValues[key]
                  .filter((v) => v !== undefined && v !== "")
                  .map((value, i) => (
                    <option key={i} value={value}>
                      {value}
                    </option>
                  ))}
              </select>
            ))}
          </div>

          <div className="flex flex-wrap justify-center">
            {" "}
            {filteredData.map((unit, index) => (
              <div
                key={index}
                className="lg:w-1/4 md:w-2/5 max-w-[350px] w-full cursor-pointer shadow-2xl shadow-indigo-900  backdrop-blur-xl border border-white/20    rounded-lg m-4  bg-transparent  
        hover:shadow-indigo-700/40"
                style={{ perspective: "1000px" }}
              >
                <div className="mt-4 py-2 px-4 pb-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font flex justify-between items-center mb-4">
                    <span className="font-bold">
                      Property Code : {data[index]["Property Code"]}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(unit, index)}
                      aria-label={`Copy ${String("Heeeeeeeeeloo")}`}
                      className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors `}
                    >
                      {copiedIndex === index ? "Copied!" : "Copy"}
                      {/* Copy SVG icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>

                      {/* feedback text (small) */}
                      <span className="text-xs">
                        {/* {copied ? "Copied!" : "Copy"} */}
                      </span>
                    </button>
                  </h3>
                  <p className="mt-1">
                    <b>
                      <span className="font-bold">Type : </span>{" "}
                      {data[index].Type}
                    </b>
                  </p>
                  <p className="mt-1">
                    <b>
                      <span className="font-bold">Finishing : </span>{" "}
                      {data[index].Finishing}
                    </b>
                  </p>
                  <div className="flex justify-start flex-wrap gap-4">
                    <span className="mt-1">
                      <span className="font-bold">Floor : </span>{" "}
                      {data[index].Floor}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">Rooms : </span>{" "}
                      {data[index].Rooms}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">Bathrooms : </span>{" "}
                      {data[index].Bathrooms}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">Area : </span>{" "}
                      {data[index].Area} sq
                    </span>

                    <span className="mt-1">
                      <span className="font-bold">Date Aded : </span>{" "}
                      {data[index]["Date Added"]}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">Status : </span>{" "}
                      {data[index].Status}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">Unit Type : </span>{" "}
                      {data[index]["Unit Type"]}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">Compound : </span>{" "}
                      {data[index].Compound}
                    </span>
                    <span className="mt-1">Price : {data[index].Price}</span>
                    <span className="mt-1">
                      <span className="font-bold">Down Payment : </span>{" "}
                      {data[index]["Down Payment"]}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">Duration (months) : </span>{" "}
                      {data[index]["Duration (months)"]}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">Monthly Installment : </span>{" "}
                      {data[index]["Monthly Installment"]}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">
                        Number of Media Files :{" "}
                      </span>{" "}
                      {data[index]["Number of Media Files"]}
                    </span>
                    <span className="mt-1">
                      <span className="font-bold">Notes : </span>{" "}
                      {data[index].Notes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default UnitsData;
