import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, BarChart3, Database, Home, Building } from "lucide-react";

/**
 * مكون الهيدر - شريط التنقل الرئيسي لنظام إدارة البيانات
 */
const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const navItems = [
    { path: "/", label: "الرئيسية", icon: Home },
    { path: "/properties", label: "إدارة البيانات", icon: Database },
    { path: "/units", label: "الوحدات", icon: Building },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between py-4 items-center">
          {/* الشعار */}
          <motion.a
            href="/"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">نظام إدارة العقارات</h1>
              <p className="text-xs text-gray-500">Real Estate Management System</p>
            </div>
          </motion.a>

          {/* قائمة التنقل للشاشات الكبيرة */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium
                   ${isActive
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {openSidebar ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
          </button>
        </div>

        {/* القائمة الجانبية للشاشات الصغيرة */}
        {openSidebar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpenSidebar(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
                     ${isActive
                        ? 'bg-blue-100 text-blue-600 font-semibold'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
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
