import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer'; // 1. استيراد الفوتر

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <TopBar />   {/* في الأعلى: شريط التنبيه */}
      <Navbar />   {/* تحته: القائمة */}
      
      <div style={{ minHeight: '80vh' }}> {/* حيلة صغيرة لضمان عدم صعود الفوتر للأعلى إذا كانت الصفحة فارغة */}
        <Component {...pageProps} /> {/* هنا يظهر محتوى الصفحات (المنتجات، السلة، إلخ) */}
      </div>

      <Footer />   {/* 2. في الأسفل: التذييل */}
    </CartProvider>
  );
}