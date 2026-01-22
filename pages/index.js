import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client'; // تأكد من المسار

export default function Home() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    // 1. جلب أول بنر مفعل (isActive == true)
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
      
      {/* --- منطقة البنر الذكي (تظهر فقط إذا كان هناك عرض) --- */}
      {banner && (
        <div style={{ width: '100%', position: 'relative', marginBottom: '30px' }}>
          <Link href={banner.link || '/search'}> {/* إذا لم تضع رابطاً، يذهب للبحث */}
             <img 
               src={banner.imageUrl} 
               alt={banner.title} 
               style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', cursor: 'pointer' }} 
             />
          </Link>
          {/* نص فوق الصورة (اختياري) */}
          {(banner.title || banner.description) && (
             <div style={{
               position: 'absolute', bottom: '20px', right: '20px',
               backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '15px', borderRadius: '8px'
             }}>
               <h2 style={{ margin: 0, color: '#d4af37' }}>{banner.title}</h2>
               <p style={{ margin: '5px 0 0' }}>{banner.description}</p>
             </div>
          )}
        </div>
      )}

      {/* --- باقي محتوى الصفحة الرئيسية القديم --- */}
      {/* (إذا لم يكن هناك بنر، يظهر التصميم العادي القديم هنا) */}
      {!banner && (
        <div style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          height: '80vh', backgroundSize: 'cover', backgroundPosition: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          color: 'white', textAlign: 'center', position: 'relative'
        }}>
          {/* طبقة شفافة سوداء لوضوح النص */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', color: '#d4af37' }}>كاريزما للعطور</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
            <Link href="/oriental">
              <button style={ctaButtonStyle}>تسوق الآن</button>
            </Link>
          </div>
        </div>
      )}

      {/* قسم تصفح المجموعات */}
      <div style={{ padding: '50px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '40px' }}>تصفح مجموعاتنا</h2>
        {/* ... (باقي الكود الخاص بالأقسام كما هو) ... */}
         {/* يمكنك نسخ باقي الأقسام من ملفك القديم ووضعها هنا */}
      </div>

    </div>
  );
}

const ctaButtonStyle = {
  padding: '15px 40px', fontSize: '1.2rem', backgroundColor: '#d4af37', color: 'black',
  border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s'
};