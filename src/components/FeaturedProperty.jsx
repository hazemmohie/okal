// import PropertiesItem from "./PropertiesItem";
// import { Link } from "react-router-dom";
import { useState } from "react";
import SwitchingFiles from "./SwitchingFiles";
import UnitsData from "./UnitsData";
import Clients from "./Clients";

const Property = () => {
  const [bgFileColor, setBgFileColor] = useState("Units");
  return (
    <>
      <SwitchingFiles
        bgFileColor={bgFileColor}
        setBgFileColor={setBgFileColor}
      />
      {bgFileColor == "Units" ? <UnitsData /> : <Clients />}
    </>
  );
};

export default Property;
