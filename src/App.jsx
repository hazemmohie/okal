import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllProperty from "./pages/AllProperty";
import { Routes, Route } from "react-router-dom";
import SingleProperty from "./pages/SingleProperty";
import Header from "./components/Header";
import Units from "./pages/Units";
import { AppProvider } from "./components/RealEstateContext";

/**
 * المكون الرئيسي للتطبيق - يحتوي على جميع الصفحات والتنقل
 */
function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<AllProperty />} />
            <Route path="/property/:id" element={<SingleProperty />} />
            <Route path="/units" element={<Units />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
