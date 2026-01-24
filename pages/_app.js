import React from 'react';
import '../styles/globals.css'; 
import { CartProvider } from '../src/context/CartContext'; 
import TopBar from '../src/components/TopBar'; 

// 👇 سنحاول استيراد الفوتر بطريقتين لتجنب الخطأ
// تأكد أن ملف Footer.js موجود داخل src/components
import Footer from '../src/components/Footer'; 

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <TopBar />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  );
}

export default MyApp;