import Link from 'next/link';
import { useCart } from '../src/context/CartContext';
import { useLanguage } from '../src/context/LanguageContext';

export default function TopBar() {
  const { cartItems } = useCart();
  const { language, switchLanguage } = useLanguage(); // لم نعد نحتاج t هنا
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      
      {/* 1️⃣ الشريط التنبيهي (كما هو) */}
      <div className="top-alert-bar">
        <span style={{ fontSize: '1.3rem' }}>✨ </span>
          جميع عطورنا مستوحاة من أرقى الماركات العالمية.. بعبواتنا الخاصة وجودة نراهن عليها
        <span style={{ fontSize: '1.3rem' }}> ✨</span>
      </div>

      {/* 2️⃣ القائمة الرئيسية (تم تنظيفها) */}
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

        {/* ❌ (تم حذف الروابط من هنا: رجالي - نسائي - شرقي) لتخفيف الزحام */}

        {/* الأيقونات (اللغة - البحث - السلة) */}
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

      {/* تنسيقات CSS */}
      <style jsx>{`
        .top-alert-bar {
          background-color: #000;
          color: #d4af37;
          text-align: center;
          padding: 12px 10px;
          font-size: 1.2rem;
          font-weight: bold;
          border-bottom: 1px solid #222;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .top-alert-bar {
            font-size: 0.9rem;
            padding: 8px 5px;
          }
        }
      `}</style>
    </div>
  );
}