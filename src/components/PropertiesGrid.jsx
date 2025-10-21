import { useState } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import PropertySidebar from './PropertySidebar';

/**
 * مكون شبكة العقارات - يعرض العقارات في شبكة متجاوبة مع إمكانية فتح الشريط الجانبي
 * @param {Array} properties - قائمة العقارات
 * @param {String} searchTerm - مصطلح البحث
 * @param {Object} filters - فلاتر البحث
 */
const PropertiesGrid = ({ properties, searchTerm, filters }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /**
   * دالة فتح الشريط الجانبي عند الضغط على بطاقة العقار
   * @param {Object} property - بيانات العقار المحدد
   */
  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setIsSidebarOpen(true);
  };

  /**
   * دالة إغلاق الشريط الجانبي
   */
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedProperty(null);
  };

  // فلترة العقارات حسب البحث والفلاتر
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = 
      property.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.id.toString().includes(searchTerm);

    const matchesPrice = !filters.price || property.priceInLakhs <= Number(filters.price);
    const matchesLocation = !filters.location || property.location === filters.location;
    const matchesBedrooms = !filters.bedrooms || property.bedrooms === Number(filters.bedrooms);

    return matchesSearch && matchesPrice && matchesLocation && matchesBedrooms;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* العنوان الرئيسي */}
      <div className="text-center py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          اكتشف عقاراتنا المميزة
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-lg"
        >
          {filteredProperties.length} عقار متاح للعرض
        </motion.p>
      </div>

      {/* شبكة العقارات */}
      <div className="container mx-auto px-4 pb-8">
        {filteredProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-xl mb-4">
              🏠 لا توجد عقارات تطابق معايير البحث
            </div>
            <p className="text-gray-500">
              جرب تغيير معايير البحث أو الفلاتر للعثور على عقارات أخرى
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PropertyCard
                  property={property}
                  onCardClick={handleCardClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* الشريط الجانبي */}
      <PropertySidebar
        property={selectedProperty}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </div>
  );
};

export default PropertiesGrid;
