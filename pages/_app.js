import React from 'react';
import Script from 'next/script'; // استيراد أداة السكريبت
import '../styles/globals.css';
import { CartProvider } from '../src/context/CartContext';
import TopBar from '../src/components/TopBar';
import Footer from '../src/components/Footer';

function MyApp({ Component, pageProps }) {
  // 👇 ضع الكود الذي نسخته هنا بدلاً من الكلمة الإنجليزية
  const GA_MEASUREMENT_ID = 'G-8MBK7Y702C'; 

  return (
    <CartProvider>
      
      {/* 1️⃣ تحميل مكتبة جوجل أناليتكس */}
      <Script 
        strategy="afterInteractive" 
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} 
      />
      
      {/* 2️⃣ تشغيل التتبع */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <TopBar />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  );
}

export default MyApp;