import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext'; // 👈 1. استيراد السلة

export default function ProductDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  
  // 👈 2. استخراج "أداة الإضافة" من السلة
  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        _id, // مهم جداً: نحتاج الآيدي لتمييز المنتجات في السلة
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
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', 
        gap: '50px', alignItems: 'flex-start' 
      }}>
        
        <div style={{ flex: '1', maxWidth: '500px' }}>
          {product.imageUrl && (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ width: '100%', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', border: '1px solid #eee' }} 
            />
          )}
        </div>

        <div style={{ flex: '1', maxWidth: '500px', textAlign: 'right' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1a1a1a' }}>{product.name}</h1>
          <p style={{ color: '#888', fontSize: '1.2rem' }}>{product.subCategory}</p>
          
          <h2 style={{ color: '#d4af37', fontSize: '2rem', margin: '20px 0' }}>
            {product.price ? product.price : '---'} جنيه
          </h2>
          
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#555', marginBottom: '30px' }}>
            {product.description || "وصف العطر سيتاح قريباً.."}
          </p>

          {/* 👇 3. ربط الزر بدالة الإضافة */}
          <button 
            onClick={() => addToCart(product)}
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
            إضافة للسلة 🛒
          </button>
        </div>
      </div>
    </div>
  );
}