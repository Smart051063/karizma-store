import Link from 'next/link';
import { useCart } from '../src/context/CartContext'; // 👈 استيراد السلة

export default function TopBar() {
  // 👈 استخراج بيانات السلة
  const { cartItems } = useCart();

  // 👈 معادلة حسابية بسيطة لجمع عدد كل المنتجات
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav style={{
      backgroundColor: 'black', color: 'white', padding: '15px 20px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'rtl',
      position: 'sticky', top: 0, zIndex: 1000 // جعلنا القائمة تثبت في الأعلى
    }}>
      
      <Link href="/" style={{ textDecoration: 'none', color: '#d4af37', fontSize: '1.5rem', fontWeight: 'bold' }}>
        ✨ كاريزما للعطور
      </Link>

      <div style={{ display: 'flex', gap: '20px', fontSize: '1.1rem' }}>
        <Link href="/men" style={linkStyle}>رجالي</Link>
        <Link href="/women" style={linkStyle}>نسائي</Link>
        <Link href="/oriental" style={{...linkStyle, color: '#d4af37'}}>🏯 شرقي</Link>
      </div>

      {/* منطقة السلة */}
      <Link href="/cart" style={{ textDecoration: 'none', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <span>🛒 السلة</span>
          {/* 👇 هنا يظهر الرقم السحري المتغير */}
          <span style={{ 
            backgroundColor: '#d4af37', 
            color: 'black', 
            borderRadius: '50%', 
            padding: '2px 8px', 
            fontSize: '0.9rem',
            fontWeight: 'bold' 
          }}>
            {totalItems}
          </span>
        </div>
      </Link>
    </nav>
  );
}

const linkStyle = {
  textDecoration: 'none', color: 'white', fontWeight: '500', cursor: 'pointer'
};