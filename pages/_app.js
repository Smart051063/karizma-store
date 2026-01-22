import '../styles/globals.css';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { CartProvider } from '../src/context/CartContext';
import { LanguageProvider } from '../src/context/LanguageContext'; // 👈 1. استيراد

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider> {/* 👈 2. التغليف الخارجي للغة */}
      <CartProvider>
        <TopBar />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </LanguageProvider>
  );
}

export default MyApp;