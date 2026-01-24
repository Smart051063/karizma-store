import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client';

export default function Home() {
  const [banner, setBanner] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "banner" && isActive == true][0]{title, "imageUrl": image.asset->url}`).then(setBanner);
    client.fetch(`*[_type == "product"]{_id, name, price, discount, "imageUrl": image.asset->url, slug}`).then(setProducts);
  }, []);

  // النص المكرر للشريط لضمان عدم وجود فجوات
  const tickerText = "✨ أهلاً بكم في كاريزما للعطور - خصومات تصل إلى 20% على الميكسات والمسك - شحن سريع لجميع المحافظات 🚚 - اطلب الآن عبر واتساب ";

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1️⃣ شريط الأخبار المتحرك (المتلاحم - Infinite Loop) */}
      <div className="ticker-wrap">
        <div className="ticker">
          <span className="ticker-item">{tickerText}</span>
          <span className="ticker-item">{tickerText}</span>
          <span className="ticker-item">{tickerText}</span>
          <span className="ticker-item">{tickerText}</span>
        </div>
      </div>

      {/* 2️⃣ قسم البنر العلوي */}
      {banner && (
        <div className="fade-in" style={{ backgroundColor: '#fff', textAlign: 'center', borderBottom: '1px solid #eee', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
          <img 
            src={banner.imageUrl} 
            alt={banner.title} 
            style={{ width: '100%', height: 'auto', maxHeight: '350px', objectFit: 'cover' }} 
          />
        </div>
      )}

      {/* 3️⃣ الشاشة الترحيبية */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        height: '60vh', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        position: 'relative', color: 'white', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }} className="fade-in-up">
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#d4af37', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>كاريزما للعطور</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '25px', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
          
          <Link href="/mixes">
            <button className="hover-btn" style={ctaButtonStyle}>تسوق الآن</button>
          </Link>
        </div>
      </div>

      {/* 4️⃣ تصفح مجموعاتنا */}
      <div style={{ padding: '50px 10px', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '1.8rem' }} className="fade-in">تصفح مجموعاتنا</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          
          <CategoryCircle href="/offers" emoji="🔥"