import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client';

export default function Home() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    // جلب البنر المفعل فقط
    const query = `*[_type == "banner" && isActive == true][0]{
      title,
      description,
      link,
      "imageUrl": image.asset->url
    }`;
    client.fetch(query).then((data) => setBanner(data));
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white' }}>
      
      {/* 1️⃣ قسم البنر (يظهر فقط إذا كان مفعلاً، وفوق الموقع) */}
      {banner && (
        <div style={{ 
          backgroundColor: '#f8f8f8', borderBottom: '1px solid #ddd', 
          padding: '10px', textAlign: 'center', position: 'relative' 
        }}>
          <Link href={banner.link || '/search'}>
            <img 
              src={banner.imageUrl} 
              alt={banner.title} 
              style={{ 
                width: '100%', maxWidth: '1200px', height: 'auto', 
                maxHeight: '250px', // 👈 جعلناه أنحف لكي لا يغطي الشاشة
                objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' 
              }} 
            />
          </Link>
          {/* زر إغلاق وهمي (جماليات) */}
          <button 
             onClick={() => setBanner(null)}
             style={{
               position: 'absolute', top: '15px', right: '15px',
               background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none',
               borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer'
             }}
          >✕</button>
        </div>
      )}

      {/* 2️⃣ الشاشة الرئيسية الفخمة (ستظهر دائماً الآن! 😍) */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        height: '80vh', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        color: 'white', textAlign: 'center', position: 'relative'
      }}>
        {/* طبقة تعتيم للصورة */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', color: '#d4af37' }}>كاريزما للعطور</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
          <Link href="/oriental"> {/* زر تسوق الآن يذهب للأقسام */}
            <button style={ctaButtonStyle}>تسوق الآن</button>
          </Link>
        </div>
      </div>

      {/* 3️⃣ قسم تصفح المجموعات */}
      <div style={{ padding: '50px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '40px' }}>تصفح مجموعاتنا</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          
          <Link href="/men" style={{ textDecoration: 'none' }}>
            <div style={categoryCardStyle}>
              <span style={{ fontSize: '3rem' }}>🤵</span>
              <h3 style={{ color: '#333', marginTop: '10px' }}>عطور رجالية</h3>
            </div>
          </Link>

          <Link href="/women" style={{ textDecoration: 'none' }}>
            <div style={categoryCardStyle}>
              <span style={{ fontSize: '3rem' }}>💃</span>
              <h3 style={{ color: '#333', marginTop: '10px' }}>عطور نسائية</h3>
            </div>
          </Link>

          <Link href="/oriental" style={{ textDecoration: 'none' }}>
            <div style={categoryCardStyle}>
              <span style={{ fontSize: '3rem' }}>🕌</span>
              <h3 style={{ color: '#333', marginTop: '10px' }}>الروائح الشرقية</h3>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}

// التنسيقات (Styles)
const ctaButtonStyle = {
  padding: '15px 40px', fontSize: '1.2rem', backgroundColor: '#d4af37', color: 'black',
  border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s'
};

const categoryCardStyle = {
  width: '200px', padding: '30px', borderRadius: '15px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)', cursor: 'pointer',
  transition: 'transform 0.3s', backgroundColor: 'white'
};