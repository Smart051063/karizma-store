import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client'; // تأكد من المسار
import Link from 'next/link';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // حماية: لا نبحث إلا إذا كتب المستخدم حرفين على الأقل
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }

    // تأخير البحث قليلاً (Debounce) لتخفيف الضغط على السيرفر وحماية الموقع
    const delayDebounceFn = setTimeout(() => {
      setLoading(true);
      // البحث في الاسم والوصف والتصنيف
      const query = `*[_type == "product" && (name match "*${searchTerm}*" || subCategory match "*${searchTerm}*" || description match "*${searchTerm}*")] {
        _id,
        name,
        price,
        "imageUrl": image.asset->url,
        slug,
        subCategory
      }`;

      client.fetch(query).then((data) => {
        setResults(data);
        setLoading(false);
      });
    }, 500); // ينتظر نصف ثانية بعد التوقف عن الكتابة

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div style={{ padding: '30px 20px', direction: 'rtl', minHeight: '80vh', textAlign: 'center' }}>
      <h1 style={{ color: '#d4af37', marginBottom: '20px' }}>🔍 ابحث عن عطرك المفضل</h1>
      
      {/* حقل الإدخال */}
      <input
        type="text"
        placeholder="اكتب اسم العطر، العود، أو المسك..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%', maxWidth: '500px', padding: '15px', fontSize: '1.2rem',
          borderRadius: '30px', border: '2px solid #ddd', outline: 'none',
          marginBottom: '40px', textAlign: 'center'
        }}
      />

      {/* مؤشر التحميل */}
      {loading && <p style={{ color: '#888' }}>جاري البحث... ⏳</p>}

      {/* النتائج */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {results.length > 0 ? (
          results.map((product) => (
            <Link key={product._id} href={`/product/${product.slug?.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={cardStyle}>
                 {product.imageUrl && (
                   <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '10px' }} />
                 )}
                 <h3 style={{ fontSize: '1.1rem' }}>{product.name}</h3>
                 <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{product.price} جنيه</p>
              </div>
            </Link>
          ))
        ) : (
          searchTerm.length >= 2 && !loading && <p>لا توجد نتائج مطابقة.. جرب كلمة أخرى 🕵️‍♂️</p>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  border: '1px solid #eee', padding: '15px', borderRadius: '10px',
  width: '220px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  cursor: 'pointer', backgroundColor: 'white'
};