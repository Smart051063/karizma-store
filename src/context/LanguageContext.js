import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar'); 

  useEffect(() => {
    const savedLang = localStorage.getItem('karizma_lang');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('karizma_lang', lang);
  };

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
      {/* 👇 التعديل هنا: أضفنا suppressHydrationWarning لمنع الخطأ الأحمر */}
      <div 
        dir={language === 'ar' ? 'rtl' : 'ltr'} 
        style={{ fontFamily: language === 'ar' ? 'Arial' : 'sans-serif' }}
        suppressHydrationWarning={true} 
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);