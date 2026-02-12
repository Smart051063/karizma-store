import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function ProductDetails({ product, reviews, relatedProducts }) {
  // حالات نظام التقييم
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  if (!product) return <div style={{textAlign: 'center', padding: '50px'}}>جاري التحميل...</div>;

  // --- 1. دالة التحقق من الشراء ---
  const handleVerify = async () => {
    if (!phone) return;
    setVerifyMessage('⏳ جاري التحقق...');
    
    // استعلام: هل الرقم موجود في قائمة العملاء؟ وهل اشترى هذا المنتج؟
    const query = `*[_type == "customer" && phoneNumber == "${phone}" && "${product._id}" in purchasedProducts[]._ref][0]`;
    const customer = await client.fetch(query);

    if (customer) {
      setIsVerified(true);
      setVerifyMessage(`✅ أهلاً بك يا ${customer.name || 'عميلنا العزيز'}، يمكنك تقييم المنتج الآن.`);
      setReviewForm({ ...reviewForm, name: customer.name || '' });
    } else {
      setVerifyMessage('❌ عذراً، هذا الرقم لم يقم بشراء هذا المنتج من قبل، أو لم يتم تسجيل الشراء بعد.');
    }
  };

  // --- 2. دالة إرسال التقييم ---
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...reviewForm, productId: product._id }),
      });

      if (res.ok) {
        setSubmitMessage('🎉 تم نشر تعليقك بنجاح! شكراً لك.');
        setIsVerified(false); // إخفاء النموذج بعد النجاح
        setPhone('');
      } else {
        setSubmitMessage('حدث خطأ، حاول مرة أخرى.');
      }
    } catch (err) {
      setSubmitMessage('خطأ في الاتصال بالسيرفر.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Tajawal, Arial', direction: 'rtl' }}>
      <Head>
        <title>{product.name} | كاريزما</title>
      </Head>

      {/* --- قسم تفاصيل المنتج --- */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
        {/* الصورة */}
        <div style={{ flex: '1', minWidth: '300px', position: 'relative', height: '500px', backgroundColor: '#f9f9f9', borderRadius: '20px', overflow: 'hidden' }}>
          {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain', padding: '20px' }} />}
        </div>

        {/* المعلومات */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#222' }}>{product.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>{product.description}</p>
          <h2 style={{ color: '#d4af37', fontSize: '2rem', marginBottom: '30px' }}>{product.price} ج.م</h2>
          
          <button onClick={() => window.open(`https://wa.me/201002410037?text=أريد طلب ${product.name}`, '_blank')} 
            style={{ padding: '15px 40px', backgroundColor: '#000', color: '#d4af37', border: 'none', borderRadius: '50px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🛒 اطلب الآن عبر واتساب
          </button>
        </div>
      </div>

      {/* --- قسم التقييمات (الجديد) --- */}
      <div style={{ backgroundColor: '#f8f8f8', padding: '60px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>⭐ تقييمات العملاء</h2>

          {/* قائمة التقييمات السابقة */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div key={rev._id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{rev.name}</h4>
                    <div style={{ color: '#FFD700' }}>{"★".repeat(rev.rating)}</div>
                  </div>
                  <p style={{ color: '#555', marginTop: '10px', lineHeight: '1.5' }}>{rev.comment}</p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#777' }}>لا توجد تقييمات لهذا المنتج بعد.</p>
            )}
          </div>

          <hr style={{ borderColor: '#e0e0e0', margin: '40px 0' }} />

          {/* --- نموذج "أضف تقييمك" --- */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '20px', color: '#d4af37' }}>✍️ أضف تقييمك (للمشترين فقط)</h3>

            {!isVerified ? (
              // الخطوة 1: التحقق من الرقم
              <div>
                <p style={{marginBottom: '10px', fontSize: '0.9rem', color: '#666'}}>أدخل رقم الهاتف الذي قمت بالطلب به للتحقق من أهليتك للتقييم:</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="مثال: 010xxxxxx" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
                  />
                  <button onClick={handleVerify} style={{ padding: '12px 25px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>تحقق</button>
                </div>
              </div>
            ) : (
              // الخطوة 2: نموذج الكتابة
              <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  type="text" 
                  placeholder="الاسم" 
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  required
                  style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}
                />
                <select 
                  value={reviewForm.rating} 
                  onChange={(e) => setReviewForm({...reviewForm, rating: e.target.value})}
                  style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (ممتاز)</option>
                  <option value="4">⭐⭐⭐⭐ (جيد جداً)</option>
                  <option value="3">⭐⭐⭐ (جيد)</option>
                  <option value="2">⭐⭐ (مقبول)</option>
                  <option value="1">⭐ (سيء)</option>
                </select>
                <textarea 
                  placeholder="اكتب تجربتك مع العطر..." 
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  required
                  rows="4"
                  style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }}
                />
                <button type="submit" disabled={isSubmitting} style={{ padding: '15px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
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

      {/* --- قسم منتجات قد تعجبك --- */}
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px', color: '#333' }}>منتجات قد تعجبك</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {relatedProducts?.map((p) => (
            <Link href={`/product/${p.slug.current}`} key={p._id} style={{ textDecoration: 'none' }}>
              <div style={{ width: '200px', border: '1px solid #eee', borderRadius: '15px', padding: '10px', transition: '0.3s' }}>
                <div style={{ position: 'relative', height: '150px' }}>
                  {p.imageUrl && <Image src={p.imageUrl} alt={p.name} fill style={{ objectFit: 'contain' }} />}
                </div>
                <h3 style={{ fontSize: '1rem', color: '#333', marginTop: '10px' }}>{p.name}</h3>
                <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{p.price} ج.م</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '30px' }}>
          <Link href="/"><button style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>🏠 العودة للصفحة الرئيسية</button></Link>
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
  // 1. جلب المنتج الحالي
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id, name, description, price, "imageUrl": image.asset->url
  }`;
  const product = await client.fetch(productQuery);

  // 2. جلب التقييمات الخاصة به
  const reviewsQuery = `*[_type == "review" && product._ref == '${product?._id}'] | order(_createdAt desc)`;
  const reviews = await client.fetch(reviewsQuery);

  // 3. جلب منتجات مقترحة (استثناء المنتج الحالي)
  const relatedQuery = `*[_type == "product" && _id != '${product?._id}'] | order(_createdAt desc)[0...4]{
    _id, name, price, slug, "imageUrl": image.asset->url
  }`;
  const relatedProducts = await client.fetch(relatedQuery);

  return {
    props: { product, reviews, relatedProducts },
    revalidate: 60
  };
};