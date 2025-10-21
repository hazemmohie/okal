import { motion } from "framer-motion";
import { BarChart3, Database, Home, Building } from "lucide-react";

/**
 * مكون التذييل - معلومات نظام إدارة البيانات
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* معلومات النظام */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">نظام إدارة العقارات</h3>
                <p className="text-sm text-gray-400">Real Estate Management System</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              نظام شامل لإدارة بيانات العقارات من ملفات Excel مع إمكانية البحث والفلترة والتصدير
            </p>
          </motion.div>

          {/* روابط سريعة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">الصفحات</h4>
            <div className="space-y-3">
              <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
                <Home className="w-4 h-4" />
                الرئيسية
              </a>
              <a href="/properties" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
                <Database className="w-4 h-4" />
                إدارة البيانات
              </a>
              <a href="/units" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
                <Building className="w-4 h-4" />
                الوحدات
              </a>
            </div>
          </motion.div>

          {/* الميزات */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">الميزات</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>• عرض البيانات من ملف Excel</div>
              <div>• البحث والفلترة المتقدمة</div>
              <div>• تصدير البيانات المفلترة</div>
              <div>• إحصائيات مفصلة</div>
              <div>• واجهة سهلة الاستخدام</div>
            </div>
          </motion.div>
        </div>

        {/* الخط السفلي */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700 mt-8 pt-6 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} نظام إدارة العقارات. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;