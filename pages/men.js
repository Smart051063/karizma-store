import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';

export default function MenPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let occasionCondition = "";
    if (filter !== 'all') {
      occasionCondition = `&& occasion == "${filter}"`;
    }

    // 👇 التعديل هنا: غيرنا subCategory إلى category
    // وتأكدنا أنه يبحث عن كلمة "men"
    const query = `*[_type == "product" && category == "men" ${occasionCondition}]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug 
    }`;

    client.fetch(query).then((data) => {
        console.log("البيانات القادمة:", data); // هذا السطر سيساعدنا نرى هل وصلت البيانات أم لا في الكونسول
        setProducts(data);
    });
  }, [filter]);

  return (
    <div style={{ padding: '20px', direction: 'rtl', textAlign: 'center' }}>
      <h1 style={{ color: '#d4af37' }}>👔 قسم العطور الرجالية</h1>

      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => setFilter('all')} style={buttonStyle(filter === 'all')}>الكل</button>
        <button onClick={() => setFilter('gifts')} style={buttonStyle(filter === 'gifts')}>🎁 هدايا رجالية</button>
        <button onClick={() => setFilter('wedding')} style={buttonStyle(filter === 'wedding')}>💍 عطور زفاف</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
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
                 
                 <h3>{product.name}</h3>
                 <p style={{ color: '#d4af37', fontWeight: 'bold' }}>
                    {product.price ? product.price : '---'} جنيه
                 </p>
                 
                 <button style={detailsButtonStyle}>عرض التفاصيل 📄</button>
              </div>
            </Link>
          ))
        ) : (
          <p>لا توجد عطور متوفرة لهذا التصنيف حالياً.. 🕵️‍♂️</p>
        )}
      </div>
    </div>
  );
}

// --- التنسيقات ---
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
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  backgroundColor: 'white'
};

const detailsButtonStyle = {
  backgroundColor: '#1a1a1a',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%'
};