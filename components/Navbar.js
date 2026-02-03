import React from 'react';
import Link from 'next/link';
import { useCart } from '../src/context/CartContext';
import { useLanguage } from '../src/context/LanguageContext';

export default function Navbar() {
  const { totalQuantities } = useCart();
  const { language, switchLanguage, t } = useLanguage();

  return (
    <nav style={{ 
      backgroundColor: '#111', 
      padding: '15px 20px', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      borderBottom: '2px solid #d4af37',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>

        {/* 1️⃣ الشعار (اللوجو) */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ 
            color: '#d4af37', 
            margin: 0, 
            fontSize: '1.8rem', 
            fontFamily: 'serif', 
            letterSpacing: '1px'
          }}>
            Karizma ✨
          </h1>
        </Link>

        {/* 2️⃣ روابط التنقل (تمت إضافة المدونة هنا) */}
        <div className="nav-links" style={{ display: 'flex', gap: '20px' }}>
          <NavLink href="/" text={t.home || "الرئيسية"} />
          <NavLink href="/shop" text="المتجر" />
          
          {/* 👇 هنا أضفنا رابط المدونة */}
          <NavLink href="/blog" text="المدونة ✍️" />
          
          <NavLink href="/offers" text="العروض 🔥" />
        </div>

        {/* 3️⃣ الأيقونات + زر اللغة */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          {/* زر تغيير اللغة */}
          <button 
            onClick={() => switchLanguage(language === 'ar' ? 'en' : 'ar')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #d4af37',
              color: '#d4af37',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              transition: '0.3s'
            }}
          >
            {language === 'ar' ? 'English' : 'العربية'} 🌍
          </button>

          {/* خط فاصل صغير */}
          <div style={{ width: '1px', height: '20px', backgroundColor: '#333' }}></div>

          {/* أيقونة البحث */}
          <Link href="/search" style={{ color: 'white', textDecoration: 'none', fontSize: '1.4rem' }}>
            🔍
          </Link>

          {/* أيقونة السلة */}
          <Link href="/cart" style={{ position: 'relative', color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
            🛒
            {totalQuantities > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                backgroundColor: '#e74c3c',
                color: 'white',
                fontSize: '0.75rem',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                border: '1px solid #111'
              }}>
                {totalQuantities}
              </span>
            )}
          </Link>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

function NavLink({ href, text }) {
  return (
    <Link href={href} style={{ 
      color: 'white', 
      textDecoration: 'none', 
      fontWeight: 'bold', 
      fontSize: '1rem',
      transition: 'color 0.3s'
    }}
    onMouseOver={(e) => e.target.style.color = '#d4af37'}
    onMouseOut={(e) => e.target.style.color = 'white'}
    >
      {text}
    </Link>
  );
}