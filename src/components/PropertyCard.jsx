import { motion } from 'framer-motion';
import { Star, MapPin, Bed, Bath, Square, Floor, Phone, Eye } from 'lucide-react';

/**
 * مكون بطاقة العقار - يعرض المعلومات الأساسية للعقار - تصميم احترافي
 * @param {Object} property - بيانات العقار
 * @param {Function} onCardClick - دالة يتم استدعاؤها عند الضغط على البطاقة
 */
const PropertyCard = ({ property, onCardClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="property-card group"
      onClick={() => onCardClick(property)}
    >
      {/* صورة العقار */}
      <div className="relative mb-6 rounded-2xl overflow-hidden">
        <img
          src={property.imageURL}
          alt={property.propertyName}
          className="w-full h-56 object-cover image-hover"
          loading="lazy"
        />
        
        {/* شارة الحالة */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          متاح
        </div>
        
        {/* شارة مميز */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          <Star className="w-3 h-3 inline mr-1" />
          مميز
        </div>
        
        {/* طبقة شفافة عند hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
        
        {/* أزرار سريعة */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-2">
            <button className="flex-1 bg-white/90 hover:bg-white text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              عرض
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* معلومات العقار الأساسية */}
      <div className="space-y-4">
        {/* اسم العقار */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 mb-2">
            {property.propertyName}
          </h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* كود الوحدة */}
        <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
          <span className="text-sm text-gray-600 font-medium">كود الوحدة:</span>
          <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-lg">
            #{property.id.toString().padStart(3, '0')}
          </span>
        </div>

        {/* تفاصيل العقار */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Square className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">المساحة</div>
              <div className="font-bold text-gray-800">
                {property.area || (property.bedrooms * 30 + Math.floor(Math.random() * 50) + 50)} م²
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Floor className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">الدور</div>
              <div className="font-bold text-gray-800">
                {property.floor || Math.floor(Math.random() * 10) + 1}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bed className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">الغرف</div>
              <div className="font-bold text-gray-800">{property.bedrooms} غرفة</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Bath className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">الحمامات</div>
              <div className="font-bold text-gray-800">{property.bathrooms} حمام</div>
            </div>
          </div>
        </div>

        {/* السعر */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-green-600 font-semibold">السعر</span>
            <span className="text-2xl font-black text-green-600">{property.price}</span>
          </div>
        </div>

        {/* أزرار العمل */}
        <div className="flex gap-3 pt-2">
          <button className="flex-1 btn-primary text-sm py-3 flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            عرض التفاصيل
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
