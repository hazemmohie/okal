import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Home, Building, BarChart3, User } from "lucide-react";

/**
 * مكون الهيدر - شريط التنقل الرئيسي للموقع
 */
const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const navItems = [
    { path: "/", label: "الرئيسية", icon: Home },
    { path: "/properties", label: "العقارات", icon: Building },
    { path: "/units", label: "الوحدات", icon: BarChart3 },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
      >
        <div className="container mx-auto flex justify-between px-5 py-4 items-center">
          {/* الشعار */}
          <motion.a
            href="/"
            className="flex w-fit title-font font-medium items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="md:ml-3 text-2xl font-bold text-white">
              🏠 Prime<span className="text-blue-400">View</span>
            </span>
          </motion.a>

          {/* قائمة التنقل للشاشات الكبيرة */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* زر القائمة للشاشات الصغيرة */}
          <button
            onClick={handleSidebar}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            {openSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* القائمة الجانبية للشاشات الصغيرة */}
        {openSidebar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpenSidebar(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};

export default Header;
