import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

/**
 * مكون الفوتر - تذييل الموقع مع معلومات التواصل والروابط الاجتماعية
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/50 backdrop-blur-md border-t border-white/20">
      <div className="container mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* معلومات الشركة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">
                🏠 Prime<span className="text-blue-400">View</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              منصة العقارات الرائدة التي تساعدك في العثور على العقار المثالي 
              الذي يناسب احتياجاتك وميزانيتك.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                <Facebook className="w-4 h-4 text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200"
              >
                <Twitter className="w-4 h-4 text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors duration-200"
              >
                <Instagram className="w-4 h-4 text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </motion.a>
            </div>
          </motion.div>

          {/* روابط سريعة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">روابط سريعة</h3>
            <ul className="space-y-2">
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
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
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
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">خدماتنا</h3>
            <ul className="space-y-2">
              {[
                "بيع العقارات",
                "إيجار العقارات",
                "تقييم العقارات",
                "الاستشارات العقارية",
                "إدارة العقارات"
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-300 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* معلومات التواصل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">info@primeview.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  شارع الملك فهد، الرياض، المملكة العربية السعودية
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* الخط السفلي */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} PrimeView. جميع الحقوق محفوظة. | 
            <a href="#" className="hover:text-white transition-colors duration-200 mx-2">
              سياسة الخصوصية
            </a>
            |
            <a href="#" className="hover:text-white transition-colors duration-200 mx-2">
              شروط الاستخدام
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
