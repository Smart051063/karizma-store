import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext'; // 👈 استيراد السلة
import { useLanguage } from '../../src/context/LanguageContext'; // 👈 استيراد اللغة

export default function ProductDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  
  // 1. استدعاء أدوات السلة واللغة
  const { addToCart } = useCart(); 
  const { language, t } = useLanguage();

  useEffect(() => {
    if (slug) {
      // جلب البيانات (العربية والإنجليزية)
      const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        _id,
        name,
        nameEn,
        price,
        description,
        descriptionEn,
        "imageUrl": image.asset->url,
        category,
        subCategory
      }`;
      client.fetch(query).then((data) => setProduct(data));
    }
  }, [slug]);

  if (!product) return <div style={{textAlign:'center', marginTop:'50px'}}>... ⏳</div>;

  return (
    <div style={{ padding: '50px', minHeight: '80vh' }}>
      <div style={{ 
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', 
        gap: '50px', alignItems: 'flex-start' 
      }}>
        
        {/* صورة المنتج */}
        <div style={{ flex: '1', maxWidth: '500px' }}>
          {product.imageUrl && (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ width: '100%', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', border: '1px solid #eee' }} 
            />
          )}
        </div>

        {/* تفاصيل المنتج (تتغير حسب اللغة) */}
        <div style={{ flex: '1', maxWidth: '500px' }}>
          
          {/* عرض الاسم حسب اللغة المختارة */}
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1a1a1a' }}>
            {language === 'en' ? (product.nameEn || product.name) : product.name}
          </h1>
          
          <p style={{ color: '#888', fontSize: '1.2rem' }}>{product.subCategory}</p>
          
          <h2 style={{ color: '#d4af37', fontSize: '2rem', margin: '20px 0' }}>
            {product.price ? product.price : '---'} {t.price}
          </h2>
          
          {/* عرض الوصف حسب اللغة المختارة */}
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#555', marginBottom: '30px' }}>
            {language === 'en' 
              ? (product.descriptionEn || "Description not available yet.") 
              : (product.description || "وصف العطر سيتاح قريباً..")
            }
          </p>

          {/* زر الإضافة للسلة (تم إصلاحه) */}
          <button 
            onClick={() => addToCart(product)} // 👈 تفعيل الزر
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '15px 40px',
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold',
              transition: '0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'black'}
          >
            {t.addToCart} {/* 👈 النص يتغير (إضافة للسلة / Add to Cart) */}
          </button>
        </div>
      </div>
    </div>
  );
}