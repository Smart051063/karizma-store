import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';
import Link from 'next/link';

export default function BurnersPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 👇 استعلام لجلب منتجات قسم "burners" أو "Burners"
    const query = `*[_type == "product" && (category == "burners" || category == "Burners")]{
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
      
      <h1 style={{ color: '#d4af37', marginBottom: '30px' }}>♨️ قسم الفوحات والمباخر</h1>

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
          <p>جاري تحميل الفوحات... ⏳</p>
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
{/* 👇 زر العودة للصفحة الرئيسية */}
      <div style={{ marginTop: '60px', marginBottom: '30px', textAlign: 'center' }}>
        <Link href="/" style={{ 
          display: 'inline-block', 
          padding: '12px 30px', 
          backgroundColor: '#1a1a1a', 
          color: '#d4af37', 
          textDecoration: 'none', 
          borderRadius: '8px', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}>
          🏠 العودة للصفحة الرئيسية
        </Link>
      </div>
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