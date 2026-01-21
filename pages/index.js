import React from 'react';
import { client } from '../src/sanity/lib/client';
import { useCart } from '../context/CartContext'; // استيراد السلة
import Link from 'next/link';

// 1. الدالة الرئيسية التي تبني شكل الصفحة
export default function Home({ perfumes }) {
  // تفعيل السلة داخل الصفحة
  const { addToCart } = useCart();

  return (
    <div style={{ padding: '20px', direction: 'rtl', fontFamily: 'Arial', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* عنوان الصفحة */}
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '40px', fontSize: '2.5rem' }}>
        ✨ مجموعة كاريزما للعطور
      </h1>

      {/* حاوية المنتجات */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        
        {/* الدوران على كل عطر لعرضه */}
        {perfumes?.map((perfume) => (
          <div key={perfume._id} style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '15px', 
            padding: '20px', 
            width: '280px', 
            textAlign: 'center',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            
            {/* صورة العطر */}
            {perfume.imageUrl && (
              <img 
                src={perfume.imageUrl} 
                alt={perfume.name} 
                style={{ width: '100%', height: '250px', objectFit: 'contain', marginBottom: '15px' }} 
              />
            )}
            
            {/* اسم وسعر العطر */}
            <h3 style={{ margin: '10px 0', fontSize: '1.2rem' }}>{perfume.name}</h3>
            <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem' }}>{perfume.price} جنيه</p>

            {/* زر الإضافة للسلة */}
            <button 
              onClick={() => addToCart(perfume)}
              style={{ 
                backgroundColor: 'black', 
                color: 'white', 
                padding: '12px 25px', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                marginTop: '10px',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              إضافة للسلة 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. دالة جلب البيانات من السيرفر (تعمل قبل تحميل الصفحة)
export const getServerSideProps = async () => {
  // أمر البحث (Query) لجلب الاسم، السعر، ورابط الصورة
  const query = '*[_type == "perfume"]{ _id, name, price, "imageUrl": image.asset->url }';
  const perfumes = await client.fetch(query);

  return {
    props: { perfumes }
  }
}