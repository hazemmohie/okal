import { motion } from "framer-motion";
import { ArrowRight, Home, MapPin, Star } from "lucide-react";

/**
 * مكون Hero - القسم الرئيسي في الصفحة الرئيسية
 */
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* خلفية متدرجة */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>
      
      {/* عناصر زخرفية */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* المحتوى النصي */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              عقارات راقية
              <br />
              <span className="text-blue-400">للمشترين المميزين</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              اكتشف الحياة الفاخرة في أرقى مستوياتها. مجموعة من العقارات الراقية 
              في أكثر المواقع المرغوبة، توفر الرفاهية الحضرية والعيش الهادئ.
            </motion.p>

            {/* إحصائيات سريعة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">500+</div>
                <div className="text-gray-300 text-sm">عقار متاح</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">1000+</div>
                <div className="text-gray-300 text-sm">عميل راضي</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-gray-300 text-sm">موقع مميز</div>
              </div>
            </motion.div>

            {/* أزرار العمل */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl 
                               font-semibold transition-all duration-200 flex items-center justify-center gap-2
                               hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                <Home className="w-5 h-5" />
                تصفح العقارات
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl 
                               font-semibold transition-all duration-200 flex items-center justify-center gap-2
                               backdrop-blur-md border border-white/20">
                <MapPin className="w-5 h-5" />
                عرض الخريطة
              </button>
            </motion.div>
          </motion.div>

          {/* الصورة */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/create a professiona.png"
                alt="عقار راقي"
                className="w-full h-96 object-cover"
              />
              {/* طبقة شفافة مع معلومات */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">عقار مميز</span>
                  </div>
                  <p className="text-gray-200 text-sm">
                    شقة فاخرة في قلب المدينة مع إطلالة رائعة
                  </p>
                </div>
              </div>
            </div>
            
            {/* عناصر زخرفية حول الصورة */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
