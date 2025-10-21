import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Clock, Shield } from "lucide-react";

/**
 * مكون الفوتر - تذييل الموقع مع معلومات التواصل والروابط الاجتماعية - تصميم احترافي
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gradient-bg-dark border-t border-white/20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* معلومات الشركة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center">
              <span className="text-3xl font-black text-white">
                🏠 Prime<span className="text-blue-400">View</span>
              </span>
            </div>
            <p className="text-gray-300 text-body leading-relaxed">
              منصة العقارات الرائدة التي تساعدك في العثور على العقار المثالي 
              الذي يناسب احتياجاتك وميزانيتك مع ضمان الجودة والشفافية.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200"
              >
                <Facebook className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-pink-600 hover:bg-pink-700 rounded-xl transition-colors duration-200"
              >
                <Instagram className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </motion.a>
            </div>
          </motion.div>

          {/* روابط سريعة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">روابط سريعة</h3>
            <ul className="space-y-3">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "العقارات", href: "/properties" },
                { label: "الوحدات", href: "/units" },
                { label: "من نحن", href: "#about" },
                { label: "اتصل بنا", href: "#contact" }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-body font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* خدماتنا */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">خدماتنا</h3>
            <ul className="space-y-3">
              {[
                "بيع العقارات",
                "إيجار العقارات",
                "تقييم العقارات",
                "الاستشارات العقارية",
                "إدارة العقارات"
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-300 text-body font-medium">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* معلومات التواصل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">تواصل معنا</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">+1 (555) 123-4567</div>
                  <div className="text-gray-400 text-sm">اتصل بنا الآن</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">info@primeview.com</div>
                  <div className="text-gray-400 text-sm">راسلنا عبر البريد</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">شارع الملك فهد</div>
                  <div className="text-gray-400 text-sm">الرياض، المملكة العربية السعودية</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">24/7</div>
                  <div className="text-gray-400 text-sm">خدمة العملاء</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* الخط السفلي */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">موقع آمن ومحمي</span>
            </div>
            
            <p className="text-gray-400 text-sm text-center">
              © {currentYear} PrimeView. جميع الحقوق محفوظة. | 
              <a href="#" className="hover:text-white transition-colors duration-200 mx-2">
                سياسة الخصوصية
              </a>
              |
              <a href="#" className="hover:text-white transition-colors duration-200 mx-2">
                شروط الاستخدام
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
