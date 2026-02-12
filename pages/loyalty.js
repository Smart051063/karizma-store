import React, { useState } from 'react';
import { client } from '../src/sanity/lib/client';
import Head from 'next/head';
import Link from 'next/link';

export default function LoyaltyPage() {
  const [phone, setPhone] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // دالة البحث عن النقاط
  const checkPoints = async (e) => {
    e.preventDefault();
    if (!phone) return;
    
    setLoading(true);
    setError('');
    setCustomerData(null);

    // البحث في قاعدة البيانات عن العميل بهذا الرقم
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

  // نظام المكافآت (يمكنك تعديله)
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
        
        {/* العنوان */}
        <h1 style={{ color: '#d4af37', fontSize: '2.5rem', marginBottom: '10px' }}>💎 نادي كاريزما</h1>
        <p style={{ color: '#555', marginBottom: '40px', fontSize: '1.2rem' }}>اجمع النقاط مع كل طلب واستبدلها بهدايا قيمة!</p>

        {/* صندوق البحث */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px' }}>استعلم عن رصيدك</h3>
          <form onSubmit={checkPoints} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="أدخل رقم هاتفك (مثال: 010xxxx)" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1.1rem', textAlign: 'center' }}
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: '15px', backgroundColor: 'black', color: '#d4af37', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
            >
              {loading ? 'جاري البحث...' : '🔍 عرض نقاطي'}
            </button>
          </form>

          {/* رسالة الخطأ */}
          {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

          {/* نتيجة البحث */}
          {customerData && (
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff8e1', borderRadius: '10px', border: '2px solid #d4af37' }}>
              <h2 style={{ margin: '0 0 10px 0' }}>أهلاً، {customerData.name || 'عميلنا العزيز'} 👋</h2>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#d4af37' }}>{customerData.points}</div>
              <p style={{ color: '#555', fontWeight: 'bold' }}>نقطة ولاء 💎</p>
            </div>
          )}
        </div>

        {/* قائمة المكافآت */}
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

        {/* زر العودة */}
        <div style={{ marginTop: '40px' }}>
             <Link href="/"><button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', textDecoration: 'underline' }}>العودة للرئيسية</button></Link>
        </div>

      </div>
    </div>
  );
}