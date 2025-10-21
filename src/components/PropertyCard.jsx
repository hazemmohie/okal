import { motion } from 'framer-motion';

/**
 * مكون بطاقة العقار - يعرض المعلومات الأساسية للعقار
 * @param {Object} property - بيانات العقار
 * @param {Function} onCardClick - دالة يتم استدعاؤها عند الضغط على البطاقة
 */
const PropertyCard = ({ property, onCardClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 cursor-pointer 
                 hover:bg-white/15 hover:border-white/30 transition-all duration-300
                 shadow-lg hover:shadow-xl"
      onClick={() => onCardClick(property)}
    >
      {/* صورة العقار */}
      <div className="relative mb-4 rounded-lg overflow-hidden">
        <img
          src={property.imageURL}
          alt={property.propertyName}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {/* شارة الحالة */}
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          متاح
        </div>
      </div>

      {/* معلومات العقار الأساسية */}
      <div className="space-y-3">
        {/* اسم العقار */}
        <h3 className="text-lg font-bold text-white truncate">
          {property.propertyName}
        </h3>

        {/* كود الوحدة */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">كود الوحدة:</span>
          <span className="text-sm font-semibold text-blue-300">
            #{property.id.toString().padStart(3, '0')}
          </span>
        </div>

        {/* المساحة */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">المساحة:</span>
          <span className="text-sm font-semibold text-white">
            {property.area || (property.bedrooms * 30 + Math.floor(Math.random() * 50) + 50)} م²
          </span>
        </div>

        {/* السعر */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">السعر:</span>
          <span className="text-lg font-bold text-green-400">
            {property.price}
          </span>
        </div>

        {/* الدور */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">الدور:</span>
          <span className="text-sm font-semibold text-white">
            {property.floor || Math.floor(Math.random() * 10) + 1}
          </span>
        </div>

        {/* عدد الغرف */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">الغرف:</span>
          <span className="text-sm font-semibold text-white">
            {property.bedrooms} غرفة
          </span>
        </div>

        {/* أزرار سريعة */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg 
                           text-sm font-medium transition-colors duration-200">
            عرض التفاصيل
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg 
                           text-sm font-medium transition-colors duration-200">
            📞
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
