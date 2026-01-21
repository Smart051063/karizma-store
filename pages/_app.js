import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar'; // استيراد الشريط الجديد

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <TopBar /> {/* الشريط التنبيهي في الأعلى */}
      <Navbar /> {/* شريط التنقل تحته */}
      <Component {...pageProps} />
    </CartProvider>
  );
}