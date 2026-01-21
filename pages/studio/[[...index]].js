import '../styles/globals.css' // استيراد التنسيقات العامة
import { CartProvider } from '../context/CartContext'; // استيراد السلة

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}