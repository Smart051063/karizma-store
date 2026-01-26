import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client';

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // جلب جميع المنتجات بلا استثناء
    client.fetch(`*[_type == "product"]{_id, name, price, discount, "imageUrl": image.asset->url, slug}`).then(setProducts);
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', padding: '40px 20px', backgroundColor: '#f9f9f9', fontFamily: 'Arial, sans-serif' }}>
      
      <h1 style={{ textAlign: 'center', color: '#d4af37', marginBottom: '10px', fontSize: '2.5rem', fontWeight: 'bold' }}>🛍️ متجر كاريزما</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>تصفح مجموعتنا الكاملة من العطور الفاخرة</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        {products.length > 0 ? (
          products.map((product) => {
            // تجاهل المنتجات التي ليس لها رابط
            if (!product.slug || !product.slug.current) return null;

            // حساب السعر والخصم
            const hasDiscount = product.discount > 0;
            const originalPrice = product.price;
            const finalPrice = hasDiscount 
              ? Math.round(originalPrice - (originalPrice * product.discount / 100)) 
              : originalPrice;

            return (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div className="product-card" style={cardStyle}>
                  
                  {/* صورة المنتج + شريط الخصم */}
                  <div style={{ height: '200px', overflow: 'hidden', borderRadius: '10px 10px 0 0', position: 'relative', backgroundColor: '#fff' }}>
                      {hasDiscount && (
                        <div style={{ 
                          position: 'absolute', top: '10px', left: '10px', 
                          backgroundColor: '#e74c3c', color: 'white', 
                          fontSize: '0.8rem', padding: '5px 10px', 
                          borderRadius: '20px', fontWeight: 'bold', zIndex: 2,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}>
                          خصم {product.discount}%
                        </div>
                      )}
                      
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>لا توجد صورة</div>
                      )}
                  </div>

                  {/* التفاصيل والأسعار */}
                  <div style={{ padding: '15px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1rem', color: '#333', margin: '0 0 10px', height: '40px', overflow: 'hidden', lineHeight: '1.4' }}>{product.name}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexDirection: 'row-reverse' }}>
                      {/* السعر النهائي (باللون الذهبي) */}
                      <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem', margin: 0 }}>{finalPrice} ج.م</p>
                      
                      {/* السعر القديم (مشطوب) إن وجد */}
                      {hasDiscount && (
                        <span style={{ fontSize: '0.9rem', color: '#999', textDecoration: 'line-through' }}>{originalPrice}</span>
                      )}
                    </div>

                    <button style={btnStyle}>اضف للسلة 🛒</button>
                  </div>

                </div>
              </Link>
            );
          })
        ) : (
          <p>جاري تحميل المنتجات...</p>
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

      {/* تنسيقات CSS داخلية للتأثيرات */}
      <style jsx>{`
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
}

// --- التنسيقات ---
const cardStyle = { 
  width: '220px', backgroundColor: 'white', borderRadius: '15px', 
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee', 
  cursor: 'pointer', overflow: 'hidden'
};

const btnStyle = {
  marginTop: '15px', padding: '8px 20px', width: '100%',
  backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '5px',
  cursor: 'pointer', fontSize: '0.9rem'
};