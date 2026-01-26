// ... الكود السابق ...
return (
  <LanguageContext.Provider value={{ language, switchLanguage, t: translations[language] }}>
    {/* 👇 أضف هذا السطر هنا بالتحديد */}
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'} 
      style={{ fontFamily: language === 'ar' ? 'Arial' : 'sans-serif' }}
      suppressHydrationWarning={true} 
    >
      {children}
    </div>
  </LanguageContext.Provider>
);
// ...