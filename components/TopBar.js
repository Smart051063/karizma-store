import Link from 'next/link';
import { useCart } from '../src/context/CartContext'; // تأكد من المسار الصحيح لديك

export default function TopBar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav style={{
      backgroundColor: 'black', color: 'white', padding: '15px 20px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'rtl',
      position: 'sticky', top: 0, zIndex: 1000
    }}>
      
      <Link href="/" style={{ textDecoration: 'none', color: '#d4af37', fontSize: '1.5rem', fontWeight: 'bold' }}>
        ✨ كاريزما
      </Link>

      {/* الروابط (تم إخفاؤها في الجوال للتبسيط، ويمكن إظهارها حسب الرغبة) */}
      <div style={{ display: 'flex', gap: '15px', fontSize: '1rem' }}>
        <Link href="/men" style={linkStyle}>رجالي</Link>
        <Link href="/women" style={linkStyle}>نسائي</Link>
        <Link href="/oriental" style={{...linkStyle, color: '#d4af37'}}>شرقي</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        
        {/* 👇 زر البحث الجديد */}
        <Link href="/search" style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>
          🔍 بحث
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

const linkStyle = {
  textDecoration: 'none', color: 'white', fontWeight: '500', cursor: 'pointer'
};