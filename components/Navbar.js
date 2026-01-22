import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
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
      
      {/* المجموعة اليمنى: الشعار + الروابط */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        <Link href="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          ✨ كاريزما للعطور
        </Link>

        {/* الروابط الجديدة */}
        <Link href="/men" style={{ textDecoration: 'none', color: '#e0e0e0', fontSize: '1.1rem' }}>
           رجالي
        </Link>

        <Link href="/women" style={{ textDecoration: 'none', color: '#e0e0e0', fontSize: '1.1rem' }}>
           نسائي
        </Link>

        <Link href="/unisex" style={{ textDecoration: 'none', color: '#e0e0e0', fontSize: '1.1rem' }}>
           للجنسين 👫
        </Link>

        <Link href="/gulf" style={{ textDecoration: 'none', color: '#e0e0e0', fontSize: '1.1rem' }}>
           خليجي 🪵
        </Link>
      </div>

      {/* المجموعة اليسرى: السلة */}
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