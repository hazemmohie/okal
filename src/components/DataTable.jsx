import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  ChevronDown,
  ChevronUp,
  SortAsc,
  SortDesc
} from "lucide-react";

/**
 * مكون جدول البيانات - لعرض وإدارة جميع البيانات من ملف Excel
 */
const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    compound: '',
    priceRange: ''
  });

  useEffect(() => {
    // جلب ملف Excel من المجلد العام
    console.log("بدء تحميل البيانات الحقيقية من properties.xlsx...");
    fetch("/properties.xlsx")
      .then((res) => {
        console.log("تم جلب الملف بنجاح:", res.status);
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => {
        console.log("حجم الملف:", arrayBuffer.byteLength, "بايت");
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        console.log("اسم الورقة:", sheetName);
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        console.log("البيانات الحقيقية المحملة:", jsonData.length, "سجل");
        console.log("عينة من البيانات:", jsonData.slice(0, 2));
        
        setData(jsonData);
        setFilteredData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("خطأ في قراءة ملف Excel:", error);
        alert("خطأ في تحميل البيانات: " + error.message);
        setLoading(false);
      });
  }, []);

  // البحث والفلترة
  useEffect(() => {
    let filtered = data.filter(item => {
      const matchesSearch = !searchTerm || 
        Object.values(item).some(value => 
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesStatus = !filters.status || item["Status"] === filters.status;
      const matchesType = !filters.type || item["Type"] === filters.type;
      const matchesCompound = !filters.compound || item["Compound"] === filters.compound;
      
      return matchesSearch && matchesStatus && matchesType && matchesCompound;
    });

    // الترتيب
    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (sortDirection === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    setFilteredData(filtered);
  }, [data, searchTerm, filters, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Data");
    XLSX.writeFile(wb, "filtered_properties.xlsx");
  };

  const getUniqueValues = (field) => {
    return [...new Set(data.map(item => item[field]).filter(Boolean))];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* رسالة التحميل */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-xl font-semibold text-gray-600 mb-4">
              جاري تحميل البيانات الحقيقية من ملف Excel...
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {!loading && (
          <>
            {/* العنوان الرئيسي */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📊 إدارة بيانات العقارات الحقيقية
              </h1>
              <p className="text-gray-600">
                عرض وإدارة جميع البيانات من ملف Excel مع إمكانية البحث والفلترة والتصدير
              </p>
              <div className="mt-2 text-sm text-green-600 font-semibold">
                ✅ تم تحميل {data.length} سجل من البيانات الحقيقية
              </div>
            </motion.div>

        {/* شريط التحكم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* البحث */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في جميع البيانات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                فلاتر
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                تصدير Excel
              </button>
            </div>
          </div>

          {/* الفلاتر */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">جميع الحالات</option>
                    {getUniqueValues("Status").map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">جميع الأنواع</option>
                    {getUniqueValues("Type").map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الكمبوند</label>
                  <select
                    value={filters.compound}
                    onChange={(e) => setFilters({...filters, compound: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">جميع الكمبوندات</option>
                    {getUniqueValues("Compound").map(compound => (
                      <option key={compound} value={compound}>{compound}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* إحصائيات سريعة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-2xl font-bold text-blue-600">{filteredData.length}</div>
            <div className="text-sm text-gray-600">إجمالي العقارات</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-2xl font-bold text-green-600">
              {filteredData.filter(item => item["Status"] === "متاح").length}
            </div>
            <div className="text-sm text-gray-600">متاح</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-2xl font-bold text-orange-600">
              {filteredData.filter(item => item["Status"] === "محجوز").length}
            </div>
            <div className="text-sm text-gray-600">محجوز</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-2xl font-bold text-purple-600">
              {getUniqueValues("Compound").length}
            </div>
            <div className="text-sm text-gray-600">كمبوند</div>
          </div>
        </motion.div>

        {/* جدول البيانات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("Client Name")}
                  >
                    <div className="flex items-center gap-1">
                      اسم العميل
                      {sortField === "Client Name" && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("Price")}
                  >
                    <div className="flex items-center gap-1">
                      السعر
                      {sortField === "Price" && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الكمبوند
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr 
                    key={index}
                    className={`hover:bg-gray-50 cursor-pointer ${selectedRow === index ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedRow(selectedRow === index ? null : index)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item["Client Name"] || 'غير محدد'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item["Price"] || 'غير محدد'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item["Compound"] || 'غير محدد'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item["Type"] || 'غير محدد'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item["Status"] === "متاح" 
                          ? "bg-green-100 text-green-800" 
                          : item["Status"] === "محجوز"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {item["Status"] || 'غير محدد'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* تفاصيل الصف المحدد */}
        {selectedRow !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              تفاصيل العقار المحدد
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(filteredData[selectedRow]).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-600">{key}</div>
                  <div className="text-sm text-gray-900 mt-1">{value || 'غير محدد'}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default DataTable;
