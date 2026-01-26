import React, { useState, useEffect } from 'react'; // 👈 تأكد من استيراد useState و useEffect
// ... باقي الاستيرادات ...

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false); // 👈 متغير الحالة

  useEffect(() => {
    setMounted(true); // 👈 تفعيله عند التحميل
  }, []);

  return (
    <LanguageProvider>
      <CartProvider>
        {/* ... أكواد السكربت ... */}

        {/* 👇 اعرض التوستر فقط عندما يكون mounted = true */}
        {mounted && <Toaster />}
        
        <Navbar /> 
        <Component {...pageProps} />
        <Footer /> 

      </CartProvider>
    </LanguageProvider>
  )
}
export default MyApp;