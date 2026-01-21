import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  // نستدعي السلة لنعرف عدد المنتجات
  const { cart } = useCart();

  return (
    <nav style={{ 
      padding: '15px 40px', 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      direction: 'rtl',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      
      {/* --- المجموعة اليمنى: الشعار + روابط الأقسام --- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        
        {/* رابط الصفحة الرئيسية (الشعار) */}
        <Link href="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          ✨ كاريزما للعطور
        </Link>

        {/* روابط الأقسام الجديدة */}
        <Link href="/men" style={{ textDecoration: 'none', color: '#e0e0e0', fontSize: '1.1rem', transition: '0.3s' }}>
           رجالي
        </Link>

        <Link href="/women" style={{ textDecoration: 'none', color: '#e0e0e0', fontSize: '1.1rem', transition: '0.3s' }}>
           نسائي
        </Link>
      </div>

      {/* --- المجموعة اليسرى: رابط السلة مع العداد --- */}
      <Link href="/cart" style={{ textDecoration: 'none', color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span>السلة</span>
        🛒 
        <span style={{ 
          backgroundColor: '#d4af37', 
          color: 'black', 
          borderRadius: '50%', 
          padding: '2px 8px', 
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}>
          {cart.length}
        </span>
      </Link>
    </nav>
  );
}