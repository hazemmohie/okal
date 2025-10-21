import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { 
  BarChart3, 
  Users, 
  Building2, 
  DollarSign,
  TrendingUp,
  Eye,
  Download,
  Filter
} from "lucide-react";

/**
 * الصفحة الرئيسية - لوحة تحكم إدارة البيانات
 */
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    reserved: 0,
    compounds: 0,
    totalValue: 0
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
        
        setData(jsonData);
        
        // حساب الإحصائيات
        const total = jsonData.length;
        const available = jsonData.filter(item => item["Status"] === "متاح").length;
        const reserved = jsonData.filter(item => item["Status"] === "محجوز").length;
        const compounds = [...new Set(jsonData.map(item => item["Compound"]).filter(Boolean))].length;
        const totalValue = jsonData.reduce((sum, item) => sum + (Number(item["Price"]) || 0), 0);
        
        setStats({
          total,
          available,
          reserved,
          compounds,
          totalValue
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("خطأ في قراءة ملف Excel:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* رسالة التحميل */}
      {loading && (
        <div className="text-center py-20">
          <div className="text-2xl font-semibold text-gray-600 mb-4">
            جاري تحميل البيانات الحقيقية من ملف Excel...
          </div>
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      )}

      {!loading && (
        <>
          {/* العنوان الرئيسي */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  📊 لوحة تحكم إدارة العقارات الحقيقية
                </h1>
                <p className="text-xl text-gray-600">
                  نظام إدارة شامل لبيانات العقارات الحقيقية من ملف Excel
                </p>
                {data.length > 0 && (
                  <div className="mt-4 text-lg text-green-600 font-semibold">
                    ✅ تم تحميل {data.length} سجل من البيانات الحقيقية
                  </div>
                )}
              </motion.div>
            </div>
          </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* الإحصائيات الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-600">إجمالي العقارات</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <div className="text-2xl font-bold text-gray-800">{stats.available}</div>
                <div className="text-sm text-gray-600">متاح</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="mr-4">
                <div className="text-2xl font-bold text-gray-800">{stats.reserved}</div>
                <div className="text-sm text-gray-600">محجوز</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <div className="text-2xl font-bold text-gray-800">{stats.compounds}</div>
                <div className="text-sm text-gray-600">كمبوند</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <div className="text-2xl font-bold text-gray-800">
                  ${(stats.totalValue / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-600">إجمالي القيمة</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* الإجراءات السريعة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mr-3">عرض البيانات</h3>
            </div>
            <p className="text-gray-600 mb-4">
              عرض جميع البيانات في جدول منظم مع إمكانية البحث والفلترة
            </p>
            <a 
              href="/properties" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              عرض البيانات
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Filter className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mr-3">فلترة البيانات</h3>
            </div>
            <p className="text-gray-600 mb-4">
              فلترة البيانات حسب الحالة، النوع، الكمبوند، والسعر
            </p>
            <a 
              href="/units" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              فلترة البيانات
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mr-3">تصدير البيانات</h3>
            </div>
            <p className="text-gray-600 mb-4">
              تصدير البيانات المفلترة إلى ملف Excel جديد
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              تصدير Excel
            </button>
          </div>
        </motion.div>

        {/* آخر العقارات المضافة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">آخر العقارات المضافة</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم العميل</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الكمبوند</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.slice(0, 5).map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item["Client Name"] || 'غير محدد'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item["Price"] || 'غير محدد'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item["Compound"] || 'غير محدد'}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        </>
      )}
    </div>
  );
};

export default Home;
