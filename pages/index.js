import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../src/sanity/lib/client';

export default function Home({ banner, products }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const text1 = " 🚀 تم التحديث! القائمة الجانبية تعمل بنجاح الآن 🚀 ";
  const text2 = " 🛡️ جميع عطورنا مستوحاة من أرقى الماركات العالمية.. بعبواتنا الخاصة وجودة نراهن عليها 🛡️ ";

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      <Head>
        <title>كاريزما للعطور | Karizma Perfumes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* الهيدر المتجاوب */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ backgroundColor: 'black', color: '#d4af37', fontSize: '12px', padding: '5px', textAlign: 'center', fontWeight: 'bold' }}>
          {text1}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37' }}>✨ Karizma</div>

          <nav className="desktop-nav">
            <Link href="/" style={linkStyle}>الرئيسية</Link>
            <Link href="/shop" style={linkStyle}>المتجر</Link>
            <Link href="/blog" style={linkStyle}>المدونة</Link>
            <Link href="/offers" style={linkStyle}>العروض 🔥</Link>
          </nav>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer', fontSize: '1.2rem' }}>🔍</span>
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-nav-list fade-in">
            <Link href="/" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>الرئيسية</Link>
            <Link href="/shop" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>المتجر</Link>
            <Link href="/blog" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>المدونة</Link>
          </div>
        )}
      </header>

      {/* البانر والصورة الخلفية */}
      <div style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={banner?.heroImageUrl || 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
            alt="Hero"
            fill
            priority={true}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 2, color: 'white' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#d4af37' }}>كاريزما للعطور</h1>
          <Link href="/shop"><button style={ctaButtonStyle}>تسوق الآن</button></Link>
        </div>
      </div>

      {/* المنتجات */}
      <div style={{ padding: '60px 10px', textAlign: 'center' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '40px' }}>🌟 وصلنا حديثاً</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '35px', justifyContent: 'center' }}>
          {products?.map((product) => (
            <Link href={`/product/${product.slug?.current}`} key={product._id} style={{ textDecoration: 'none' }}>
              <div style={productCardStyle}>
                <div style={{ position: 'relative', height: '120px' }}>
                  {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} />}
                </div>
                <p style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{product.name}</p>
                <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{product.price} ج.م</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .desktop-nav { display: flex; gap: 20px; }
        .mobile-menu-btn { display: none; }
        .mobile-nav-list { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-menu-btn { display: block; }
          .mobile-nav-list { display: flex; flex-direction: column; background: white; position: absolute; top: 100%; left: 0; width: 100%; padding: 10px 0; border-top: 1px solid #eee; }
        }
        .fade-in { animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  const banner = await client.fetch(`*[_type == "banner" && isActive == true][0]{ "imageUrl": image.asset->url, "heroImageUrl": heroImage.asset->url }`);
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc) [0..5] { _id, name, price, "imageUrl": image.asset->url, slug }`);
  return { props: { banner: banner || null, products: products || [] }, revalidate: 10 };
}

const linkStyle = { textDecoration: 'none', color: '#333', fontWeight: 'bold' };
const mobileLinkStyle = { textDecoration: 'none', color: '#333', fontWeight: 'bold', padding: '15px 20px', borderBottom: '1px solid #f9f9f9' };
const ctaButtonStyle = { padding: '12px 30px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' };
const productCardStyle = { width: '150px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', overflow: 'hidden' };