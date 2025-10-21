import { useState } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import PropertySidebar from './PropertySidebar';
import { Building2, Filter, Search, Grid, List } from 'lucide-react';

/**
 * مكون شبكة العقارات - يعرض العقارات في شبكة متجاوبة مع إمكانية فتح الشريط الجانبي
 * @param {Array} properties - قائمة العقارات
 * @param {String} searchTerm - مصطلح البحث
 * @param {Object} filters - فلاتر البحث
 */
const PropertiesGrid = ({ properties, searchTerm, filters }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid أو list

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
              <Building2 className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700 font-bold">اكتشف عقاراتنا المميزة</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-800 heading-primary mb-6">
              <span className="text-gradient">عقارات</span> راقية
              <br />
              لجميع الأذواق
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-body">
              {filteredProperties.length} عقار متاح للعرض - اختر العقار الذي يناسب احتياجاتك وميزانيتك
            </p>
          </motion.div>

          {/* شريط التحكم */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* عدد النتائج */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">النتائج</div>
                  <div className="font-bold text-gray-800">{filteredProperties.length} عقار</div>
                </div>
              </div>

              {/* أزرار عرض */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">طريقة العرض:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-white shadow-md text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-md text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* شبكة العقارات */}
          {filteredProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="glass-effect rounded-3xl p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">لا توجد نتائج</h3>
                <p className="text-gray-600 text-body">
                  لم نجد عقارات تطابق معايير البحث الخاصة بك. 
                  جرب تغيير الفلاتر أو مصطلحات البحث.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard
                    property={property}
                    onCardClick={handleCardClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* زر عرض المزيد */}
          {filteredProperties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-16"
            >
              <button className="btn-primary">
                عرض المزيد من العقارات
              </button>
            </motion.div>
          )}
        </div>
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
