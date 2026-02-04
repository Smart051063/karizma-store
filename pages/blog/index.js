import React from 'react';
import Link from 'next/link';

export default function Blog() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', direction: 'rtl', fontFamily: 'Arial' }}>
      <h1>📝 مدونة كاريزما</h1>
      <p>جاري العمل على إضافة المقالات قريباً...</p>
      <br />
      <Link href="/">
        <button style={{ padding: '10px 20px', backgroundColor: '#d4af37', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          العودة للرئيسية
        </button>
      </Link>
    </div>
  );
}