import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage({ landingData }) {
  
  // البيانات الافتراضية
  const defaultImage = "/landing-img.jpg";
  const defaultVideo = "/offer.mp4";
  
  const offerEndTime = landingData?.offerEndTime; 
  const imageUrl = landingData?.imageUrl || defaultImage;
  const videoUrl = landingData?.videoUrl || defaultVideo;
  const products = landingData?.selectedProducts || []; // المنتجات المختارة
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const targetDate = offerEndTime ? new Date(offerEndTime) : new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [offerEndTime]);

  const handleQuickOrder = (productName = "العرض الخاص") => {
    const message = `مرحباً، أريد طلب المنتج (${productName}) من عرض صفحة الهبوط. يرجى التفاصيل.`;
    window.open(`https://wa.me/201002410037?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'Arial', direction: 'rtl' }}>
      
      <Head>
        <title>عروض كاريزما الحصرية | لفترة محدودة</title>
        <meta name="description" content="عرض خاص لفترة محدودة من كاريزما للعطور." />
      </Head>

      {/* ==================== 1. قسم الهيرو ==================== */}
      <div style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '800px', zIndex: 2 }}>
          
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#d4af37', textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}>
             عرض الملكي لفترة محدودة 👑
          </h1>
          
          <p style={{ fontSize: '1.4rem', marginBottom: '30px', color: '#eee' }}>
            احصل على عطرك المفضل بخصم حصري وشحن مجاني!
          </p>

          {/* قسم الميديا */}
          <div style={{ margin: '30px auto', maxWidth: '600px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #d4af37', boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}>
             {landingData?.imageUrl ? (
                <img src={imageUrl} alt="عرض كاريزما" style={{ width: '100%', display: 'block' }} />
             ) : (
               <video autoPlay loop muted playsInline controls style={{ width: '100%', display: 'block' }} src={videoUrl} />
             )}
          </div>

          {/* العداد */}
          {mounted && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', direction: 'ltr' }}>
              <div style={timerBoxStyle}><span style={timerNumberStyle}>{timeLeft.seconds}</span><span style={timerLabelStyle}>ثانية</span></div>
              <div style={timerBoxStyle}><span style={timerNumberStyle}>{timeLeft.minutes}</span><span style={timerLabelStyle}>دقيقة</span></div>
              <div style={timerBoxStyle}><span style={timerNumberStyle}>{timeLeft.hours}</span><span style={timerLabelStyle}>ساعة</span></div>
              <div style={timerBoxStyle}><span style={timerNumberStyle}>{timeLeft.days}</span><span style={timerLabelStyle}>يوم</span></div>
            </div>
          )}

          <p style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '20px', animation: 'blink 1.5s infinite' }}>
            ⚠️ ينتهي العرض بانتهاء العداد!
          </p>
          
          <button onClick={() => handleQuickOrder("بكج العرض الكامل")} className="pulse-button" style={mainBtnStyle}>
            🔥 اطلب العرض الآن
          </button>
          
        </div>
      </div>

      {/* ==================== 2. منتجات العرض (القسم الجديد) ==================== */}
      {products.length > 0 && (
        <div style={{ padding: '80px 20px', backgroundColor: '#111', textAlign: 'center' }}>
          <h2 style={{ color: '#d4af37', marginBottom: '50px', fontSize: '2.5rem' }}>✨ منتجات العرض المختارة</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
            {products.map((product) => (
              <div key={product._id} className="product-card" style={{ backgroundColor: '#222', borderRadius: '15px', width: '250px', overflow: 'hidden', border: '1px solid #333', transition: '0.3s' }}>
                <Link href={`/product/${product.slug.current}`} style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative', height: '250px', backgroundColor: '#fff' }}>
                    {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain' }} />}
                  </div>
                </Link>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '10px' }}>{product.name}</h3>
                  <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>{product.price} ج.م</p>
                  <button 
                    onClick={() => handleQuickOrder(product.name)}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#d4af37', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    🛒 اطلب الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 3. المميزات ==================== */}
      <div style={{ padding: '60px 20px', backgroundColor: '#000', textAlign: 'center' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '50px', fontSize: '2.5rem' }}>لماذا كاريزما؟</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
           <div style={featureBoxStyle}><div style={{ fontSize: '3rem', marginBottom: '15px' }}>💎</div><h3>جودة أصلية</h3></div>
           <div style={featureBoxStyle}><div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚚</div><h3>شحن صاروخي</h3></div>
           <div style={featureBoxStyle}><div style={{ fontSize: '3rem', marginBottom: '15px' }}>🛡️</div><h3>ضمان ذهبي</h3></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        @keyframes blink { 50% { opacity: 0.5; } }
        .pulse-button { animation: pulse 2s infinite; }
        .pulse-button:hover { background-color: #c49f27 !important; }
        .product-card:hover { transform: translateY(-10px); border-color: #d4af37 !important; }
      `}</style>
    </div>
  );
}

// دالة جلب البيانات (محدثة لجلب المنتجات)
export const getStaticProps = async () => {
  const query = `*[_type == "landingPage"][0]{
    offerEndTime,
    videoUrl,
    "imageUrl": heroImage.asset->url,
    selectedProducts[]->{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug
    }
  }`;
  
  const landingData = await client.fetch(query);

  return {
    props: { landingData: landingData || null },
    revalidate: 60
  };
}

// التنسيقات
const timerBoxStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', border: '2px solid #d4af37', borderRadius: '10px', width: '70px', height: '70px', backdropFilter: 'blur(5px)' };
const timerNumberStyle = { fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37' };
const timerLabelStyle = { fontSize: '0.7rem', color: '#fff', textTransform: 'uppercase' };
const featureBoxStyle = { backgroundColor: '#222', padding: '30px', borderRadius: '15px', width: '300px', border: '1px solid #333', color: '#ddd' };
const mainBtnStyle = { padding: '20px 60px', fontSize: '1.5rem', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)', transition: '0.3s' };