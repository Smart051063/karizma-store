import React, { useState, useEffect } from 'react';
import { client } from '../src/sanity/lib/client';
import Head from 'next/head';
import Link from 'next/link';

// مكون فرعي للعداد المتحرك
const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    const duration = 2000;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return <span>{count}</span>;
};

export default function LoyaltyPage() {
  const [phone, setPhone] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkPoints = async (e) => {
    e.preventDefault();
    if (!phone) return;
    
    setLoading(true);
    setError('');
    setCustomerData(null);

    const query = `*[_type == "customer" && phoneNumber == "${phone}"][0]{
      name,
      points
    }`;

    try {
      const result = await client.fetch(query);
      if (result) {
        setCustomerData(result);
      } else {
        setError('هذا الرقم غير مسجل في نظام الولاء بعد. اشتري الآن لتبدأ في جمع النقاط! 🛍️');
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ في الاتصال، حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const rewards = [
    { points: 500, gift: 'توصيل مجاني 🚚' },
    { points: 1000, gift: 'خصم 10% على طلبك القادم 🏷️' },
    { points: 2000, gift: 'عطر 50 مل هدية 🎁' },
    { points: 5000, gift: 'بوكس كاريزما الملكي (شامل) 👑' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: 'Arial', direction: 'rtl', padding: '40px 20px' }}>
      <Head>
        <title>نادي ولاء كاريزما | Karizma Club</title>
      </Head>

      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        
        <h1 style={{ color: '#d4af37', fontSize: '2.5rem', marginBottom: '10px' }}>💎 نادي كاريزما</h1>
        <p style={{ color: '#555', marginBottom: '40px', fontSize: '1.2rem' }}>اجمع النقاط مع كل طلب واستبدلها بهدايا قيمة!</p>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px' }}>استعلم عن رصيدك</h3>
          <form onSubmit={checkPoints} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* 🔥🔥🔥 هذا هو التعديل الجديد: خانة واضحة جداً 🔥🔥🔥 */}
            <input 
              type="tel" 
              placeholder="أدخل رقم هاتفك هنا..." 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              style={{ 
                width: '100%', 
                padding: '15px', 
                borderRadius: '50px', 
                border: '2px solid #d4af37', // إطار ذهبي سميك قليلاً
                backgroundColor: '#f5f5f5', // خلفية رمادية لتمييزها عن الأبيض
                color: '#000000', // لون أسود صريح للكتابة
                fontSize: '1.3rem', 
                fontWeight: 'bold', // خط عريض للأرقام
                textAlign: 'center', 
                outline: 'none',
                boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)'
              }} 
            />

            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: '15px', backgroundColor: 'black', color: '#d4af37', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: '0.3s' }}
            >
              {loading ? 'جاري البحث...' : '🔍 عرض نقاطي'}
            </button>
          </form>

          {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

          {customerData && (
            <div className="fade-in-up" style={{ marginTop: '30px', padding: '30px', backgroundColor: '#fff8e1', borderRadius: '15px', border: '2px solid #d4af37', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '5rem', opacity: '0.1' }}>💎</div>
              
              <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>أهلاً بك يا {customerData.name || 'عميلنا العزيز'} 👋</h2>
              
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#d4af37', textShadow: '2px 2px 0px #000' }}>
                <AnimatedCounter target={customerData.points || 0} />
              </div>
              
              <p style={{ color: '#555', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '5px' }}>نقطة ولاء في رصيدك ✨</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '50px' }}>
          <h3 style={{ marginBottom: '20px' }}>🎁 جدول المكافآت</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {rewards.map((reward, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '15px 20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <span style={{ fontWeight: 'bold', color: '#333' }}>{reward.gift}</span>
                <span style={{ backgroundColor: '#d4af37', color: 'black', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>{reward.points} نقطة</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
             <Link href="/"><button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', textDecoration: 'underline' }}>العودة للرئيسية</button></Link>
        </div>

      </div>

      <style jsx>{`
        .fade-in-up { animation: fadeInUp 0.5s ease-out; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}