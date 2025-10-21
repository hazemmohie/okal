import { motion } from "framer-motion";
import { ArrowRight, Home, MapPin, Star, Shield, Award, Users } from "lucide-react";

/**
 * مكون Hero - القسم الرئيسي في الصفحة الرئيسية - تصميم احترافي
 */
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* خلفية متدرجة مع عناصر زخرفية */}
      <div className="absolute inset-0">
        {/* عناصر زخرفية متحركة */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float"></div>
        
        {/* خطوط زخرفية */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
          <div className="absolute top-3/4 right-1/4 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* المحتوى النصي */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-right space-y-8"
          >
            {/* العنوان الرئيسي */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                منصة العقارات الرائدة
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white heading-primary">
                عقارات
                <br />
                <span className="text-gradient bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  راقية
                </span>
                <br />
                للمشترين المميزين
              </h1>
            </motion.div>
            
            {/* الوصف */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-body"
            >
              اكتشف الحياة الفاخرة في أرقى مستوياتها. مجموعة من العقارات الراقية 
              في أكثر المواقع المرغوبة، توفر الرفاهية الحضرية والعيش الهادئ.
            </motion.p>

            {/* إحصائيات سريعة */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">500+</div>
                <div className="text-blue-200 text-sm font-medium">عقار متاح</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">1000+</div>
                <div className="text-blue-200 text-sm font-medium">عميل راضي</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">50+</div>
                <div className="text-blue-200 text-sm font-medium">موقع مميز</div>
              </div>
            </motion.div>

            {/* أزرار العمل */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <button className="btn-primary flex items-center justify-center gap-3 group">
                <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                تصفح العقارات
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="btn-outline flex items-center justify-center gap-3 group">
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                عرض الخريطة
              </button>
            </motion.div>

            {/* ميزات إضافية */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8"
            >
              <div className="flex items-center gap-2 text-blue-200">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">ضمان الجودة</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">شهادات معتمدة</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">دعم 24/7</span>
              </div>
            </motion.div>
          </motion.div>

          {/* الصورة */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/create a professiona.png"
                alt="عقار راقي"
                className="w-full h-[500px] object-cover image-hover"
              />
              
              {/* طبقة شفافة مع معلومات */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* معلومات العقار */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-effect-dark rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <span className="text-white font-bold text-lg">عقار مميز</span>
                    <div className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      متاح الآن
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">شقة فاخرة في قلب المدينة</h3>
                  <p className="text-blue-200 text-sm leading-relaxed mb-4">
                    إطلالة رائعة على المدينة مع جميع المرافق الحديثة
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-2xl">$850,000</div>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* عناصر زخرفية حول الصورة */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce-gentle"></div>
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float"></div>
            <div className="absolute top-1/2 -left-8 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce-gentle"></div>
          </motion.div>
        </div>
      </div>

      {/* مؤشر التمرير */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-sm font-medium">مرر للأسفل</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
