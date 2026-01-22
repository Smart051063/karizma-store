import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';

export default function MenPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all'); // الحالة الافتراضية: عرض الكل

  useEffect(() => {
    // بناء الاستعلام بناءً على الزر المضغوط
    let occasionCondition = "";
    if (filter !== 'all') {
      occasionCondition = `&& occasion == "${filter}"`;
    }

    const query = `*[_type == "product" && subCategory == "men" ${occasionCondition}]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url
    }`;

    client.fetch(query).then((data) => setProducts(data));
  }, [filter]); // إعادة التشغيل كلما تغير الفلتر

  return (
    <div style={{ padding: '20px', direction: 'rtl', textAlign: 'center' }}>
      <h1 style={{ color: '#d4af37' }}>👔 قسم العطور الرجالية</h1>

      {/* أزرار الفلترة الذكية */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => setFilter('all')} style={buttonStyle(filter === 'all')}>الكل</button>
        <button onClick={() => setFilter('gifts')} style={buttonStyle(filter === 'gifts')}>🎁 هدايا رجالية</button>
        <button onClick={() => setFilter('wedding')} style={buttonStyle(filter === 'wedding')}>💍 عطور زفاف</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={cardStyle}>
               <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
               <h3>{product.name}</h3>
               <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{product.price} جنيه</p>
               <button style={cartButtonStyle}>إضافة للسلة 🛒</button>
            </div>
          ))
        ) : (
          <p>لا توجد عطور متوفرة لهذا التصنيف حالياً.. 🕵️‍♂️</p>
        )}
      </div>
    </div>
  );
}

// تنسيقات بسيطة للأزرار والكروت
const buttonStyle = (isActive) => ({
  padding: '10px 20px',
  borderRadius: '20px',
  border: '1px solid #d4af37',
  backgroundColor: isActive ? '#d4af37' : 'transparent',
  color: isActive ? 'black' : '#d4af37',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s'
});

const cardStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '10px',
  width: '250px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};

const cartButtonStyle = {
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%'
};