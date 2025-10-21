import { motion } from "framer-motion";
import Hero from "../components/Hero";
import FeaturedProperty from "../components/FeaturedProperty";

/**
 * الصفحة الرئيسية - تعرض المحتوى الرئيسي للموقع مع تأثيرات بصرية محسنة
 */
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <FeaturedProperty />
      </motion.div>
    </div>
  );
};

export default Home;
