import React, { useState } from 'react'; // 👈 استيراد useState للتحكم في القائمة
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../src/sanity/lib/client';

export default function Home({ banner, products }) {
  // متغير للتحكم في فتح وغلق القائمة في الموبايل
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 👇 هذا النص هو دليلك أن التحديث وصل!
  const text1 = " 🚀 التحديث وصل! القائمة الجانبية تعمل الآن بنجاح 100% 🚀 ";
  
  const text2 = " 🛡️ جميع عطورنا مستوحاة من أرقى الماركات العالمية.. بعبواتنا الخاصة وجودة نراهن عليها 🛡️ ";

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      <Head>
        <title>كاريزما للعطور | Karizma Perfumes</title>
        <meta name="google-site-verification" content="s7kdan4N8o-pq1rz001hv2ZnIrfyCNqygwGnuvSRv4A" />
        <meta name="description" content="تسوق أفضل العطور المستوحاة من الماركات العالمية بأسعار تنافسية." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ==================== 1. الهيدر المتجاوب (الجديد) ==================== */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        
        {/* الشريط العلوي (اختبار التحديث) */}
        <div style={{ backgroundColor: 'black', color: '#d4af37', fontSize: '12px', padding: '5px', textAlign: 'center', fontWeight: 'bold' }}>
          {text1}
        </div>

        {/* محتوى الهيدر */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* اليمين: اللوجو */}
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ✨ Karizma
          </div>

          {/* الوسط: الروابط (تظهر في الكمبيوتر وتختفي في الموبايل) */}
          <nav className="desktop-nav">
            <Link href="/" style={linkStyle}>الرئيسية</Link>
            <Link href="/shop" style={linkStyle}>المتجر</Link>
            <Link href="/blog" style={linkStyle}>المدونة</Link>
            <Link href="/offers" style={linkStyle}>العروض 🔥</Link>
          </nav>

          {/* اليسار: الأيقونات + زر القائمة للموبايل */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer', fontSize: '1.2rem' }}>🛒</span>
            <Link href="/search" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span style={{ cursor: 'pointer', fontSize: '1.2rem' }}>🔍</span>
            </Link>
            <button style={{ background: 'none', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}>English</button>
            
            {/* زر القائمة (الهامبرغر) - يظهر فقط في الموبايل */}
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', marginRight: '5px' }}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة للموبايل (تظهر فقط عند الضغط) */}
        {isMenuOpen && (
          <div className="mobile-nav-list fade-in">
            <Link href="/" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>الرئيسية</Link>
            <Link href="/shop" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>المتجر</Link>
            <Link href="/blog" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>المدونة</Link>
            <Link href="/offers" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>العروض 🔥</Link>
          </div>
        )}
      </header>
      {/* =================================================================== */}

      {/* 2️⃣ الأشرطة المتحركة */}
      <div className="ticker-container second-ticker">
        <div className="ticker-track-reverse">
          <div className="ticker-block"><span className="ticker-item-white">{text2}</span><span className="ticker-item-white">{text2}</span></div>
          <div className="ticker-block"><span className="ticker-item-white">{text2}</span><span className="ticker-item-white">{text2}</span></div>
        </div>
      </div>

      {/* 3️⃣ قسم البانر */}
      {banner?.imageUrl && (
        <div className="fade-in" style={{ position: 'relative', width: '100%', height: 'auto' }}>
          <Image 
            src={banner.imageUrl} 
            alt={banner.title || 'Offer'} 
            width={1400} 
            height={400}
            style={{ width: '100%', height: 'auto', maxHeight: '350px', objectFit: 'cover' }}
            priority={true} 
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={65}
          />
        </div>
      )}

      {/* 4️⃣ الشاشة الترحيبية (حافظنا على priority للسرعة) */}
      <div style={{ 
        position: 'relative', 
        height: '60vh', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={banner?.heroImageUrl || 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
            alt="Karizma Background"
            fill
            priority={true} // ✅ مبقين عليها لضمان عدم هبوط السكور
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            quality={60}
          />
        </div>
        
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>

        <div style={{ position: 'relative', zIndex: 2, color: 'white' }} className="fade-in-up">
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#d4af37', fontWeight: 'bold' }}>
            كاريزما للعطور
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '25px' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
          <Link href="/shop"><button className="hover-btn" style={ctaButtonStyle}>تسوق الآن</button></Link>
        </div>
      </div>

      {/* 5️⃣ تصفح مجموعاتنا */}
      <div style={{ padding: '50px 10px', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '35px', fontWeight: 'bold' }}>تصفح مجموعاتنا</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <CategoryCircle href="/offers" emoji="🔥" label="العروض" />
          <CategoryCircle href="/men" emoji="🤵" label="رجالي" />
          <CategoryCircle href="/women" emoji="💃" label="نسائي" />
          <CategoryCircle href="/unisex" emoji="👫" label="جنسين" />
          <CategoryCircle href="/niche" emoji="💎" label="نيش" />
          <CategoryCircle href="/oud" emoji="🪵" label="أعواد" />
          <CategoryCircle href="/gulf" emoji="🕌" label="خليجي" />
          <CategoryCircle href="/mixes" emoji="⚗️" label="ميكسات" />
          <CategoryCircle href="/musks" emoji="🧴" label="مسكات" />
          <CategoryCircle href="/bakhoor" emoji="🪔" label="بخور" />
          <CategoryCircle href="/burners" emoji="♨️" label="فوحات" />
          <CategoryCircle href="/fresheners" emoji="🌸" label="معطرات" /> 
          <CategoryCircle href="/makeup" emoji="💄" label="تجميل" />
          <CategoryCircle href="/detergents" emoji="🧼" label="منظفات ومطهرات" />
        </div>
      </div>

      {/* 6️⃣ قسم الفيديو */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '35px', fontWeight: 'bold' }}>🎥 اكتشف عالم كاريزما</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden', border: '2px solid #d4af37' }}>
          <video 
            width="100%" 
            height="auto" 
            controls 
            loop 
            muted 
            playsInline 
            preload="none" 
            poster={banner?.imageUrl} 
          >
            <source src="/promo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* 7️⃣ قسم المنتجات */}
      <div style={{ padding: '60px 10px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '40px', fontSize: '35px', fontWeight: 'bold' }}>🌟 وصلنا حديثاً</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '35px', justifyContent: 'center' }}>
          {products?.map((product) => (
            product.slug?.current && (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div className="product-card" style={productCardStyle}>
                  <div style={{ position: 'relative', height: '120px', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
                    {product.imageUrl && (
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="150px"
                        quality={50}
                      />
                    )}
                  </div>
                  <div style={{ padding: '10px', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', margin: '5px 0', fontSize: '0.9rem', color: '#333' }}>{product.name}</p>
                    <p style={{ color: '#d4af37', fontWeight: 'bold', margin: 0 }}>{product.price} ج.م</p>
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/shop">
            <button className="hover-btn" style={{ ...ctaButtonStyle, backgroundColor: '#333', color: '#fff' }}>🛍️ عرض كل المنتجات</button>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        /* --- أنماط الهيدر المتجاوب --- */
        .desktop-nav { display: flex; gap: 20px; }
        .mobile-menu-btn { display: none; }
        .mobile-nav-list { display: none; }

        @media (max-width: 768px) {
          .desktop-nav { display: none; } /* إخفاء الروابط العادية في الموبايل */
          .mobile-menu-btn { display: block; } /* إظهار زر القائمة في الموبايل */
          
          /* قائمة الموبايل المنسدلة */
          .mobile-nav-list {
            display: flex;
            flex-direction: column;
            background-color: white;
            border-top: 1px solid #eee;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            padding: 10px 0;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            z-index: 999;
          }
        }

        /* --- باقي الأنماط (الشريط المتحرك وغيرها) --- */
        .ticker-container { width: 100%; overflow: hidden; padding: 6px 0; white-space: nowrap; direction: ltr; }
        .first-ticker { background-color: #d4af37; }
        .second-ticker { background-color: #1a1a1a; }
        .ticker-track-reverse { display: inline-flex; animation: scroll-right 40s linear infinite; will-change: transform; transform: translateZ(0); }
        .ticker-block { display: flex; }
        .ticker-item-white { padding: 0 2rem; font-weight: bold; color: #d4af37; }
        @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

        .product-card, .category-circle { transition: 0.3s; }
        .product-card:hover, .category-circle:hover { transform: translateY(-5px); }
        .fade-in { animation: fadeIn 0.5s; }
        .fade-in-up { animation: fadeInUp 1s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// السيرفر
export async function getStaticProps() {
  const banner = await client.fetch(`*[_type == "banner" && isActive == true][0]{
    title, 
    "imageUrl": image.asset->url,
    "heroImageUrl": heroImage.asset->url 
  }`);

  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc) [0..5] {
    _id, name, price, discount, "imageUrl": image.asset->url, slug
  }`);

  return {
    props: {
      banner: banner || null,
      products: products || [],
    },
    revalidate: 10,
  };
}

// المكونات الصغيرة
function CategoryCircle({ href, emoji, label }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="category-circle" style={{
        width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'white',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)', border: '2px solid #d4af37', cursor: 'pointer'
      }}>
        <span style={{ fontSize: '1.8rem' }}>{emoji}</span>
        <p style={{ marginTop: '5px', fontWeight: 'bold', color: '#333', fontSize: '0.8rem' }}>{label}</p>
      </div>
    </Link>
  );
}

const linkStyle = { textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '1rem', transition: '0.3s' };
const mobileLinkStyle = { textDecoration: 'none', color: '#333', fontWeight: 'bold', padding: '15px 20px', borderBottom: '1px solid #f9f9f9', display: 'block' };
const ctaButtonStyle = { padding: '12px 30px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' };
const productCardStyle = { width: '150px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' };