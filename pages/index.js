import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../src/sanity/lib/client';

export default function Home({ banner, products }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const topStatusText = "✨ أهلاً بكم في كاريزما للعطور - خصومات حصرية وشحن سريع لجميع المحافظات 🚚";
  const tickerText1 = " ✨ عروض شهر رمضان المبارك - خصومات تصل إلى 20% على جميع العطور ✨ ";
  const tickerText2 = " 🚚 شحن سريع ومجاني للطلبات فوق 2500 جنيه - دفع عند الاستلام متاح 🛡️ ";

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      <Head>
        <title>كاريزما للعطور | Karizma Perfumes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="تسوق أفضل العطور المستوحاة من الماركات العالمية بأسعار تنافسية في مصر. عطور رجالية ونسائية، عود، وبخور بجودة عالية وثبات ممتاز." />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      {/* ==================== 1. الهيدر ==================== */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ backgroundColor: 'black', color: '#d4af37', fontSize: '12px', padding: '5px', textAlign: 'center', fontWeight: 'bold' }}>
          {topStatusText}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37', fontFamily: 'Tajawal, Arial' }}>✨ Karizma</div>
          <nav className="desktop-nav">
            <Link href="/" style={linkStyle}>الرئيسية</Link>
            <Link href="/shop" style={linkStyle}>المتجر</Link>
            <Link href="/blog" style={linkStyle}>المدونة</Link>
            <Link href="/offers" style={linkStyle}>العروض 🔥</Link>
          </nav>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link href="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
               <span style={{ cursor: 'pointer', fontSize: '1.2rem' }}>🛒</span>
            </Link>
            <Link href="/search" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span style={{ cursor: 'pointer', fontSize: '1.3rem', display: 'inline-block', transform: 'translateY(2px)' }}>🔍</span>
            </Link>
            <button style={{ background: 'none', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}>English</button>
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'white', border: '2px solid #d4af37', borderRadius: '8px', color: '#d4af37', fontSize: '1.5rem', cursor: 'pointer', padding: '0px 8px', marginRight: '8px', height: '35px', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mobile-nav-list fade-in">
            <Link href="/" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>الرئيسية</Link>
            <Link href="/shop" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>المتجر</Link>
            <Link href="/blog" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>المدونة</Link>
            <Link href="/offers" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>العروض 🔥</Link>
            <Link href="/search" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>🔍 البحث</Link>
          </div>
        )}
      </header>

      {/* ==================== 2. الأشرطة المتحركة ==================== */}
      <div className="ticker-container first-ticker">
        <div className="ticker-track">
          <div className="ticker-block"><span className="ticker-item">{tickerText1}</span><span className="ticker-item">{tickerText1}</span></div>
          <div className="ticker-block"><span className="ticker-item">{tickerText1}</span><span className="ticker-item">{tickerText1}</span></div>
        </div>
      </div>
      <div className="ticker-container second-ticker">
        <div className="ticker-track-reverse">
          <div className="ticker-block"><span className="ticker-item-white">{tickerText2}</span><span className="ticker-item-white">{tickerText2}</span></div>
          <div className="ticker-block"><span className="ticker-item-white">{tickerText2}</span><span className="ticker-item-white">{tickerText2}</span></div>
        </div>
      </div>

      {/* ==================== 3. البانر ==================== */}
      {banner?.imageUrl && (
        <div className="fade-in" style={{ position: 'relative', width: '100%', height: 'auto', marginTop: '0px' }}>
          <Image src={banner.imageUrl} alt={banner.title || 'Ramadan Offer'} width={1400} height={400} style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }} loading="lazy" sizes="(max-width: 768px) 100vw, 100vw" />
        </div>
      )}

      {/* ==================== 4. الهيرو ==================== */}
      <div style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src={banner?.heroImageUrl || 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'} alt="Hero Background" fill priority={true} style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 2, color: 'white' }} className="fade-in-up">
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#d4af37', fontWeight: 'bold', fontFamily: 'Tajawal, Arial' }}>كاريزما للعطور</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '25px' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
          <Link href="/shop"><button className="hover-btn" style={ctaButtonStyle}>تسوق الآن</button></Link>
        </div>
      </div>

      {/* ==================== 5. تصفح مجموعاتنا ==================== */}
      <div style={{ padding: '50px 10px', textAlign: 'center', backgroundColor: '#fff' }}>
        <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '30px', fontWeight: 'bold' }}>تصفح مجموعاتنا</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          
          <CategoryCircle href="/offers" emoji="🔥" label="العروض والتخفيضات" />
          <CategoryCircle href="/men" emoji="🤵" label="العطور الرجالية الفاخرة" />
          <CategoryCircle href="/women" emoji="💃" label="العطور النسائية الجذابة" />
          <CategoryCircle href="/unisex" emoji="👫" label="عطور (للجنسين)" />
          <CategoryCircle href="/niche" emoji="💎" label="عطور النيش الحصرية" />
          <CategoryCircle href="/oud" emoji="🪵" label="دهن العود والبخور" />
          <CategoryCircle href="/gulf" emoji="🕌" label="العطور الخليجية والمخلطات" />
          <CategoryCircle href="/mixes" emoji="⚗️" label="ميكسات كاريزما الخاصة" />
          <CategoryCircle href="/musks" emoji="🧴" label="المسك والروائح الهادئة" />
          <CategoryCircle href="/bakhoor" emoji="🪔" label="البخور والمعمول" />
          <CategoryCircle href="/burners" emoji="♨️" label="الفوحات والإكسسوارات" />
          <CategoryCircle href="/fresheners" emoji="🌸" label="معطرات الجو" /> 
          <CategoryCircle href="/makeup" emoji="💄" label="مستحضرات التجميل" />
          <CategoryCircle href="/detergents" emoji="🧼" label="المنظفات والمطهرات" />

        </div>
      </div>

      {/* ==================== 6. المنتجات ==================== */}
      <div style={{ padding: '60px 10px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '40px', fontSize: '30px', fontWeight: 'bold' }}>🌟 وصلنا حديثاً</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {products?.map((product) => (
            <Link href={`/product/${product.slug?.current}`} key={product._id} style={{ textDecoration: 'none' }}>
              <div className="product-card" style={productCardStyle}>
                <div style={{ position: 'relative', height: '140px', backgroundColor: '#f9f9f9' }}>
                  {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="160px" />}
                </div>
                <div style={{ padding: '10px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#333', marginBottom: '5px' }}>{product.name}</p>
                  <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{product.price} ج.م</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/shop">
            <button className="hover-btn" style={{ ...ctaButtonStyle, backgroundColor: '#333', color: '#fff' }}>🛍️ عرض كل المنتجات</button>
          </Link>
        </div>
      </div>

      {/* ==================== 7. الفيديو ==================== */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '30px', fontSize: '30px', fontWeight: 'bold' }}>🎥 اكتشف عالم كاريزما</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden', border: '2px solid #d4af37', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <video width="100%" height="auto" controls loop muted playsInline preload="none" poster={banner?.imageUrl} src="/promo.mp4" style={{ display: 'block' }}>
            متصفحك لا يدعم الفيديو.
          </video>
        </div>
      </div>

      {/* Styles (تم حذف الفوتر والأزرار العائمة من هنا لأننا نقلناها) */}
      <style jsx global>{`
        .desktop-nav { display: flex; gap: 20px; }
        .mobile-menu-btn { display: none; }
        .mobile-nav-list { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-menu-btn { display: flex; }
          .mobile-nav-list { display: flex; flex-direction: column; background: white; position: absolute; top: 100%; left: 0; width: 100%; padding: 10px 0; border-top: 1px solid #eee; z-index: 2000; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        }
        .ticker-container { width: 100%; overflow: hidden; padding: 8px 0; white-space: nowrap; direction: ltr; }
        .first-ticker { background-color: #d4af37; }
        .second-ticker { background-color: #1a1a1a; }
        .ticker-track { display: inline-flex; animation: scroll-left 30s linear infinite; }
        .ticker-track-reverse { display: inline-flex; animation: scroll-right 30s linear infinite; }
        .ticker-block { display: flex; }
        .ticker-item { padding: 0 2rem; font-weight: bold; color: black; font-size: 1rem; }
        .ticker-item-white { padding: 0 2rem; font-weight: bold; color: #d4af37; font-size: 1rem; }
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        
        .product-card, .category-circle { transition: transform 0.3s ease; }
        .product-card:hover, .category-circle:hover { transform: translateY(-5px); box-shadow: 0 8px 15px rgba(0,0,0,0.15) !important; }
        
        .fade-in { animation: fadeIn 0.5s; }
        .fade-in-up { animation: fadeInUp 1s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  const banner = await client.fetch(`*[_type == "banner" && isActive == true][0]{ "imageUrl": image.asset->url, "heroImageUrl": heroImage.asset->url }`);
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc) [0..6] { _id, name, price, "imageUrl": image.asset->url, slug }`);
  return { props: { banner: banner || null, products: products || [] }, revalidate: 10 };
}

function CategoryCircle({ href, emoji, label }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="category-circle" style={{
        width: '115px', height: '115px', borderRadius: '50%', backgroundColor: 'white',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)', border: '2px solid #d4af37', cursor: 'pointer',
        textAlign: 'center', padding: '5px'
      }}>
        <span style={{ fontSize: '1.6rem', marginBottom: '2px' }}>{emoji}</span>
        <p style={{ margin: '0', fontWeight: 'bold', color: '#333', fontSize: '0.65rem', lineHeight: '1.2' }}>{label}</p>
      </div>
    </Link>
  );
}

const linkStyle = { textDecoration: 'none', color: '#333', fontWeight: 'bold' };
const mobileLinkStyle = { textDecoration: 'none', color: '#333', fontWeight: 'bold', padding: '15px 20px', borderBottom: '1px solid #f9f9f9' };
const ctaButtonStyle = { padding: '12px 30px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };
const productCardStyle = { width: '160px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', overflow: 'hidden', border: '1px solid #eee' };