import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

/**
 * مكون البحث والفلاتر - يوفر واجهة بحث متقدمة وفلاتر للعقارات
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

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
      {/* شريط البحث الرئيسي */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ابحث عن العقارات... (اسم العقار، الموقع، كود الوحدة)"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white 
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2
            ${showFilters 
              ? 'bg-blue-600 text-white' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
        >
          <Filter className="w-4 h-4" />
          فلاتر متقدمة
        </button>
      </div>

      {/* الفلاتر المتقدمة */}
      <motion.div
        initial={false}
        animate={{ 
          height: showFilters ? 'auto' : 0,
          opacity: showFilters ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/20">
          {/* فلتر السعر */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              الحد الأقصى للسعر (بالآلاف)
            </label>
            <select
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              الموقع
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              عدد الغرف
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/20">
          <div className="text-sm text-gray-400">
            {Object.values(filters).filter(f => f !== '').length > 0 && (
              <span>
                {Object.values(filters).filter(f => f !== '').length} فلتر نشط
              </span>
            )}
          </div>
          
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 
                     hover:bg-red-500/10 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
            مسح الفلاتر
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchAndFilters;
