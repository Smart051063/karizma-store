import React, { useState, useEffect } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ProductDetails({ product, reviews, relatedProducts }) {
  const { onAdd, setShowCart } = useCart();
  const router = useRouter();

  // --- 1. إعداد الأحجام والأسعار ---
  const [selectedSize, setSelectedSize] = useState(100); // الحجم الافتراضي
  const [currentPrice, setCurrentPrice] = useState(0);

  // قائمة الأحجام القياسية
  const standardSizes = [100, 60, 50, 30, 20, 10];

  // دالة حساب السعر
  const calculatePrice = (size) => {
    if (!product) return 0;
    
    // أولوية 1: سعر مخصص من Sanity
    const customSize = product.customSizes?.find(s => s.size === size);
    if (customSize) return customSize.price;

    // أولوية 2: معادلة حسابية (نسبة وتناسب مع زيادة بسيطة للأحجام الصغيرة)
    const basePrice = product.price; 
    if (size === 100) return basePrice;
    
    if (size === 60) return Math.round(basePrice * 0.70);
    if (size === 50) return Math.round(basePrice * 0.60);
    if (size === 30) return Math.round(basePrice * 0.40);
    if (size === 20) return Math.round(basePrice * 0.30);
    if (size === 10) return Math.round(basePrice * 0.18);
    
    return basePrice;
  };

  // تحديث السعر عند تحميل المنتج أو تغيير الحجم
  useEffect(() => {
    if (product) {
      setCurrentPrice(calculatePrice(selectedSize));
    }
  }, [selectedSize, product]);


  // --- 2. حالات التقييم والتحقق ---
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');


  // --- 3. معالجة حالات التحميل والخطأ ---
  if (router.isFallback) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
        <h3>جاري تجهيز صفحة المنتج...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', fontFamily: 'Tajawal, Arial' }}>
        <h2 style={{ color: 'red' }}>عذراً، المنتج غير موجود!</h2>
        <Link href="/shop">
           <button style={{ marginTop: '20px', padding: '10px 20px', background: 'black', color: 'white', borderRadius: '50px', border: 'none', cursor: 'pointer' }}>🏠 العودة للمتجر</button>
        </Link>
      </div>
    );
  }

  // --- 4. الدوال التفاعلية (السلة، التحقق، النشر) ---

  // إضافة للسلة (مع الحجم والسعر الجديد)
  const handleAddToCart = () => {
    const productWithSize = {
      ...product,
      _id: `${product._id}_${selectedSize}`, // ID فريد للحجم
      name: `${product.name} (${selectedSize} مل)`,
      price: currentPrice
    };
    onAdd(productWithSize, 1);
    setShowCart(true);
  };

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
        setReviewForm({ name: '', comment: '', rating: 5 });
      } else {
        setSubmitMessage('حدث خطأ، حاول مرة أخرى.');
      }
    } catch (err) {
      setSubmitMessage('خطأ في الاتصال بالسيرفر.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 5. واجهة المستخدم (UI) ---
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Tajawal, Arial', direction: 'rtl' }}>
      <Head>
        <title>{product.name} | كاريزما</title>
      </Head>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
        
        {/* صورة المنتج */}
        <div style={{ flex: '1', minWidth: '300px', position: 'relative', height: '500px', backgroundColor: '#f9f9f9', borderRadius: '20px', overflow: 'hidden', border: '1px solid #eee' }}>
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain', padding: '20px' }} />
          ) : (
             <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>لا توجد صورة</div>
          )}
        </div>

        {/* تفاصيل المنتج */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#222' }}>{product.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>{product.description}</p>
          
          {/* 🔥 قسم اختيار الحجم 🔥 */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#333' }}>اختر الحجم:</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {standardSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: selectedSize === size ? '2px solid #d4af37' : '1px solid #ddd',
                    backgroundColor: selectedSize === size ? '#d4af37' : '#fff',
                    color: selectedSize === size ? '#fff' : '#333',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: '0.3s'
                  }}
                >
                  {size} مل
                </button>
              ))}
            </div>
          </div>

          {/* قسم السعر */}
          <div style={{ marginBottom: '30px', padding: '10px 0' }}>
            <h2 style={{ color: '#d4af37', fontSize: '2.5rem', margin: 0, fontWeight: 'bold' }}>
              {currentPrice} ج.م
            </h2>
            {product.discount > 0 && selectedSize === 100 && (
               <span style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '2px 8px', borderRadius: '5px', fontSize: '0.9rem' }}>
                 يوجد خصم إضافي على الـ 100 مل
               </span>
            )}
          </div>
          
          {/* الأزرار */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: '15px', backgroundColor: '#fff', color: '#d4af37', border: '2px solid #d4af37', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
              🛒 أضف للسلة
            </button>
            <button onClick={() => window.open(`https://wa.me/201002410037?text=أريد طلب ${product.name} حجم ${selectedSize} مل`, '_blank')} style={{ flex: 1, padding: '15px', backgroundColor: '#000', color: '#d4af37', border: 'none', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
              📱 طلب سريع
            </button>
          </div>
        </div>
      </div>

      {/* --- قسم التقييمات --- */}
      <div style={{ backgroundColor: '#f8f8f8', padding: '60px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>⭐ تقييمات العملاء</h2>
          
          {/* عرض التقييمات */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {reviews?.length > 0 ? (
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
              <p style={{ textAlign: 'center', color: '#777' }}>لا توجد تقييمات بعد. كن أول من يقيم!</p>
            )}
          </div>

          {/* نموذج إضافة التقييم */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '20px', color: '#d4af37' }}>✍️ أضف تقييمك (للمشترين فقط)</h3>
            
            {!isVerified ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="tel" 
                  placeholder="رقم الهاتف المستخدم في الشراء..." 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '2px solid #d4af37', fontWeight: 'bold' }} 
                />
                <button onClick={handleVerify} style={{ padding: '10px 25px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>تحقق</button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input type="text" placeholder="الاسم" value={reviewForm.name} onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})} required style={{ flex:1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    <select value={reviewForm.rating} onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginRight: '10px' }}>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                    </select>
                </div>
                <textarea placeholder="اكتب تجربتك..." value={reviewForm.comment} onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})} required rows="3" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', resize: 'vertical' }} />
                <button type="submit" disabled={isSubmitting} style={{ padding: '15px', backgroundColor: '#d4af37', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>{isSubmitting ? 'جاري النشر...' : 'نشر التقييم 🚀'}</button>
              </form>
            )}
            {(verifyMessage || submitMessage) && (
                <p style={{ marginTop: '15px', textAlign: 'center', fontWeight: 'bold', color: verifyMessage.includes('❌') ? 'red' : 'green' }}>{verifyMessage || submitMessage}</p>
            )}
          </div>
        </div>
      </div>

      {/* --- قسم منتجات مقترحة --- */}
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
      </div>
    </div>
  );
}

// ⚠️ استعلام البيانات
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({ params: { slug: product.slug.current } }));
  // ✅ fallback: true مهم جداً لتحميل المنتجات الجديدة دون إعادة تشغيل السيرفر
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // ✅ جلب البيانات بما فيها customSizes
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id, name, description, price, discount, "imageUrl": image.asset->url, slug,
    customSizes
  }`;
  
  const product = await client.fetch(productQuery);

  if (!product) return { notFound: true };

  const reviewsQuery = `*[_type == "review" && product._ref == '${product._id}'] | order(_createdAt desc)`;
  const reviews = await client.fetch(reviewsQuery);

  const relatedQuery = `*[_type == "product" && _id != '${product._id}'] | order(_createdAt desc)[0...4]{
    _id, name, price, discount, slug, "imageUrl": image.asset->url
  }`;
  const relatedProducts = await client.fetch(relatedQuery);

  return { 
    props: { product, reviews, relatedProducts }, 
    revalidate: 1 
  };
};