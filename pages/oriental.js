import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';

export default function OrientalPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all'); // الحالة الافتراضية

  useEffect(() => {
    // 1. تحديد التصنيفات التي سنعرضها في هذه الصفحة
    // إذا كان "الكل"، نجلب كل الأنواع الشرقية والمنزلية
    let typeCondition = `&& subCategory in ["musk", "oriental", "incense", "burners", "fresheners", "mixes"]`;
    
    // إذا اختار العميل قسماً محدداً (مثل المسك)، نغير الشرط
    if (filter !== 'all') {
      typeCondition = `&& subCategory == "${filter}"`;
    }

    const query = `*[_type == "product" ${typeCondition}]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug,
      subCategory
    }`;

    client.fetch(query).then((data) => setProducts(data));
  }, [filter]);

  return (
    <div style={{ padding: '20px', direction: 'rtl', textAlign: 'center', minHeight: '80vh' }}>
      
      {/* عنوان الصفحة مع أيقونة معبرة */}
      <h1 style={{ color: '#d4af37', marginBottom: '10px' }}>🏯 الروائح الشرقية والمنزل</h1>
      <p style={{ color: '#888', marginBottom: '30px' }}>تشكيلة فاخرة من المسك، العود، والبخور لتعطير منزلك</p>

      {/* شريط التصنيفات الذكي (قابل للتمرير في الجوال) */}
      <div style={{ 
        marginBottom: '40px', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        flexWrap: 'wrap' 
      }}>
        <button onClick={() => setFilter('all')} style={buttonStyle(filter === 'all')}>الكل</button>
        <button onClick={() => setFilter('musk')} style={buttonStyle(filter === 'musk')}>💧 مسك</button>
        <button onClick={() => setFilter('oriental')} style={buttonStyle(filter === 'oriental')}>🪵 أعواد شرقية</button>
        <button onClick={() => setFilter('incense')} style={buttonStyle(filter === 'incense')}>🌫️ بخور</button>
        <button onClick={() => setFilter('burners')} style={buttonStyle(filter === 'burners')}>⚱️ مباخر</button>
        <button onClick={() => setFilter('fresheners')} style={buttonStyle(filter === 'fresheners')}>🏠 معطرات</button>
      </div>

      {/* شبكة المنتجات */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product._id} href={`/product/${product.slug?.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={cardStyle}>
                 {product.imageUrl ? (
                   <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '8px', marginBottom: '10px' }} 
                   />
                 ) : (
                   <div style={{height: '200px', backgroundColor: '#f9f9f9', borderRadius: '8px', display:'flex', alignItems:'center', justifyContent:'center'}}>صورة قريباً</div>
                 )}
                 
                 <h3 style={{ fontSize: '1.1rem' }}>{product.name}</h3>
                 <p style={{ fontSize: '0.9rem', color: '#888' }}>{getCategoryName(product.subCategory)}</p>
                 <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {product.price ? product.price : '---'} جنيه
                 </p>
                 
                 <button style={detailsButtonStyle}>عرض التفاصيل</button>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ marginTop: '50px', color: '#888' }}>
            <p>لا توجد منتجات في هذا القسم حالياً.. جاري التجهيز ⏳</p>
          </div>
        )}
      </div>
    </div>
  );
}

// دالة مساعدة لترجمة اسم القسم للعربية في الكرت
function getCategoryName(cat) {
  const names = {
    'musk': 'مسك فاخر',
    'oriental': 'عود شرقي',
    'incense': 'بخور',
    'burners': 'مباخر',
    'fresheners': 'معطر منزل',
    'mixes': 'ميكسات'
  };
  return names[cat] || cat;
}

// --- التنسيقات ---
const buttonStyle = (isActive) => ({
  padding: '8px 16px',
  borderRadius: '25px',
  border: isActive ? '1px solid #d4af37' : '1px solid #eee',
  backgroundColor: isActive ? '#d4af37' : 'white',
  color: isActive ? 'white' : '#555',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s',
  boxShadow: isActive ? '0 4px 10px rgba(212, 175, 55, 0.3)' : 'none'
});

const cardStyle = {
  border: '1px solid #f0f0f0',
  padding: '15px',
  borderRadius: '15px',
  width: '240px',
  textAlign: 'center',
  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  backgroundColor: 'white'
};

const detailsButtonStyle = {
  backgroundColor: '#1a1a1a',
  color: 'white',
  border: 'none',
  padding: '8px 20px',
  borderRadius: '5px',
  marginTop: '10px',
  cursor: 'pointer',
  width: '100%',
  fontSize: '0.9rem'
};