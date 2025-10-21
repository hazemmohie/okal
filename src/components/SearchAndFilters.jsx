import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, SlidersHorizontal, MapPin, DollarSign, Home } from 'lucide-react';

/**
 * مكون البحث والفلاتر - يوفر واجهة بحث متقدمة وفلاتر للعقارات - تصميم احترافي
 * @param {Function} onSearchChange - دالة تحديث مصطلح البحث
 * @param {Function} onFiltersChange - دالة تحديث الفلاتر
 * @param {Array} properties - قائمة العقارات للحصول على القيم الفريدة
 */
const SearchAndFilters = ({ onSearchChange, onFiltersChange, properties }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    price: '',
    location: '',
    bedrooms: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  /**
   * تحديث مصطلح البحث
   * @param {String} value - قيمة البحث الجديدة
   */
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  /**
   * تحديث الفلاتر
   * @param {String} key - مفتاح الفلتر
   * @param {String} value - قيمة الفلتر الجديدة
   */
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  /**
   * مسح جميع الفلاتر
   */
  const clearFilters = () => {
    const clearedFilters = { price: '', location: '', bedrooms: '' };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  // الحصول على القيم الفريدة للفلاتر
  const uniqueValues = {
    price: [...new Set(properties.map(p => p.priceInLakhs))].sort((a, b) => a - b),
    location: [...new Set(properties.map(p => p.location))].sort(),
    bedrooms: [...new Set(properties.map(p => p.bedrooms))].sort((a, b) => a - b)
  };

  const activeFiltersCount = Object.values(filters).filter(f => f !== '').length;

  return (
    <div className="glass-effect rounded-3xl p-8 mb-12 shadow-xl">
      {/* شريط البحث الرئيسي */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            placeholder="ابحث عن العقارات... (اسم العقار، الموقع، كود الوحدة)"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl text-gray-800 
                     placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 
                     focus:border-blue-500 transition-all duration-300 text-lg font-medium
                     hover:bg-white hover:border-gray-300"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3
            ${showFilters 
              ? 'btn-primary' 
              : 'btn-secondary'
            }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          فلاتر متقدمة
          {activeFiltersCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* الفلاتر المتقدمة */}
      <motion.div
        initial={false}
        animate={{ 
          height: showFilters ? 'auto' : 0,
          opacity: showFilters ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t-2 border-gray-200">
          {/* فلتر السعر */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-700 font-bold">
              <DollarSign className="w-5 h-5 text-green-600" />
              الحد الأقصى للسعر
            </label>
            <select
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="w-full p-4 bg-white/80 border-2 border-gray-200 rounded-xl text-gray-800 
                       focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500
                       transition-all duration-300 hover:bg-white hover:border-gray-300"
            >
              <option value="">جميع الأسعار</option>
              {uniqueValues.price.map(price => (
                <option key={price} value={price}>
                  حتى {price} ألف
                </option>
              ))}
            </select>
          </div>

          {/* فلتر الموقع */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-700 font-bold">
              <MapPin className="w-5 h-5 text-blue-600" />
              الموقع
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-4 bg-white/80 border-2 border-gray-200 rounded-xl text-gray-800 
                       focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
                       transition-all duration-300 hover:bg-white hover:border-gray-300"
            >
              <option value="">جميع المواقع</option>
              {uniqueValues.location.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* فلتر عدد الغرف */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gray-700 font-bold">
              <Home className="w-5 h-5 text-purple-600" />
              عدد الغرف
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              className="w-full p-4 bg-white/80 border-2 border-gray-200 rounded-xl text-gray-800 
                       focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500
                       transition-all duration-300 hover:bg-white hover:border-gray-300"
            >
              <option value="">جميع الأحجام</option>
              {uniqueValues.bedrooms.map(bedrooms => (
                <option key={bedrooms} value={bedrooms}>
                  {bedrooms} غرفة
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
          <div className="flex items-center gap-4">
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 text-gray-600">
                <Filter className="w-4 h-4" />
                <span className="font-medium">
                  {activeFiltersCount} فلتر نشط
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-6 py-3 text-red-600 hover:text-red-700 
                     hover:bg-red-50 rounded-xl transition-all duration-200 font-medium
                     border-2 border-red-200 hover:border-red-300"
          >
            <X className="w-4 h-4" />
            مسح الفلاتر
          </button>
        </div>
      </motion.div>

      {/* إحصائيات سريعة */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t-2 border-gray-200"
      >
        <div className="text-center">
          <div className="text-2xl font-black text-blue-600">{properties.length}</div>
          <div className="text-gray-600 text-sm font-medium">إجمالي العقارات</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-green-600">{uniqueValues.location.length}</div>
          <div className="text-gray-600 text-sm font-medium">المواقع المتاحة</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-purple-600">{uniqueValues.price.length}</div>
          <div className="text-gray-600 text-sm font-medium">نطاقات الأسعار</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-orange-600">{uniqueValues.bedrooms.length}</div>
          <div className="text-gray-600 text-sm font-medium">أنواع الوحدات</div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchAndFilters;
