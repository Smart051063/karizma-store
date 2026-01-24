import React from 'react';
import '../styles/globals.css'; // تأكد أن ملف التنسيقات موجود، أو احذف هذا السطر إذا لم تستخدمه
import { CartProvider } from '../src/context/CartContext'; // استيراد ذاكرة السلة
import TopBar from '../src/components/TopBar'; // استيراد الشريط العلوي
import Footer from '../src/components/Footer'; // استيراد الفوتر

function MyApp({ Component, pageProps }) {
  return (
    // 1️⃣ نغلف التطبيق كله بذاكرة السلة لكي تصل البيانات لكل مكان
    <CartProvider>
      
      {/* 2️⃣ نضع الشريط العلوي هنا ليظهر في كل الصفحات تلقائياً */}
      <TopBar />
      
      {/* 3️⃣ هنا يتم عرض محتوى الصفحة الحالية (الرئيسية، المنتج، إلخ) */}
      <Component {...pageProps} />
      
      {/* 4️⃣ نضع الفوتر هنا ليظهر في أسفل كل الصفحات */}
      <Footer />

    </CartProvider>
  );
}

export default MyApp;