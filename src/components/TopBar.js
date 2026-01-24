import React from 'react';
import Link from 'next/link';
// 👇 مسار استيراد السلة الصحيح بالنسبة لمكان هذا الملف
import { useCart } from '../context/CartContext'; 

export default function TopBar() {
  const cartData = useCart();
  // التأكد من أن السلة موجودة لتجنب الأخطاء
  const totalQty = cartData ? cartData.totalQty : 0;

  return (
    <div style={topBarStyle}>
      <div style={containerStyle}>
        
        {/* 1️⃣ اللوجو */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={logoStyle}>Karizma ✨</h1>
        </Link>

        {/* 2️⃣ القائمة */}
        <div style={navLinksStyle}>
          <Link href="/" style={linkStyle}>الرئيسية</Link>
          <Link href="/offers" style={{ ...linkStyle, color: '#e74c3c', fontWeight: 'bold' }}>
            العروض 🔥
          </Link>
          <Link href="/search" style={linkStyle}>بحث 🔍</Link>
        </div>

        {/* 3️⃣ السلة */}
        <Link href="/cart" style={{ textDecoration: 'none', position: 'relative' }}>
          <div style={cartIconStyle}>
            🛒
            {totalQty > 0 && (
              <span style={badgeStyle}>{totalQty}</span>
            )}
          </div>
        </Link>

      </div>
    </div>
  );
}

// --- التنسيقات ---
const topBarStyle = {
  backgroundColor: '#1a1a1a', 
  color: '#d4af37', 
  padding: '15px 0',
  position: 'sticky', top: 0, zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
};

const containerStyle = {
  maxWidth: '1200px', margin: '0 auto', padding: '0 20px',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};

const logoStyle = {
  margin: 0, fontSize: '1.8rem', color: '#d4af37', fontFamily: 'serif'
};

const navLinksStyle = {
  display: 'flex', gap: '20px'
};

const linkStyle = {
  color: '#fff', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s'
};

const cartIconStyle = {
  fontSize: '1.5rem', color: '#fff', cursor: 'pointer', position: 'relative'
};

const badgeStyle = {
  position: 'absolute', top: '-8px', right: '-10px',
  backgroundColor: '#e74c3c', color: 'white',
  borderRadius: '50%', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold'
};