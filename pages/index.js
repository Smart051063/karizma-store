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

  const text1 = " ✨ أهلاً بكم في كاريزما للعطور - خصومات تصل إلى 20% على الميكسات والمسك - شحن سريع لجميع المحافظات 🚚 ";
  const text2 = " 🛡️ جميع عطورنا مستوحاة من أرقى الماركات العالمية.. بعبواتنا الخاصة وجودة نراهن عليها 🛡️ ";

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      {/* الأشرطة المتحركة */}
      <div className="ticker-container first-ticker"><div className="ticker-track">
          <div className="ticker-block"><span className="ticker-item">{text1}</span><span className="ticker-item">{text1}</span></div>
          <div className="ticker-block"><span className="ticker-item">{text1}</span><span className="ticker-item">{text1}</span></div>
      </div></div>
      <div className="ticker-container second-ticker"><div className="ticker-track-reverse">
          <div className="ticker-block"><span className="ticker-item-white">{text2}</span><span className="ticker-item-white">{text2}</span></div>
          <div className="ticker-block"><span className="ticker-item-white">{text2}</span><span className="ticker-item-white">{text2}</span></div>
      </div></div>

      {/* قسم الفيديو المصحح */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>🎥 اكتشف عالم كاريزما</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden', border: '2px solid #d4af37' }}>
          <video width="100%" height="auto" controls poster={banner?.imageUrl}>
            <source src="/promo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* قسم المنتجات مع فحص الأمان للصور والروابط */}
      <div style={{ padding: '60px 10px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>وصلنا حديثاً ✨</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {products.map((product) => (
            product.slug?.current && (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div className="product-card" style={productCardStyle}>
                  <div style={{ height: '120px', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
                    {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
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
      </div>

      <style jsx global>{`
        .ticker-container { width: 100%; overflow: hidden; padding: 6px 0; white-space: nowrap; direction: ltr; }
        .first-ticker { background-color: #d4af37; }
        .second-ticker { background-color: #1a1a1a; }
        .ticker-track { display: inline-flex; animation: scroll-left 40s linear infinite; }
        .ticker-track-reverse { display: inline-flex; animation: scroll-right 40s linear infinite; }
        .ticker-block { display: flex; }
        .ticker-item { padding: 0 2rem; font-weight: bold; color: black; }
        .ticker-item-white { padding: 0 2rem; font-weight: bold; color: #d4af37; }
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .product-card { width: 150px; background: white; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: 0.3s; }
        .product-card:hover { transform: translateY(-5px); }
      `}</style>
    </div>
  );
}

const productCardStyle = { cursor: 'pointer' };