import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar'; // 1. استدعاء النافبار

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar /> {/* 2. وضع النافبار هنا ليظهر في كل الصفحات */}
      <Component {...pageProps} />
    </CartProvider>
  );
}