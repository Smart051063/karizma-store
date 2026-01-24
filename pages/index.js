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

  // نصوص الأشرطة المتحركة
  const text1 = " ✨ أهلاً بكم في كاريزما للعطور - خصومات تصل إلى 20% على الميكسات والمسك - شحن سريع لجميع المحافظات 🚚 ";
  const text2 = " 🛡️ جميع عطورنا مستوحاة من أرقى الماركات العالمية.. بعبواتنا الخاصة وجودة نراهن عليها 🛡️ ";

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1️⃣ الشريط الأول (يتحرك في الاتجاه الطبيعي) */}
      <div className="ticker-container first-ticker">
        <div className="ticker-track">
          <div className="ticker-block">
            <span className="ticker-item">{text1}</span>
            <span className="ticker-item">{text1}</span>
            <span className="ticker-item">{text1}</span>
          </div>
          <div className="ticker-block">
            <span className="ticker-item">{text1}</span>
            <span className="ticker-item">{text1}</span>
            <span className="ticker-item">{text1}</span>
          </div>
        </div>
      </div>

      {/* 2️⃣ الشريط الثاني (يتحرك عكس الاتجاه وبخلفية داكنة للتميز) */}
      <div className="ticker-container second-ticker">
        <div className="ticker-track-reverse">
          <div className="ticker-block">
            <span className="ticker-item-white">{text2}</span>
            <span className="ticker-item-white">{text2}</span>
            <span className="ticker-item-white">{text2}</span>
          </div>
          <div className="ticker-block">
            <span className="ticker-item-white">{text2}</span>
            <span className="ticker-item-white">{text2}</span>
            <span className="ticker-item-white">{text2}</span>
          </div>
        </div>
      </div>

      {/* 3️⃣ قسم البنر العلوي */}
      {banner && (
        <div className="fade-in" style={{ backgroundColor: '#fff', textAlign: 'center', borderBottom: '1px solid #eee' }}>
          <img src={banner.imageUrl} alt={banner.title} style={{ width: '100%', height: 'auto', maxHeight: '350px', objectFit: 'cover' }} />
        </div>
      )}

      {/* 4️⃣ الشاشة الترحيبية */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        height: '60vh', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        position: 'relative', color: 'white', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }} className="fade-in-up">
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#d4af37', fontWeight: 'bold' }}>كاريزما للعطور</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '25px' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
          <Link href="/shop"><button className="hover-btn" style={ctaButtonStyle}>تسوق الآن</button></Link>
        </div>
      </div>
      {/* 5️⃣ قسم الفيديو */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '10px', fontSize: '2rem' }}>🎥 اكتشف عالم كاريزما</h2>
        <div style={{ maxWidth: '800px', margin: '40px auto', borderRadius: '20px', overflow: 'hidden', border: '2px solid #d4af37' }}>
          <video width="100%" height="auto" controls>
            <source src="/promo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* 6️⃣ وصلنا حديثاً */}
      <div style={{ padding: '60px 10px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>وصلنا حديثاً ✨</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {products.map((product) => (
             <Link href={`/product/${product?.slug?.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div className="product-card" style={productCardStyle}>
                  {/* ... محتوى كارت المنتج ... */}
                  <div style={{ padding: '10px', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{product.name}</p>
                    <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{product.price} ج.م</p>
                  </div>
                </div>
             </Link>
          ))}
        </div>
      </div>

      {/* 👇 الأنماط المحدثة للأشرطة المتعاكسة */}
      <style jsx global>{`
        .ticker-container { width: 100%; overflow: hidden; padding: 6px 0; white-space: nowrap; direction: ltr; }
        
        .first-ticker { background-color: #d4af37; border-bottom: 1px solid rgba(0,0,0,0.1); }
        .second-ticker { background-color: #1a1a1a; border-bottom: 1px solid #d4af37; }

        .ticker-track { display: inline-flex; animation: scroll-left 40s linear infinite; }
        .ticker-track-reverse { display: inline-flex; animation: scroll-right 40s linear infinite; }

        .ticker-block { display: flex; }
        .ticker-item { padding: 0 2rem; font-weight: bold; color: black; font-size: 0.9rem; }
        .ticker-item-white { padding: 0 2rem; font-weight: bold; color: #d4af37; font-size: 0.9rem; }

        /* حركة لليسار */
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* حركة لليمين (العكسية) */
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .category-circle:hover, .product-card:hover { transform: translateY(-5px); }
        .hover-btn:hover { background-color: #fff !important; color: #d4af37 !important; }
        .fade-in { animation: fadeIn 1.5s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

// ... كود المكونات الفرعية CategoryCircle و التنسيقات (نفس الكود السابق) ...
const ctaButtonStyle = { padding: '12px 30px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' };
const productCardStyle = { width: '150px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' };