import Link from 'next/link';
import { useCart } from '../src/context/CartContext';
import { useLanguage } from '../src/context/LanguageContext'; // 👈 استيراد اللغة

export default function TopBar() {
  const { cartItems } = useCart();
  const { language, switchLanguage, t } = useLanguage(); // 👈 استخراج اللغة والمترجم
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav style={{
      backgroundColor: 'black', color: 'white', padding: '15px 20px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 1000,
      borderBottom: '1px solid #333'
    }}>
      
      {/* الشعار */}
      <Link href="/" style={{ textDecoration: 'none', color: '#d4af37', fontSize: '1.5rem', fontWeight: 'bold' }}>
        ✨ Karizma
      </Link>

      {/* الروابط (تتغير لغتها تلقائياً) */}
      <div style={{ display: 'flex', gap: '20px', fontSize: '1rem' }}>
        <Link href="/men" style={linkStyle}>{t.men}</Link>
        <Link href="/women" style={linkStyle}>{t.women}</Link>
        <Link href="/oriental" style={{...linkStyle, color: '#d4af37'}}>{t.oriental}</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        
        {/* 👇 زر تغيير اللغة */}
        <button 
          onClick={() => switchLanguage(language === 'ar' ? 'en' : 'ar')}
          style={{
            background: 'none', border: '1px solid #777', color: 'white', 
            borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontSize: '0.8rem'
          }}
        >
          {language === 'ar' ? '🇺🇸 English' : '🇪🇬 العربية'}
        </button>

        {/* زر البحث */}
        <Link href="/search" style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem' }}>
          🔍 {t.search}
        </Link>

        {/* السلة */}
        <Link href="/cart" style={{ textDecoration: 'none', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', position: 'relative' }}>
            <span>🛒</span>
            {totalItems > 0 && (
              <span style={{ 
                backgroundColor: 'red', color: 'white', borderRadius: '50%', 
                padding: '2px 6px', fontSize: '0.7rem', fontWeight: 'bold',
                position: 'absolute', top: '-10px', left: '-10px'
              }}>
                {totalItems}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

const linkStyle = { textDecoration: 'none', color: 'white', fontWeight: '500', cursor: 'pointer' };