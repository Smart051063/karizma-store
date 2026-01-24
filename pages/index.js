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

  // النص المراد تكراره
  const text = " ✨ أهلاً بكم في كاريزما للعطور - خصومات تبدا من 10 % وحتى 20% على جميع المنتجات - شحن سريع لجميع المحافظات 🚚 - اطلب الآن عبر واتساب ";
  
  // نكرر النص عدة مرات داخل "وحدة واحدة"
  const tickerContent = (
    <>
      <span className="ticker-item">{text}</span>
      <span className="ticker-item">{text}</span>
      <span className="ticker-item">{text}</span>
    </>
  );

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1️⃣ شريط الأخبار المتحرك (بدون فواصل نهائياً) */}
      <div className="ticker-container">
        <div className="ticker-track">
          {/* نكرر الوحدة 3 مرات لضمان التلاحم التام */}
          <div className="ticker-block">{tickerContent}</div>
          <div className="ticker-block">{tickerContent}</div>
          <div className="ticker-block">{tickerContent}</div>
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
          <CategoryCircle href="/burners" emoji="♨️" label="فوحات ومباخر" />
          <CategoryCircle href="/fresheners" emoji="🌬️" label="معطرات" />
          <CategoryCircle href="/makeup" emoji="💄" label="تجميل وعناية" />

        </div>
      </div>
      {/* 5️⃣ قسم الفيديو */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '10px', fontSize: '2rem' }}>🎥 اكتشف عالم كاريزما</h2>
        <p style={{ marginBottom: '40px', color: '#ccc' }}>شاهد كيف نصنع السحر في كل قطرة عطر</p>
        <div style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)', border: '2px solid #d4af37' }}>
          <video width="100%" height="auto" controls poster="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80">
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
            متصفحك لا يدعم الفيديو.
          </video>
        </div>
      </div>

      {/* 6️⃣ وصلنا حديثاً */}
      <div style={{ padding: '60px 10px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333', fontSize: '1.8rem' }}>وصلنا حديثاً ✨</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {products.map((product) => {
            if (!product.slug || !product.slug.current) return null;
            
            const hasDiscount = product.discount > 0;
            const originalPrice = product.price;
            const discountedPrice = hasDiscount 
              ? Math.round(originalPrice - (originalPrice * product.discount / 100)) 
              : originalPrice;

            return (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div className="product-card" style={productCardStyle}>
                  <div style={{ height: '120px', overflow: 'hidden', borderRadius: '10px 10px 0 0', position: 'relative' }}>
                     {hasDiscount && (
                       <div style={{ 
                         position: 'absolute', top: 0, left: 0, 
                         backgroundColor: '#e74c3c', color: 'white', 
                         fontSize: '0.7rem', padding: '4px 8px', 
                         borderRadius: '0 0 10px 0', fontWeight: 'bold', zIndex: 2
                       }}>
                         خصم {product.discount}%
                       </div>
                     )}
                     {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ padding: '10px', textAlign: 'center' }}>
                    <h3 style={productNameStyle}>{product.name}</h3>
                    {hasDiscount ? (
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#999', textDecoration: 'line-through' }}>{originalPrice}</span>
                        <p style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>{discountedPrice} ج.م</p>
                      </div>
                    ) : (
                      <p style={productPriceStyle}>{originalPrice} ج.م</p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 👇 الأنماط (CSS) الجديدة للأنيميشن المتصل */}
      <style jsx global>{`
        .ticker-container {
          width: 100%;
          overflow: hidden;
          background-color: #d4af37;
          padding: 8px 0;
          white-space: nowrap;
          direction: ltr; /* مهم جداً للحركة السلسة */
        }
        .ticker-track {
          display: inline-flex;
          animation: scroll 30s linear infinite; /* سرعة الشريط */
        }
        .ticker-block {
          display: flex; /* لضمان بقاء العناصر بجانب بعضها */
        }
        .ticker-item {
          padding: 0 2rem;
          font-weight: bold;
          color: black;
          font-size: 1rem;
        }

        /* الحركة السحرية: نتحرك ثلث المسافة فقط ثم نعيد الكرة */
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } 
        }

        .category-circle, .product-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .category-circle:hover, .product-card:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2) !important; }
        .hover-btn { transition: transform 0.2s, background-color 0.2s; }
        .hover-btn:hover { transform: scale(1.1); background-color: #fff !important; color: #d4af37 !important; border: 2px solid #d4af37 !important; }
        .fade-in { animation: fadeIn 1.5s ease-in-out; }
        .fade-in-up { animation: fadeInUp 1s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// مكون الدوائر
function CategoryCircle({ href, emoji, label }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="category-circle" style={circleStyle}>
        <span style={{ fontSize: '1.8rem' }}>{emoji}</span>
        <p style={{ marginTop: '5px', fontWeight: 'bold', color: '#333', fontSize: '0.8rem' }}>{label}</p>
      </div>
    </Link>
  );
}

// التنسيقات
const ctaButtonStyle = { padding: '12px 30px', fontSize: '1rem', backgroundColor: '#d4af37', color: 'black', border: '2px solid #d4af37', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' };
const circleStyle = { width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', border: '2px solid #f0f0f0', cursor: 'pointer' };
const productCardStyle = { width: '140px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eee', cursor: 'pointer', margin: '5px' };
const productNameStyle = { fontSize: '0.8rem', color: '#1a1a1a', margin: '0 0 5px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const productPriceStyle = { color: '#d4af37', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 };