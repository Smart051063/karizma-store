import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { client } from '../src/sanity/lib/client';

export default function Detergents() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // جلب المنتجات + الصور مباشرة
    client.fetch(`*[_type == "product" && category == "detergents"]{
      _id,
      name,
      price,
      slug,
      "imageUrl": image.asset->url
    }`).then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', padding: '50px 20px' }}>
      <Head>
        <title>منظفات ومطهرات | Karizma Store</title>
      </Head>

      <h1 style={{ textAlign: 'center', color: '#d4af37', marginBottom: '40px', fontSize: '2.5rem' }}>
        🧼 منظفات ومطهرات
      </h1>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
           <p style={{ fontSize: '1.2rem', color: '#777' }}>جاري تحميل المنتجات...</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {products.map((product) => (
             product.slug?.current && (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div className="product-card" style={productCardStyle}>
                  <div style={{ height: '250px', overflow: 'hidden', borderRadius: '10px 10px 0 0', position: 'relative' }}>
                    {product.imageUrl ? (
                       <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                       <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                         لا توجد صورة
                       </div>
                    )}
                  </div>
                  <div style={{ padding: '15px', textAlign: 'center' }}>
                    <h3 style={{ fontWeight: 'bold', margin: '10px 0', color: '#333', fontSize: '1.1rem' }}>{product.name}</h3>
                    <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} ج.م</p>
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>
      )}

      {/* 👇 زر العودة للصفحة الرئيسية (تمت إضافته هنا) */}
      <div style={{ textAlign: 'center', marginTop: '60px', paddingBottom: '20px' }}>
        <Link href="/">
          <button style={{ 
            padding: '12px 30px', 
            backgroundColor: '#111', 
            color: '#d4af37', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '1rem', 
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            العودة للصفحة الرئيسية 🏠
          </button>
        </Link>
      </div>

    </div>
  );
}

const productCardStyle = { 
  width: '280px', 
  backgroundColor: 'white', 
  borderRadius: '15px', 
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)', 
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  border: '1px solid #eee'
};