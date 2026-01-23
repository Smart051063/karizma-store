import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client'; // تأكد أن المسار صحيح كما في الصورة image_05a769.png

export default function Home() {
  const [banner, setBanner] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 1. جلب البنر المفعل
    const bannerQuery = `*[_type == "banner" && isActive == true][0]{
      title, link, "imageUrl": image.asset->url
    }`;
    client.fetch(bannerQuery).then((data) => setBanner(data));

    // 2. جلب المنتجات (وصلنا حديثاً)
    const productQuery = `*[_type == "product"]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug
    }`;
    client.fetch(productQuery).then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1️⃣ قسم البنر العلوي (يظهر فقط إذا قمت بتفعيله من Sanity) */}
      {banner && (
        <div style={{ backgroundColor: '#f0f0f0', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
          <Link href={banner.link || '/search'}>
            <img 
              src={banner.imageUrl} 
              alt={banner.title} 
              style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer' }} 
            />
          </Link>
        </div>
      )}

      {/* 2️⃣ الشاشة الرئيسية (Hero Section) كما في الصورة image_5771ae.jpg */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        height: '75vh', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        position: 'relative', color: 'white', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', color: '#d4af37', fontWeight: 'bold' }}>كاريزما للعطور</h1>
          <p style={{ fontSize: '1.4rem', marginBottom: '25px' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
          <Link href="/search">
            <button style={ctaButtonStyle}>تسوق الآن</button>
          </Link>
        </div>
      </div>

      {/* 3️⃣ تصفح مجموعاتنا (تصميم الدوائر المفضل لديك) 🟢 */}
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '50px', fontSize: '2rem' }}>تصفح مجموعاتنا</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          
          <CategoryCircle href="/unisex" emoji="👫" label="للجنسين" />
          <CategoryCircle href="/oriental" emoji="🏯" label="شرقي ومنزل" />
          <CategoryCircle href="/women" emoji="👗" label="نسائي" />
          <CategoryCircle href="/men" emoji="👔" label="رجالي" />

        </div>
      </div>

      {/* 4️⃣ وصلنا حديثاً ✨ (شبكة المنتجات) */}
      <div style={{ padding: '20px 20px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '50px', color: '#333', fontSize: '2rem' }}>
          وصلنا حديثاً ✨
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center' }}>
          {products.map((product) => {
            // 🛑 حماية ضد الخطأ: إذا لم يكن هناك رابط، لا تعرض المنتج ولا توقف الموقع
            if (!product.slug || !product.slug.current) return null;

            return (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div style={productCardStyle}>
                  <div style={{ height: '280px', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
                     {product.imageUrl && (
                       <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     )}
                  </div>
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#1a1a1a', margin: '0 0 10px', fontWeight: '600' }}>{product.name}</h3>
                    <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.3rem' }}>{product.price} جنيه</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}

// مكون الدائرة الفرعي لسهولة القراءة
function CategoryCircle({ href, emoji, label }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={circleStyle}>
        <span style={{ fontSize: '3rem' }}>{emoji}</span>
        <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>{label}</p>
      </div>
    </Link>
  );
}

// --- التنسيقات الاحترافية (Styles) ---
const ctaButtonStyle = {
  padding: '15px 45px', fontSize: '1.3rem', backgroundColor: '#d4af37', color: 'black',
  border: 'none', borderRadius: '35px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s'
};

const circleStyle = {
  width: '160px', height: '160px', borderRadius: '50%', backgroundColor: 'white',
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 6px 15px rgba(0,0,0,0.08)', border: '2px solid #eee',
  cursor: 'pointer', transition: 'transform 0.3s'
};

const productCardStyle = {
  width: '270px', backgroundColor: 'white', borderRadius: '20px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0',
  transition: 'transform 0.3s', cursor: 'pointer'
};