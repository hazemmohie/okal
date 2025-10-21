import { motion } from "framer-motion";
import Hero from "../components/Hero";
import FeaturedProperty from "../components/FeaturedProperty";

/**
 * الصفحة الرئيسية - تعرض المحتوى الرئيسي للموقع مع تأثيرات بصرية محسنة - تصميم احترافي
 */
const Home = () => {
  return (
    <div className="min-h-screen gradient-bg">
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
