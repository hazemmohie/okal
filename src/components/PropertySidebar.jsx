import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Mail, Calendar, Home, Users, Car } from 'lucide-react';

/**
 * مكون الشريط الجانبي - يعرض التفاصيل الكاملة للعقار
 * @param {Object} property - بيانات العقار المحدد
 * @param {Boolean} isOpen - حالة فتح/إغلاق الشريط الجانبي
 * @param {Function} onClose - دالة إغلاق الشريط الجانبي
 */
const PropertySidebar = ({ property, isOpen, onClose }) => {
  if (!property) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* خلفية شفافة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* الشريط الجانبي */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-xl 
                     border-l border-white/20 shadow-2xl z-50 overflow-y-auto"
          >
            {/* رأس الشريط الجانبي */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-white/20 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">تفاصيل العقار</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* محتوى الشريط الجانبي */}
            <div className="p-4 space-y-6">
              {/* صورة العقار الرئيسية */}
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={property.imageURL}
                  alt={property.propertyName}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
                  <span className="text-sm font-medium">كود الوحدة: #{property.id.toString().padStart(3, '0')}</span>
                </div>
              </div>

              {/* معلومات أساسية */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">{property.propertyName}</h3>
                
                {/* السعر */}
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-semibold">السعر</span>
                    <span className="text-2xl font-bold text-green-400">{property.price}</span>
                  </div>
                </div>

                {/* تفاصيل العقار */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Home className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">نوع الوحدة</span>
                    </div>
                    <span className="text-white font-semibold">شقة</span>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">الحالة</span>
                    </div>
                    <span className="text-green-400 font-semibold">متاح للبيع</span>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-300">عدد الغرف</span>
                    </div>
                    <span className="text-white font-semibold">{property.bedrooms} غرفة</span>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Car className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-gray-300">الحمامات</span>
                    </div>
                    <span className="text-white font-semibold">{property.bathrooms} حمام</span>
                  </div>
                </div>

                {/* تفاصيل إضافية */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
                    تفاصيل إضافية
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">المساحة:</span>
                      <span className="text-white font-medium">
                        {property.area || (property.bedrooms * 30 + Math.floor(Math.random() * 50) + 50)} متر مربع
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">الدور:</span>
                      <span className="text-white font-medium">
                        {property.floor || Math.floor(Math.random() * 10) + 1}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">التشطيب:</span>
                      <span className="text-white font-medium">
                        {property.finishing || 'سوبر لوكس'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">نوع الوحدة:</span>
                      <span className="text-white font-medium">
                        {property.type || 'شقة'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">الكمبوند:</span>
                      <span className="text-white font-medium">
                        {property.location}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">الحالة:</span>
                      <span className="text-white font-medium">
                        {property.status || 'متاح'}
                      </span>
                    </div>
                    
                    {property.downPayment && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">الدفعة الأولى:</span>
                        <span className="text-white font-medium">
                          ${property.downPayment}
                        </span>
                      </div>
                    )}
                    
                    {property.monthlyInstallment && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">القسط الشهري:</span>
                        <span className="text-white font-medium">
                          ${property.monthlyInstallment}
                        </span>
                      </div>
                    )}
                    
                    {property.duration && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">مدة التقسيط:</span>
                        <span className="text-white font-medium">
                          {property.duration} شهر
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* أزرار العمل */}
                <div className="space-y-3 pt-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg 
                                   font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    تواصل معنا
                  </button>
                  
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg 
                                   font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    عرض على الخريطة
                  </button>
                  
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg 
                                   font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    إرسال بالبريد الإلكتروني
                  </button>
                </div>

                {/* ملاحظات */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">ملاحظات مهمة</h4>
                  <p className="text-gray-300 text-sm">
                    • السعر قابل للتفاوض حسب الظروف<br/>
                    • يمكن ترتيب زيارة للعقار<br/>
                    • جميع الأوراق والمستندات متوفرة<br/>
                    • العقار جاهز للسكن الفوري
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PropertySidebar;
