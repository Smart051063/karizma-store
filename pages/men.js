import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';

export default function MenPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 💡 السر كله هنا!
    // طلبنا منه إحضار المنتجات التي نوعها "product" 
    // AND (&&)
    // تصنيفها الفرعي هو "men"
    const query = `*[_type == "product" && subCategory == "men"]{
      _id,
      name,
      price,
      image
    }`;

    client.fetch(query).then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ padding: '20px', direction: 'rtl' }}>
      <h1 style={{ textAlign: 'center', color: '#d4af37' }}>👔 قسم العطور الرجالية</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', width: '250px', textAlign: 'center' }}>
               {/* عرض الصورة والاسم والسعر هنا بنفس طريقة الصفحة الرئيسية */}
               <h3>{product.name}</h3>
               <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{product.price} جنيه</p>
            </div>
          ))
        ) : (
          <p>جاري تحميل العطور الرجالية الفخمة... ⏳</p>
        )}
      </div>
    </div>
  );
}