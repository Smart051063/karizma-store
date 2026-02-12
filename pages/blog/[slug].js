import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function ProductDetails({ product, reviews }) {
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  
  // بيانات نموذج التعليق
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  if (!product) return <div style={{textAlign: 'center', padding: '50px'}}>جاري التحميل...</div>;

  // 1. دالة التحقق من الشراء
  const handleVerify = async () => {
    if (!phone) return;
    setVerifyMessage('جاري التحقق...');
    
    // استعلام ذكي: هل يوجد عميل بهذا الرقم ولديه هذا المنتج في قائمة مشترياته؟
    const query = `*[_type == "customer" && phoneNumber == "${phone}" && "${product._id}" in purchasedProducts[]._ref][0]`;
    
    const customer = await client.fetch(query);

    if (customer) {
      setIsVerified(true);
      setVerifyMessage(`✅ أهلاً بك يا ${customer.name || 'عميلنا العزيز'}، يمكنك تقييم المنتج الآن.`);
      setReviewForm({ ...reviewForm, name: customer.name || '' }); // تعبئة الاسم تلقائياً
    } else {
      setVerifyMessage('❌ عذراً، هذا الرقم لم يقم بشراء هذا المنتج من قبل.');
    }
  };

  // 2. دالة إرسال التعليق
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reviewForm,
          productId: product._id
        }),
      });

      if (res.ok) {
        setSubmitMessage('🎉 تم نشر تعليقك بنجاح! شكراً لك.');
        setIsVerified(false); // إخفاء النموذج
      } else {
        setSubmitMessage('حدث خطأ، حاول مرة أخرى.');
      }
    } catch (err) {
      setSubmitMessage('حدث خطأ في الاتصال.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Arial', direction: 'rtl' }}>
      <Head>
        <title>{product.name} | كاريزما</title>
      </Head>

      {/* تفاصيل المنتج */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* الصورة */}
        <div style={{ flex: '1', minWidth: '300px', position: 'relative', height: '400px', border: '1px solid #eee', borderRadius: '20px', overflow: 'hidden' }}>
          {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain' }} />}
        </div>

        {/* المعلومات */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>{product.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.6' }}>{product.description}</p>
          <h2 style={{ color: '#d4af37', fontSize: '2rem', margin: '20px 0' }}>{product.price} ج.م</h2>
          
          <button onClick={() => window.open(`https://wa.me/201002410037?text=أريد طلب ${product.name}`, '_blank')} 
            style={{ padding: '15px', backgroundColor: '#000', color: '#d4af37', border: 'none', borderRadius: '50px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>
            🛒 اطلب الآن عبر واتساب
          </button>
        </div>
      </div>

      {/* قسم التعليقات */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '60px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>⭐ آراء العملاء عن المنتج</h2>

          {/* عرض التعليقات الموجودة */}
          <div style={{ marginBottom: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div key={rev._id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: 0 }}>{rev.name}</h4>
                    <div style={{ color: '#FFD700' }}>{"★".repeat(rev.rating)}</div>
                  </div>
                  <p style={{ color: '#555', marginTop: '10px' }}>{rev.comment}</p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#888' }}>لا توجد تعليقات بعد. كن أول من يقيم هذا العطر! ✨</p>
            )}
          </div>

          <hr style={{ borderColor: '#ddd', margin: '40px 0' }} />

          {/* نموذج التحقق والتقييم */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #eee' }}>
            <h3 style={{ marginBottom: '20px', color: '#d4af37' }}>✍️ أضف تقييمك (للمشترين فقط)</h3>

            {!isVerified ? (
              // الخطوة 1: التحقق من الرقم
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="أدخل رقم هاتفك للتحقق..." 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button onClick={handleVerify} style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>تحقق</button>
              </div>
            ) : (
              // الخطوة 2: نموذج التقييم (يظهر بعد التحقق)
              <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  type="text" 
                  placeholder="الاسم" 
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  required
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <select 
                  value={reviewForm.rating} 
                  onChange={(e) => setReviewForm({...reviewForm, rating: e.target.value})}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (ممتاز)</option>
                  <option value="4">⭐⭐⭐⭐ (جيد جداً)</option>
                  <option value="3">⭐⭐⭐ (جيد)</option>
                  <option value="2">⭐⭐ (مقبول)</option>
                  <option value="1">⭐ (سيء)</option>
                </select>
                <textarea 
                  placeholder="اكتب رأيك هنا..." 
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  required
                  rows="4"
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <button type="submit" disabled={isSubmitting} style={{ padding: '15px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {isSubmitting ? 'جاري النشر...' : 'نشر التقييم 🚀'}
                </button>
              </form>
            )}

            {/* رسائل التنبيه */}
            {verifyMessage && <p style={{ marginTop: '15px', fontWeight: 'bold', color: verifyMessage.includes('✅') ? 'green' : 'red' }}>{verifyMessage}</p>}
            {submitMessage && <p style={{ marginTop: '15px', fontWeight: 'bold', color: 'green' }}>{submitMessage}</p>}

          </div>
        </div>
      </div>
    </div>
  );
}

// جلب البيانات
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({ params: { slug: product.slug.current } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // جلب المنتج
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id, name, description, price, "imageUrl": image.asset->url
  }`;
  const product = await client.fetch(productQuery);

  // جلب التعليقات الخاصة بهذا المنتج فقط
  const reviewsQuery = `*[_type == "review" && product._ref == '${product?._id}'] | order(_createdAt desc)`;
  const reviews = await client.fetch(reviewsQuery);

  return {
    props: { product, reviews },
    revalidate: 60
  };
};