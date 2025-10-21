import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import PropertiesGrid from "../components/PropertiesGrid";
import SearchAndFilters from "../components/SearchAndFilters";

/**
 * صفحة عرض جميع العقارات - الصفحة الرئيسية لعرض العقارات مع البحث والفلاتر - تصميم احترافي
 */
const AllProperty = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    price: '',
    location: '',
    bedrooms: ''
  });

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

  return (
    <div className="min-h-screen gradient-bg">
      {/* العنوان الرئيسي */}
      <div className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 mb-6 shadow-lg">
              <span className="text-gray-700 font-bold">🏠 عقاراتنا المميزة</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-800 heading-primary mb-6">
              اكتشف
              <span className="text-gradient"> عقاراتنا</span>
              <br />
              المميزة
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-body">
              مجموعة واسعة من العقارات المختارة بعناية لتلبية جميع احتياجاتك وميزانيتك
            </p>
          </motion.div>

          {/* البحث والفلاتر */}
          <SearchAndFilters
            onSearchChange={setSearchTerm}
            onFiltersChange={setFilters}
            properties={data}
          />
        </div>
      </div>

      {/* شبكة العقارات */}
      <PropertiesGrid
        properties={data}
        searchTerm={searchTerm}
        filters={filters}
      />
    </div>
  );
};

export default AllProperty;
