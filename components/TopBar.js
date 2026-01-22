import Link from 'next/link';
import { useCart } from '../src/context/CartContext';
import { useLanguage } from '../src/context/LanguageContext';

export default function TopBar() {
  const { cartItems } = useCart();
  const { language, switchLanguage, t } = useLanguage();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <nav style={{
        backgroundColor: 'black', color: 'white', padding: '10px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 1000,
        borderBottom: '1px solid #333',
        height: '70px' // تحديد ارتفاع ثابت
      }}>
        
        {/* الشعار */}
        <Link href="/" style={{ textDecoration: 'none', color: '#d4af37', fontSize: '1.4rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
          ✨ Karizma
        </Link>

        {/* الروابط (ستختفي في الموبايل بفضل الكلاس hide-on-mobile) */}
        <div className="hide-on-mobile" style={{ display: 'flex', gap: '20px', fontSize: '1rem' }}>
          <Link href="/men" style={linkStyle}>{t.men}</Link>
          <Link href="/women" style={linkStyle}>{t.women}</Link>
          <Link href="/oriental" style={{...linkStyle, color: '#d4af37'}}>{t.oriental}</Link>
        </div>

        {/* الأيقونات (اللغة، البحث، السلة) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          {/* زر اللغة (تصغير الحجم قليلاً للموبايل) */}
          <button 
            onClick={() => switchLanguage(language === 'ar' ? 'en' : 'ar')}
            style={{
              background: 'none', border: '1px solid #777', color: 'white', 
              borderRadius: '5px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.7rem'
            }}
          >
            {language === 'ar' ? 'English' : 'عربي'}
          </button>

          {/* زر البحث */}
          <Link href="/search" style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem' }}>
            🔍
          </Link>

          {/* السلة */}
          <Link href="/cart" style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', position: 'relative' }}>
              <span style={{ fontSize: '1.4rem' }}>🛒</span>
              {totalItems > 0 && (
                <span style={{ 
                  backgroundColor: 'red', color: 'white', borderRadius: '50%', 
                  padding: '2px 5px', fontSize: '0.7rem', fontWeight: 'bold',
                  position: 'absolute', top: '-8px', right: '-8px' // تعديل المكان ليظهر بوضوح
                }}>
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </nav>

      {/* 👇 هذا هو كود الـ CSS السحري لإخفاء الروابط في الموبايل */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

const linkStyle = { textDecoration: 'none', color: 'white', fontWeight: '500', cursor: 'pointer' };