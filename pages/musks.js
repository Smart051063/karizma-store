import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';

export default function Musks() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 👇 استعلام ذكي (يقبل musks أو Musks)
    const query = `*[_type == "product" && (category == "musks" || category == "Musks")]{
      _id, 
      name, 
      price, 
      "imageUrl": image.asset->url, 
      slug
    }`;
    
    client.fetch(query).then(setProducts);
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      
      {/* العنوان */}
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ color: '#d4af37', fontSize: '2.5rem', marginBottom: '10px' }}>🧴 عالم المسك</h1>
        <p style={{ color: '#555', fontSize: '1.2rem' }}>نقاء ورائحة تأسر الحواس.. مسك كاريزما الخاص</p>
      </div>

      {/* شبكة المنتجات */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
              <div style={productCardStyle}>
                <div style={{ height: '180px', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
                   {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ padding: '10px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1rem', color: '#1a1a1a', margin: '0 0 5px', fontWeight: 'bold' }}>{product.name}</h3>
                  <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem' }}>{product.price} ج.م</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%', marginTop: '50px', color: '#777' }}>جاري تحضير أفخم أنواع المسك... 🧴✨</p>
        )}
      </div>

      
    </div>
  );
}

// تنسيق الكارت
const productCardStyle = { 
  width: '170px', backgroundColor: 'white', borderRadius: '10px', 
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #d4af37', 
  cursor: 'pointer', transition: 'transform 0.2s', margin: '10px'
};