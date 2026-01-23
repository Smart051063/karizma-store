import Link from 'next/link';
import { useCart } from '../src/context/CartContext';
import { useLanguage } from '../src/context/LanguageContext';

export default function TopBar() {
  const { cartItems } = useCart();
  const { language, switchLanguage, t } = useLanguage();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      
      {/* 1️⃣ الشريط التنبيهي (تم تكبير الخط وتحسين الوضوح) ✨ */}
      <div className="top-alert-bar">
        <span style={{ fontSize: '1.3rem' }}>✨ </span>
          جميع عطورنا مستوحاة من أرقى الماركات العالمية.. بعبواتنا الخاصة وجودة نراهن عليها
        <span style={{ fontSize: '1.3rem' }}> ✨</span>
      </div>

      {/* 2️⃣ القائمة الرئيسية */}
      <nav style={{
        backgroundColor: 'black', color: 'white', padding: '10px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #333',
        height: '60px'
      }}>
        
        {/* الشعار */}
        <Link href="/" style={{ textDecoration: 'none', color: '#d4af37', fontSize: '1.4rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
          ✨ Karizma
        </Link>

        {/* الروابط */}
        <div className="hide-on-mobile" style={{ display: 'flex', gap: '20px', fontSize: '1rem' }}>
          <Link href="/men" style={linkStyle}>{t.men}</Link>
          <Link href="/women" style={linkStyle}>{t.women}</Link>
          <Link href="/oriental" style={{...linkStyle, color: '#d4af37'}}>{t.oriental}</Link>
        </div>

        {/* الأيقونات */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          <button 
            onClick={() => switchLanguage(language === 'ar' ? 'en' : 'ar')}
            style={{
              background: 'none', border: '1px solid #777', color: 'white', 
              borderRadius: '5px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.7rem'
            }}
          >
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>

          <Link href="/search" style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem' }}>
            🔍
          </Link>

          <Link href="/cart" style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', position: 'relative' }}>
              <span style={{ fontSize: '1.4rem' }}>🛒</span>
              {totalItems > 0 && (
                <span style={{ 
                  backgroundColor: 'red', color: 'white', borderRadius: '50%', 
                  padding: '2px 5px', fontSize: '0.7rem', fontWeight: 'bold',
                  position: 'absolute', top: '-8px', right: '-8px'
                }}>
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </nav>

      {/* تنسيقات CSS (لضبط الأحجام بدقة) */}
      <style jsx>{`
        /* تنسيق الشريط التنبيهي للكمبيوتر */
        .top-alert-bar {
          background-color: #000;
          color: #d4af37;
          text-align: center;
          padding: 12px 10px; /* زيادة الحشوة لراحة العين */
          font-size: 1.2rem;  /* 👈 تكبير الخط هنا (حوالي 19px) */
          font-weight: bold;
          border-bottom: 1px solid #222;
          line-height: 1.4;
        }

        /* تنسيق الموبايل (أصغر قليلاً لكن واضح) */
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
          .top-alert-bar {
            font-size: 0.9rem; /* خط واضح للموبايل دون أن يملأ الشاشة */
            padding: 8px 5px;
          }
        }
      `}</style>
    </div>
  );
}

const linkStyle = { textDecoration: 'none', color: 'white', fontWeight: '500', cursor: 'pointer' };