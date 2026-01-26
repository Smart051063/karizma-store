import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client';

export default function Offers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 🔍 جلب المنتجات التي لها خصم أكبر من 0 فقط
    client.fetch(`*[_type == "product" && discount > 0]{
      _id, 
      name, 
      price, 
      discount, 
      "imageUrl": image.asset->url, 
      slug
    }`).then(setProducts);
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: '#f9f9f9', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      
      {/* عنوان الصفحة المميز */}
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ color: '#e74c3c', fontSize: '2.5rem', marginBottom: '10px', fontWeight: 'bold' }}>🔥 عروض وخصومات كاريزما</h1>
        <p style={{ color: '#555', fontSize: '1.2rem' }}>فرصتك الذهبية.. اقتنِ عطورك المفضلة بأفضل الأسعار</p>
      </div>

      {/* شبكة المنتجات */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {products.length > 0 ? (
          products.map((product) => {
            // حساب السعر بعد الخصم
            const originalPrice = product.price;
            const discountedPrice = Math.round(originalPrice - (originalPrice * product.discount / 100));

            return (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div style={offerCardStyle}>
                  
                  {/* شريط نسبة الخصم */}
                  <div style={{ 
                    position: 'absolute', top: '10px', right: '10px', 
                    backgroundColor: '#e74c3c', color: 'white', padding: '5px 10px', 
                    borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', zIndex: 2,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}>
                    خصم {product.discount}% 🔥
                  </div>

                  {/* الصورة */}
                  <div style={{ height: '220px', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
                     {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="hover-zoom" />}
                  </div>

                  {/* التفاصيل والأسعار */}
                  <div style={{ padding: '15px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#1a1a1a', margin: '0 0 10px', fontWeight: 'bold' }}>{product.name}</h3>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.9rem', color: '#999', textDecoration: 'line-through' }}>{originalPrice} ج.م</span>
                      <span style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '1.3rem' }}>{discountedPrice} ج.م</span>
                    </div>

                    <button style={{ 
                      marginTop: '10px', width: '100%', padding: '8px', 
                      backgroundColor: '#1a1a1a', color: '#d4af37', border: 'none', 
                      borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
                    }}>
                      أطلب العرض الآن 🛒
                    </button>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px', width: '100%' }}>
            <p style={{ fontSize: '1.5rem', color: '#777' }}>لا توجد عروض حالياً.. تابعنا قريباً! ⏳</p>
          </div>
        )}
      </div>

      {/* 👇 زر العودة للصفحة الرئيسية (تمت إضافته هنا) */}
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

      <style jsx>{`
        .hover-zoom:hover { transform: scale(1.1); }
      `}</style>
    </div>
  );
}

// تنسيق الكارت (أكبر وأفخم من العادي)
const offerCardStyle = { 
  width: '250px', backgroundColor: 'white', borderRadius: '15px', 
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)', border: '1px solid #eee', 
  cursor: 'pointer', transition: 'transform 0.2s', position: 'relative', overflow: 'hidden'
};