import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "./RealEstateContext";
import PropertyCard from "./PropertyCard";
import { Star, TrendingUp, Award } from "lucide-react";

/**
 * مكون العقارات المميزة - يعرض أفضل العقارات المتاحة
 */
const FeaturedProperty = () => {
  const { propertydata } = useContext(AppContext);
  
  // الحصول على أفضل 6 عقارات (أعلى الأسعار)
  const featuredProperties = propertydata
    .sort((a, b) => b.priceInLakhs - a.priceInLakhs)
    .slice(0, 6);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              العقارات المميزة
            </h2>
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            اكتشف مجموعة مختارة من أفضل العقارات المتاحة، 
            تم اختيارها بعناية لتوفر لك تجربة سكنية استثنائية
          </p>
        </motion.div>

        {/* إحصائيات سريعة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-gray-300">معدل الرضا</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-300">عقار متاح</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">4.9</div>
            <div className="text-gray-300">تقييم العملاء</div>
          </div>
        </motion.div>

        {/* شبكة العقارات المميزة */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* شارة مميز */}
              <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                مميز
              </div>
              
              <PropertyCard
                property={property}
                onCardClick={() => {
                  // يمكن إضافة منطق فتح الشريط الجانبي هنا
                  console.log('تم الضغط على العقار:', property.propertyName);
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* زر عرض المزيد */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                           text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 
                           hover:scale-105 shadow-lg hover:shadow-blue-500/25">
            عرض جميع العقارات
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
