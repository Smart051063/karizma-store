import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';

export default function MakeupPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 👇 استعلام ذكي يبحث عن كل صيغ "مكياج" المحتملة
    const query = `*[_type == "product" && (
      category == "makeup" || 
      category == "Makeup" || 
      category == "beauty" || 
      category == "(Makeup) تجميل وعناية"
    )]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug 
    }`;

    client.fetch(query).then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ padding: '20px', direction: 'rtl', textAlign: 'center' }}>
      
      <h1 style={{ color: '#d4af37', marginBottom: '30px' }}>💄 قسم التجميل والعناية</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product._id} href={`/product/${product.slug?.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={cardStyle}>
                 {product.imageUrl && (
                   <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '8px', marginBottom: '10px' }} 
                   />
                 )}
                 
                 <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h3>
                 <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '16px' }}>
                    {product.price ? product.price : '---'} جنيه
                 </p>
                 
                 <button style={detailsButtonStyle}>عرض التفاصيل 📄</button>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ marginTop: '50px', color: '#777' }}>
            <h2>💄 قسم المكياج</h2>
            <p>جاري تحميل المنتجات... أو تأكد من إضافة منتجات لهذا القسم.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- التنسيقات ---
const cardStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '10px',
  width: '250px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  backgroundColor: 'white'
};

const detailsButtonStyle = {
  backgroundColor: '#1a1a1a',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%',
  marginTop: '10px'
};
{/* 👇 زر العودة للصفحة الرئيسية */}
<div style={{ marginTop: '50px', textAlign: 'center', paddingBottom: '20px' }}>
  <Link href="/" style={{ 
    display: 'inline-block', 
    padding: '12px 25px', 
    backgroundColor: '#1a1a1a', 
    color: '#d4af37', 
    textDecoration: 'none', 
    borderRadius: '8px', 
    fontWeight: 'bold',
    fontSize: '1.1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }}>
    🏠 العودة للصفحة الرئيسية
  </Link>
</div>