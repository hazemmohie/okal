import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Home, Building, BarChart3, Phone, Mail } from "lucide-react";

/**
 * مكون الهيدر - شريط التنقل الرئيسي للموقع - تصميم احترافي
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
        className="glass-effect border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="container-custom flex justify-between py-4 items-center">
          {/* الشعار */}
          <motion.a
            href="/"
            className="flex w-fit title-font font-medium items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl font-black text-gray-800">
              🏠 Prime<span className="text-gradient">View</span>
            </span>
          </motion.a>

          {/* قائمة التنقل للشاشات الكبيرة */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold
                   ${isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                   }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* معلومات التواصل للشاشات الكبيرة */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">info@primeview.com</span>
            </div>
          </div>

          {/* زر القائمة للشاشات الصغيرة */}
          <button
            onClick={handleSidebar}
            className="md:hidden p-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200"
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
            className="md:hidden glass-effect border-t border-gray-200"
          >
            <nav className="flex flex-col p-6 space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpenSidebar(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-bold
                     ${isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                     }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
              
              {/* معلومات التواصل للشاشات الصغيرة */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">info@primeview.com</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};

export default Header;
