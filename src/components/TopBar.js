import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext'; // 👈 استدعاء السلة

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  // 👇 جلب عدد المنتجات من السلة
  const { cartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', padding: '15px 20px', color: 'white', borderBottom: '3px solid #d4af37' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
        
        {/* 1️⃣ اللوجو */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#d4af37', fontFamily: 'serif' }}>Karizma ✨</h1>
        </Link>

        {/* 2️⃣ شريط البحث والروابط */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'center' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>الرئيسية</Link>
          <Link href="/offers" style={{ color: '#ff4d4d', textDecoration: 'none', fontWeight: 'bold' }}>🔥 العروض</Link>
          
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#333', borderRadius: '20px', padding: '5px 15px' }}>
            <input 
              type="text" 
              placeholder="بحث..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '120px' }}
            />
            <button type="submit" style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer' }}>🔍</button>
          </form>
        </div>

        {/* 3️⃣ أيقونة السلة مع العداد الأحمر */}
        <Link href="/cart" style={{ position: 'relative', color: '#d4af37', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          {/* رسم أيقونة السلة (SVG) يدوياً لتجنب مشاكل المكاتب */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          
          {/* 👇 العداد الأحمر (يظهر فقط إذا كان العدد أكبر من 0) */}
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#ff0000',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '11px',
              fontWeight: 'bold',
              minWidth: '18px',
              textAlign: 'center',
              boxShadow: '0 0 5px rgba(0,0,0,0.5)'
            }}>
              {cartCount}
            </span>
          )}
        </Link>

      </div>
    </div>
  );
}