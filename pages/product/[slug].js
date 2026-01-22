import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../src/sanity/lib/client'; // لاحظ النقطتين الإضافيتين لأننا داخل مجلد فرعي

export default function ProductDetails() {
  const router = useRouter();
  const { slug } = router.query; // نأخذ اسم العطر من الرابط
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (slug) {
      // استعلام لجلب منتج واحد فقط بناءً على الرابط (slug)
      const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        name,
        price,
        description,
        "imageUrl": image.asset->url,
        category,
        subCategory
      }`;
      
      client.fetch(query).then((data) => setProduct(data));
    }
  }, [slug]);

  if (!product) return <div style={{textAlign:'center', marginTop:'50px'}}>جاري تحميل العطر... ⏳</div>;

  return (
    <div style={{ padding: '50px', direction: 'rtl', minHeight: '80vh' }}>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '50px', 
        alignItems: 'flex-start' 
      }}>
        
        {/* قسم الصورة */}
        <div style={{ flex: '1', maxWidth: '500px' }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              borderRadius: '15px', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              border: '1px solid #eee'
            }} 
          />
        </div>

        {/* قسم التفاصيل */}
        <div style={{ flex: '1', maxWidth: '500px', textAlign: 'right' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1a1a1a' }}>{product.name}</h1>
          <p style={{ color: '#888', fontSize: '1.2rem' }}>{product.category} - {product.subCategory}</p>
          
          <h2 style={{ color: '#d4af37', fontSize: '2rem', margin: '20px 0' }}>{product.price} جنيه</h2>
          
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#555', marginBottom: '30px' }}>
            {product.description || "لا يوجد وصف متاح لهذا العطر حالياً، لكننا نضمن لك جودته وثباته الرائع! ✨"}
          </p>

          <button style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '15px 40px',
            fontSize: '1.2rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold'
          }}>
            إضافة للسلة 🛒
          </button>
        </div>

      </div>
    </div>
  );
}