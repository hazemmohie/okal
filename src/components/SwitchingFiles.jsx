function SwitchingFiles({ bgFileColor, setBgFileColor }) {
  return (
    <div className="flex justify-center items-center">
      {" "}
      <div className=" border border-indigo-700 rounded">
        <button
          onClick={() => {
            setBgFileColor("Units");
          }}
          className={`inline-flex text-white ${
            bgFileColor == "Units" ? "bg-indigo-500" : "bg-[#1F242E]"
          }  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600  text-lg`}
        >
          Units
        </button>
        <button
          onClick={() => {
            setBgFileColor("Clients");
          }}
          className={`inline-flex text-white  ${
            bgFileColor == "Clients" ? "bg-indigo-500" : "bg-[#1F242E]"
          } border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 text-lg`}
        >
          Clients
        </button>
      </div>
    </div>
  );
}

export default SwitchingFiles;
