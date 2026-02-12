import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function ProductDetails({ product, reviews, relatedProducts, error }) {
  const { onAdd, setShowCart } = useCart();
  
  // ✅ الحفاظ على حالات التقييم من كودك القديم
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', fontFamily: 'Arial' }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>⚠️</div>
        <h1 style={{ color: 'red' }}>عذراً، المنتج غير موجود!</h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>نحن نبحث عن رابط (Slug): <br/> <b style={{backgroundColor: '#eee', padding: '5px'}}>{error || 'غير معروف'}</b></p>
        <Link href="/shop"><button style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>🏠 العودة للمتجر</button></Link>
      </div>
    );
  }

  // ✅ دالة الإضافة للسلة المحدثة
  const handleAddToCart = () => {
    onAdd(product, 1);
    setShowCart(true);
  };

  // ✅ الحفاظ على دالة التحقق من رقم الهاتف (المشترين فقط)
  const handleVerify = async () => {
    if (!phone) return;
    setVerifyMessage('⏳ جاري التحقق...');
    const query = `*[_type == "customer" && phoneNumber == "${phone}" && "${product._id}" in purchasedProducts[]._ref][0]`;
    const customer = await client.fetch(query);
    if (customer) {
      setIsVerified(true);
      setVerifyMessage(`✅ أهلاً بك يا ${customer.name || 'عميلنا العزيز'}، يمكنك تقييم المنتج الآن.`);
      setReviewForm({ ...reviewForm, name: customer.name || '' });
    } else {
      setVerifyMessage('❌ عذراً، هذا الرقم لم يقم بشراء هذا المنتج من قبل.');
    }
  };

  // ✅ الحفاظ على دالة إرسال التقييم
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
        setSubmitMessage('🎉 تم نشر تعليقك بنجاح!');
        setIsVerified(false);
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
        <div style={{ flex: '1', minWidth: '300px', position: 'relative', height: '500px', backgroundColor: '#f9f9f9', borderRadius: '20px', overflow: 'hidden', border: '1px solid #eee' }}>
          {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain', padding: '20px' }} />}
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#222' }}>{product.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>{product.description}</p>
          
          {/* ✅ قسم السعر المشطوب المطور */}
          <div style={{ marginBottom: '30px' }}>
            {product.discountPrice ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 style={{ color: '#d4af37', fontSize: '2.5rem', margin: 0 }}>{product.discountPrice} ج.م</h2>
                <span style={{ color: '#999', fontSize: '1.5rem', textDecoration: 'line-through', fontWeight: 'lighter' }}>{product.price} ج.م</span>
                <span style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>خصم حصري 🔥</span>
              </div>
            ) : (
              <h2 style={{ color: '#d4af37', fontSize: '2.2rem', margin: 0 }}>{product.price} ج.م</h2>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: '15px', backgroundColor: '#fff', color: '#d4af37', border: '2px solid #d4af37', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>🛒 أضف للسلة</button>
            <button onClick={() => window.open(`https://wa.me/201002410037?text=أريد طلب ${product.name}`, '_blank')} style={{ flex: 1, padding: '15px', backgroundColor: '#000', color: '#d4af37', border: 'none', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>📱 طلب سريع</button>
          </div>
        </div>
      </div>

      {/* التقييمات */}
      <div style={{ backgroundColor: '#f8f8f8', padding: '60px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>⭐ تقييمات العملاء</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {reviews?.length > 0 ? reviews.map((rev) => (
              <div key={rev._id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: 0 }}>{rev.name}</h4>
                  <div style={{ color: '#FFD700' }}>{"★".repeat(rev.rating)}</div>
                </div>
                <p style={{ color: '#555', marginTop: '10px' }}>{rev.comment}</p>
              </div>
            )) : <p style={{ textAlign: 'center', color: '#777' }}>لا توجد تقييمات بعد.</p>}
          </div>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px' }}>
            <h3 style={{ marginBottom: '20px', color: '#d4af37' }}>✍️ أضف تقييمك (للمشترين فقط)</h3>
            {!isVerified ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="رقم الهاتف..." value={phone} onChange={(e) => setPhone(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <button onClick={handleVerify} style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>تحقق</button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="الاسم" value={reviewForm.name} onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})} required style={{ padding: '10px', border: '1px solid #ccc' }} />
                <textarea placeholder="التعليق..." value={reviewForm.comment} onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})} required style={{ padding: '10px', border: '1px solid #ccc' }} />
                <button type="submit" disabled={isSubmitting} style={{ padding: '15px', backgroundColor: '#d4af37', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>نشر التقييم 🚀</button>
              </form>
            )}
            {verifyMessage && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{verifyMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// استعلامات Sanity الموحدة
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({ params: { slug: product.slug.current } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id, name, description, price, discountPrice, "imageUrl": image.asset->url, slug
  }`;
  
  const product = await client.fetch(productQuery);

  if (!product) {
    return { props: { error: slug } };
  }

  const reviewsQuery = `*[_type == "review" && product._ref == '${product._id}'] | order(_createdAt desc)`;
  const reviews = await client.fetch(reviewsQuery);

  const relatedQuery = `*[_type == "product" && _id != '${product._id}'] | order(_createdAt desc)[0...4]{
    _id, name, price, discountPrice, slug, "imageUrl": image.asset->url
  }`;
  const relatedProducts = await client.fetch(relatedQuery);

  return { props: { product, reviews, relatedProducts }, revalidate: 1 };
};