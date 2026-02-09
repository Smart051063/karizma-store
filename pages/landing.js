import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function LandingPage() {
  
  // حالة العداد
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); 

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
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
  }, []);

  const handleQuickOrder = () => {
    const message = "مرحباً، أريد الاستفادة من العرض الخاص (بكج كاريزما الفاخر) قبل انتهاء العداد. يرجى التفاصيل.";
    window.open(`https://wa.me/201002410037?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'Arial', direction: 'rtl' }}>
      
      <Head>
        <title>عروض كاريزما الحصرية | لفترة محدودة</title>
        <meta name="description" content="عرض خاص لفترة محدودة من كاريزما للعطور. احصل على عطرك المفضل الآن بأفضل سعر." />
      </Head>

      {/* ==================== 1. قسم الهيرو (الرئيسي) ==================== */}
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
            احصل على عطرك المفضل بخصم حصري <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>25%</span> وشحن مجاني!
          </p>

          {/* 🔥🔥 الجديد: قسم الميديا (فيديو أو صورة) 🔥🔥 */}
          <div style={{ margin: '40px auto', maxWidth: '600px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #d4af37', boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}>
            
            {/* 🎥 الخيار الأول: فيديو (إذا كنت تريد فيديو، اترك هذا وعطل الصورة) */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ width: '100%', display: 'block' }}
              // 👇 ضع رابط الفيديو الخاص بك هنا (يمكنك تغييره لاحقاً)
              src="/promo.mp4" 
            />

            {/* 📸 الخيار الثاني: صورة (إذا كنت تريد صورة، الغِ تعليق السطر التالي وعطل الفيديو) */}
            {/* <img src="https://via.placeholder.com/600x400" alt="عرض خاص" style={{ width: '100%', display: 'block' }} /> */}
            
          </div>

          {/* العداد التنازلي */}
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
          
          <button 
            onClick={handleQuickOrder}
            className="pulse-button"
            style={{ 
              padding: '20px 60px', 
              fontSize: '1.5rem', 
              backgroundColor: '#d4af37', 
              color: 'black', 
              border: 'none', 
              borderRadius: '50px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)',
              transition: '0.3s'
            }}
          >
            🔥 اطلب العرض الآن
          </button>
          
        </div>
      </div>

      {/* ==================== 2. المميزات ==================== */}
      <div style={{ padding: '60px 20px', backgroundColor: '#111', textAlign: 'center' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '50px', fontSize: '2.5rem' }}>لماذا كاريزما؟</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
          <div style={featureBoxStyle}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💎</div>
            <h3 style={{ marginBottom: '10px' }}>جودة أصلية</h3>
            <p style={{ color: '#bbb' }}>زيوت عطرية فرنسية وشرقية مركزة تدوم طويلاً.</p>
          </div>
          <div style={featureBoxStyle}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚚</div>
            <h3 style={{ marginBottom: '10px' }}>شحن صاروخي</h3>
            <p style={{ color: '#bbb' }}>توصيل سريع لباب بيتك في جميع محافظات مصر.</p>
          </div>
          <div style={featureBoxStyle}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🛡️</div>
            <h3 style={{ marginBottom: '10px' }}>ضمان ذهبي</h3>
            <p style={{ color: '#bbb' }}>إذا لم يعجبك العطر، يمكنك استرجاعه خلال 14 يوم.</p>
          </div>
        </div>
      </div>

      {/* ==================== 3. آراء العملاء ==================== */}
      <div style={{ padding: '80px 20px', backgroundColor: '#000', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '50px', fontSize: '2.5rem' }}>ماذا يقول عملاؤنا؟ ❤️</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          <div style={reviewCardStyle}>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '20px' }}>"ثبات العطر مش طبيعي، فضلت ريحته في الملابس يومين!"</p>
            <h4 style={{ color: '#d4af37' }}>- أحمد محمد</h4>
            <span style={{ color: '#f1c40f' }}>⭐⭐⭐⭐⭐</span>
          </div>
          <div style={reviewCardStyle}>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '20px' }}>"التعامل ذوق جداً والتوصيل كان أسرع مما توقعت."</p>
            <h4 style={{ color: '#d4af37' }}>- سارة علي</h4>
            <span style={{ color: '#f1c40f' }}>⭐⭐⭐⭐⭐</span>
          </div>
        </div>
      </div>

      {/* ==================== 4. دعوة أخيرة (CTA) ==================== */}
      <div style={{ padding: '80px 20px', backgroundColor: '#d4af37', textAlign: 'center', color: 'black' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>لا تضيع الفرصة!</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button 
                onClick={handleQuickOrder}
                style={{ padding: '15px 40px', fontSize: '1.2rem', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}
            >
                💬 اطلب عبر واتساب
            </button>
            <Link href="/shop">
                <button 
                    style={{ padding: '15px 40px', fontSize: '1.2rem', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    🛒 تصفح المتجر
                </button>
            </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes blink {
          50% { opacity: 0.5; }
        }
        .pulse-button {
          animation: pulse 2s infinite;
        }
        .pulse-button:hover {
          background-color: #c49f27 !important;
        }
      `}</style>
    </div>
  );
}

// ==================== التنسيقات ====================

const timerBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.7)',
  border: '2px solid #d4af37',
  borderRadius: '10px',
  width: '70px',
  height: '70px',
  backdropFilter: 'blur(5px)'
};

const timerNumberStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#d4af37'
};

const timerLabelStyle = {
  fontSize: '0.7rem',
  color: '#fff',
  textTransform: 'uppercase'
};

const featureBoxStyle = {
  backgroundColor: '#222',
  padding: '30px',
  borderRadius: '15px',
  width: '300px',
  border: '1px solid #333',
  transition: '0.3s'
};

const reviewCardStyle = {
  backgroundColor: '#1a1a1a',
  padding: '30px',
  borderRadius: '15px',
  width: '300px',
  border: '1px solid #333',
  color: '#ddd'
};