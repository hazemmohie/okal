import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../components/RealEstateContext";
import PropertiesGrid from "../components/PropertiesGrid";
import SearchAndFilters from "../components/SearchAndFilters";

/**
 * صفحة عرض جميع العقارات - الصفحة الرئيسية لعرض العقارات مع البحث والفلاتر
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* العنوان الرئيسي */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          🏠 عقاراتنا المميزة
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          اكتشف مجموعة واسعة من العقارات المختارة بعناية لتلبية جميع احتياجاتك
        </p>
      </motion.div>

      {/* البحث والفلاتر */}
      <div className="container mx-auto px-4">
        <SearchAndFilters
          onSearchChange={setSearchTerm}
          onFiltersChange={setFilters}
          properties={propertydata}
        />
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
