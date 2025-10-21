import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import PropertyCard from "./PropertyCard";
import { Star, TrendingUp, Award, ArrowRight } from "lucide-react";

/**
 * مكون العقارات المميزة - يعرض أفضل العقارات المتاحة - تصميم احترافي
 */
const FeaturedProperty = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // جلب ملف Excel من المجلد العام
    fetch("/properties.xlsx")
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // تحويل البيانات إلى تنسيق متوافق مع النظام الجديد
        const formattedData = jsonData.map((item, index) => ({
          id: index + 1,
          propertyName: item["Client Name"] || `عقار ${index + 1}`,
          price: `$${item["Price"] || 'غير محدد'}`,
          priceInLakhs: Number(item["Price"]) || 0,
          bedrooms: Number(item["Rooms"]) || 0,
          bathrooms: Number(item["Bathrooms"]) || 0,
          location: item["Compound"] || 'غير محدد',
          imageURL: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
          // بيانات إضافية من Excel
          propertyCode: item["Property Code"],
          type: item["Type"],
          finishing: item["Finishing"],
          floor: item["Floor"],
          area: item["Area"],
          status: item["Status"],
          unitType: item["Unit Type"],
          dateAdded: item["Date Added"],
          downPayment: item["Down Payment"],
          duration: item["Duration (months)"],
          monthlyInstallment: item["Monthly Installment"],
          mediaFiles: item["Number of Media Files"],
          notes: item["Notes"]
        }));
        
        setData(formattedData);
      })
      .catch((error) => console.error("خطأ في قراءة ملف Excel:", error));
  }, []);
  
  // الحصول على أفضل 6 عقارات (أعلى الأسعار)
  const featuredProperties = data
    .sort((a, b) => b.priceInLakhs - a.priceInLakhs)
    .slice(0, 6);

  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        {/* العنوان الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 mb-6 shadow-lg">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <span className="text-gray-700 font-bold">العقارات المميزة</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-800 heading-primary mb-6">
            <span className="text-gradient">أفضل</span> العقارات
            <br />
            المتاحة الآن
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-body">
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
          <div className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-4xl font-black text-gray-800 mb-2">95%</div>
            <div className="text-gray-600 font-medium">معدل الرضا</div>
          </div>
          
          <div className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-4xl font-black text-gray-800 mb-2">{data.length}+</div>
            <div className="text-gray-600 font-medium">عقار متاح</div>
          </div>
          
          <div className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
              <Star className="w-8 h-8 text-yellow-600 fill-current" />
            </div>
            <div className="text-4xl font-black text-gray-800 mb-2">4.9</div>
            <div className="text-gray-600 font-medium">تقييم العملاء</div>
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
              <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <Star className="w-4 h-4 inline mr-1" />
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
          className="text-center mt-16"
        >
          <button className="btn-primary group">
            عرض جميع العقارات
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
