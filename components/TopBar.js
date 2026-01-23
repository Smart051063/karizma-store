import Link from 'next/link';
import { useCart } from '../src/context/CartContext';
import { useLanguage } from '../src/context/LanguageContext';

export default function TopBar() {
  const { cartItems } = useCart();
  const { language, switchLanguage, t } = useLanguage();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      
      {/* 1️⃣ الشريط التنبيهي الذهبي الجديد (يظهر في كل الصفحات) ✨ */}
      <div style={{
        backgroundColor: '#000', // خلفية سوداء فخمة
        color: '#d4af37',       // كتابة ذهبية
        textAlign: 'center',
        padding: '8px',
        fontSize: '0.9rem',     // خط مناسب
        borderBottom: '1px solid #222',
        fontWeight: 'bold'
      }}>
        <span style={{ fontSize: '1rem' }}>✨ </span>
          جميع عطورنا مستوحاة من أرقى الماركات العالمية.. بعبواتنا الخاصة وجودة نراهن عليها
        <span style={{ fontSize: '1rem' }}> ✨</span>
      </div>

      {/* 2️⃣ القائمة الرئيسية (القديمة كما هي) */}
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

        {/* الروابط (تختفي في الموبايل) */}
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

      {/* تنسيقات الموبايل (لتصغير خط التنبيه قليلاً في الشاشات الصغيرة) */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
          /* تصغير خط الشريط التنبيهي في الموبايل ليكون أنيقاً */
          div[style*="padding: 8px"] {
            font-size: 0.75rem !important; 
            padding: 6px !important;
          }
        }
      `}</style>
    </div>
  );
}

const linkStyle = { textDecoration: 'none', color: 'white', fontWeight: '500', cursor: 'pointer' };