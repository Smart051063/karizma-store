import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    // جلب أحدث 4 منتجات فقط للعرض في الصفحة الرئيسية
    const query = `*[_type == "product"] | order(_createdAt desc)[0...4] {
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug,
      subCategory
    }`;

    client.fetch(query).then((data) => setNewArrivals(data));
  }, []);

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1. البانر الرئيسي (Hero Section) */}
      <div style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', color: '#d4af37' }}>كاريزما للعطور</h1>
          <p style={{ fontSize: '1.5rem', color: 'white', marginBottom: '30px' }}>
            عطرك.. بصمتك التي لا تُنسى ✨
          </p>
          <Link href="/men">
            <button style={ctaButtonStyle}>تسوق الآن</button>
          </Link>
        </div>
      </div>

      {/* 2. قسم تصفح الأقسام (Categories) */}
      <div style={{ padding: '50px 20px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#333', marginBottom: '40px', fontSize: '2rem' }}>تصفح مجموعاتنا</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <CategoryCard title="رجالي" link="/men" icon="👔" />
          <CategoryCard title="نسائي" link="/women" icon="👗" />
          <CategoryCard title="شرقي ومنزل" link="/oriental" icon="🏯" />
          <CategoryCard title="للجنسين" link="/unisex" icon="👫" />
        </div>
      </div>

      {/* 3. وصلنا حديثاً (Featured Products) */}
      <div style={{ padding: '50px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '40px', fontSize: '2rem' }}>✨ وصلنا حديثاً</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {newArrivals.map((product) => (
            <Link key={product._id} href={`/product/${product.slug?.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={productCardStyle}>
                 {product.imageUrl && (
                   <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '15px' }} 
                   />
                 )}
                 <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.name}</h3>
                 <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{product.price} جنيه</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

// --- مكون صغير لبطاقة القسم ---
function CategoryCard({ title, link, icon }) {
  return (
    <Link href={link} style={{ textDecoration: 'none' }}>
      <div style={categoryCardStyle}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{icon}</div>
        <h3 style={{ color: '#1a1a1a', margin: 0 }}>{title}</h3>
      </div>
    </Link>
  );
}

// --- التنسيقات (Styles) ---

// صورة الخلفية: يمكنك تغيير الرابط لاحقاً بصورة من متجرك
const heroSectionStyle = {
  backgroundImage: "url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1600&auto=format&fit=crop')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '70vh', // 70% من ارتفاع الشاشة
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
};

const heroOverlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // طبقة سوداء شفافة لتوضيح الكلام
  padding: '40px',
  borderRadius: '10px',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

const ctaButtonStyle = {
  padding: '15px 40px',
  fontSize: '1.2rem',
  backgroundColor: '#d4af37',
  color: 'black',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s',
};

const categoryCardStyle = {
  width: '150px',
  height: '150px',
  backgroundColor: 'white',
  borderRadius: '50%', // شكل دائري
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  border: '2px solid #d4af37',
  cursor: 'pointer',
  transition: 'transform 0.3s'
};

const productCardStyle = {
  border: '1px solid #eee',
  padding: '15px',
  borderRadius: '10px',
  width: '220px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  cursor: 'pointer',
  backgroundColor: 'white'
};