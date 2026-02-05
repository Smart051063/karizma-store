import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script'; // لاسترجاع السيو

export default function ProductDetails({ product, relatedProducts }) {
  // استخدام الدالة الصحيحة من الكونتكست
  const { decQty, incQty, qty, onAdd } = useCart();

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'Arial' }}>
        <h2>عذراً، المنتج غير متاح حالياً 😕</h2>
        <Link href="/shop" style={{ color: '#d4af37', textDecoration: 'none' }}>العودة للمتجر</Link>
      </div>
    );
  }

  // حساب السعر والخصم
  const originalPrice = product.price;
  const discount = product.discount || 0;
  const finalPrice = discount ? Math.round(originalPrice - (originalPrice * discount / 100)) : originalPrice;

  // دالة الشراء عبر واتساب
  const handleBuyNow = () => {
    const message = `مرحباً، أريد شراء المنتج التالي:\n\n▪️ ${product.name}\n   الكمية: ${qty}\n   السعر الإجمالي: ${finalPrice * qty} ج.م\n\nيرجى تأكيد الطلب.`;
    const whatsappUrl = `https://wa.me/201002410037?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // بيانات السكيما لمحركات البحث (SEO)
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.imageUrl],
    "description": product.description || `تسوق الآن عطر ${product.name} المميز من كاريزما للعطور.`,
    "sku": product._id,
    "brand": { "@type": "Brand", "name": "Karizma Perfumes" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EGP",
      "price": finalPrice,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdfdfd', fontFamily: 'Arial, sans-serif', direction: 'rtl', paddingBottom: '50px' }}>
      
      <Head>
        <title>{product.name} | كاريزما للعطور</title>
        <meta name="description" content={`اشتري ${product.name} الآن بسعر ${finalPrice} جنيه. أفضل العطور من كاريزما.`} />
      </Head>

      {/* سكربت السيو ليفهم جوجل المنتج */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* ================= 1. القسم العلوي (التفاصيل) ================= */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'center', backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
          
          {/* الصورة */}
          <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
            <div style={{ position: 'relative', height: '500px', backgroundColor: '#f9f9f9', borderRadius: '20px', overflow: 'hidden', border: '1px solid #eee' }}>
              {discount > 0 && (
                <span style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: '#e74c3c', color: 'white', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', zIndex: 10 }}>
                  خصم {discount}%
                </span>
              )}
              {product.imageUrl && (
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  style={{ objectFit: 'contain', padding: '20px' }} 
                  priority
                />
              )}
            </div>
          </div>

          {/* المعلومات والأزرار */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a', fontWeight: 'bold' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
               {discount > 0 && <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.2rem' }}>{originalPrice} ج.م</span>}
               <span style={{ color: '#d4af37', fontSize: '2rem', fontWeight: 'bold' }}>{finalPrice} ج.م</span>
            </div>

            {/* الوصف (يدعم النصوص الغنية) */}
            <div style={{ color: '#666', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {product.details ? <PortableText value={product.details} /> : <p>{product.description}</p>}
            </div>

            {/* التحكم بالكمية */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>الكمية:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '30px', overflow: 'hidden' }}>
                <button onClick={decQty} style={{ padding: '10px 20px', background: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
                <span style={{ padding: '10px 15px', fontWeight: 'bold', fontSize: '1.2rem', backgroundColor: '#f9f9f9' }}>{qty}</span>
                <button onClick={incQty} style={{ padding: '10px 20px', background: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
              </div>
            </div>

            {/* الأزرار */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button 
                onClick={() => onAdd(product, qty)}
                style={{ flex: 1, padding: '15px', backgroundColor: 'white', border: '2px solid #d4af37', color: '#d4af37', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px', cursor: 'pointer' }}
                className="add-btn"
              >
                🛒 أضف للسلة
              </button>

              <button 
                onClick={handleBuyNow}
                style={{ flex: 1, padding: '15px', backgroundColor: '#d4af37', border: 'none', color: 'black', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)' }}
                className="buy-btn"
              >
                ⚡ شراء الآن
              </button>
            </div>

             {/* مزايا إضافية */}
             <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px', fontSize: '0.9rem' }}>
                <p>🚚 شحن سريع لجميع المحافظات</p>
                <p>🛡️ ضمان استرجاع خلال 14 يوم</p>
             </div>
          </div>
        </div>

        {/* ================= 2. قسم الفيديو (تمت استعادته) 🎥 ================= */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#333' }}>🎥 اكتشف سحر {product.name}</h2>
            <div style={{ 
              maxWidth: '900px', margin: '0 auto', 
              borderRadius: '20px', overflow: 'hidden', 
              border: '2px solid #d4af37', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
            }}>
              <video 
                width="100%" 
                height="auto" 
                controls 
                preload="none"
                // نستخدم فيديو المنتج إذا وجد، أو الفيديو الافتراضي
                src={product.videoUrl ? product.videoUrl : "/promo.mp4"}
                poster={product.imageUrl} 
                style={{ display: 'block' }}
              >
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
        </div>

        {/* ================= 3. قسم منتجات قد تعجبك (تمت استعادته) ❤️ ================= */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center', color: '#333' }}>منتجات قد تعجبك</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
              {relatedProducts.map((item) => (
                <Link href={`/product/${item.slug.current}`} key={item._id} style={{ textDecoration: 'none' }}>
                  <div className="related-card" style={{ width: '220px', backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' }}>
                    <div style={{ position: 'relative', height: '200px', backgroundColor: '#f9f9f9' }}>
                      {item.imageUrl && (
                        <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'contain' }} sizes="220px" />
                      )}
                    </div>
                    <div style={{ padding: '15px', textAlign: 'center' }}>
                      <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                      <p style={{ color: '#d4af37', fontWeight: 'bold' }}>{item.price} ج.م</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      <style jsx global>{`
        .add-btn:hover { background-color: #f9f9f9 !important; }
        .buy-btn:hover { opacity: 0.9; }
        .related-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
}

// 4. جلب البيانات (تم الدمج ليعمل بشكل سريع ويجلب كل شيء)
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: { slug: product.slug.current }
  }));
  return { paths, fallback: 'blocking' };
}

export const getStaticProps = async ({ params: { slug } }) => {
  // جلب المنتج + الفيديو
  const queryProduct = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id,
    name,
    details,      // للنصوص الغنية
    description,  // للنصوص العادية (احتياطي)
    price,
    discount,
    "imageUrl": image.asset->url,
    "videoUrl": video.asset->url,
    slug
  }`;
  
  const product = await client.fetch(queryProduct);

  // جلب المنتجات المقترحة (نفس القسم أو عشوائي)
  const queryRelated = `*[_type == "product" && slug.current != '${slug}'] | order(_createdAt desc) [0..3] {
    _id, name, price, slug,
    "imageUrl": image.asset->url
  }`;

  const relatedProducts = await client.fetch(queryRelated);

  return {
    props: { 
      product: product || null,
      relatedProducts: relatedProducts || []
    },
    revalidate: 10 // تحديث الصفحة كل 10 ثواني إذا تغير السعر
  }
}