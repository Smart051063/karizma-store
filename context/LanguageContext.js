import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar'); // اللغة الافتراضية عربية

  // استرجاع اللغة المحفوظة عند فتح الموقع
  useEffect(() => {
    const savedLang = localStorage.getItem('karizma_lang');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  // دالة تغيير اللغة
  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('karizma_lang', lang); // حفظ الاختيار
  };

  // النصوص الثابتة في الموقع (للقوائم والأزرار)
  const translations = {
    ar: {
      home: 'الرئيسية',
      men: 'رجالي',
      women: 'نسائي',
      oriental: 'شرقي',
      search: 'بحث',
      cart: 'السلة',
      addToCart: 'إضافة للسلة 🛒',
      price: 'جنيه',
      descPlaceholder: 'الوصف غير متاح',
      searchPlaceholder: 'اكتب اسم العطر...'
    },
    en: {
      home: 'Home',
      men: 'Men',
      women: 'Women',
      oriental: 'Oriental',
      search: 'Search',
      cart: 'Cart',
      addToCart: 'Add to Cart 🛒',
      price: 'EGP',
      descPlaceholder: 'Description not available',
      searchPlaceholder: 'Search for perfume...'
    }
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t: translations[language] }}>
      {/* هذا السطر سيقلب اتجاه الموقع تلقائياً */}
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} style={{ fontFamily: language === 'ar' ? 'Arial' : 'sans-serif' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);