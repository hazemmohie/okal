import { useState } from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setOpenSidebar(true);
  };

  return (
    <>
      <header className="text-slate-300 shadow body-font lg:px-10 sticky backdrop-blur-md top-0 z-10">
        <div className="container mx-auto flex justify-between px-5 py-4 items-center">
          <a
            href="/"
            className="flex w-fit title-font font-medium items-center"
          >
            <span className="md:ml-3 text-2xl">
              Prime<span className="text-indigo-500">View</span>
            </span>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
