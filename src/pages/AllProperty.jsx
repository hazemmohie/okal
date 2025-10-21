import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../components/RealEstateContext";
import PropertiesGrid from "../components/PropertiesGrid";
import SearchAndFilters from "../components/SearchAndFilters";

/**
 * صفحة عرض جميع العقارات - الصفحة الرئيسية لعرض العقارات مع البحث والفلاتر - تصميم احترافي
 */
const AllProperty = () => {
  const { propertydata } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    price: '',
    location: '',
    bedrooms: ''
  });

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
            properties={propertydata}
          />
        </div>
      </div>

      {/* شبكة العقارات */}
      <PropertiesGrid
        properties={propertydata}
        searchTerm={searchTerm}
        filters={filters}
      />
    </div>
  );
};

export default AllProperty;
