import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script'; // 👈 إضافة مهمة للبيانات المنظمة

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  // حماية: إذا لم يتم العثور على المنتج
  if (!product) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>عذراً، المنتج غير متاح حالياً 😕</div>;
  }

  // حساب السعر والخصم
  const price = product.price;
  const discount = product.discount || 0;
  const finalPrice = discount ? price - (price * discount / 100) : price;

  // 🛠️ إعداد بيانات الـ SEO (البيانات المنظمة JSON-LD)
  // هذا الكود هو ما يجعل جوجل يفهم أن هذا "منتج" وله "سعر"
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.imageUrl],
    "description": product.description || `تسوق الآن عطر ${product.name} المميز من كاريزما للعطور بأفضل سعر.`,
    "sku": product._id,
    "brand": {
      "@type": "Brand",
      "name": "Karizma Perfumes"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.karizmaperfumes.com/product/${product.slug.current}`,
      "priceCurrency": "EGP",
      "price": finalPrice,
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  // دوال زيادة ونقصان الكمية
  const incQty = () => setQuantity((prev) => prev + 1);
  const decQty = () => setQuantity((prev) => (prev - 1 < 1 ? 1 : prev - 1));

  // دالة الإضافة للسلة
  const handleAddToCart = () => {
    addToCart({ 
      _id: product._id,
      name: product.name,
      price: product.price, 
      discount: product.discount,
      imageUrl: product.imageUrl, 
      slug: product.slug.current,
      quantity: quantity 
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div style={{ padding: '40px 20px', direction: 'rtl', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      
      {/* 👇 بداية سحر الـ SEO */}
      <Head>
        {/* 1. العنوان الديناميكي (اسم العطر + السعر) لجذب الانتباه */}
        <title>{`${product.name} - بسعر ${finalPrice} ج.م | كاريزما للعطور`}</title>
        
        {/* 2. وصف ديناميكي للصفحة */}
        <meta name="description" content={`اشتري ${product.name} الآن بسعر ${finalPrice} جنيه مصري. ${product.description ? product.description.substring(0, 150) : 'عطور مستوحاة بجودة عالية وثبات ممتاز وشحن سريع لكل المحافظات.'}...`} />
        
        {/* 3. تحسين المظهر عند المشاركة على فيسبوك وواتساب (Open Graph) */}
        <meta property="og:title" content={`${product.name} - ${finalPrice} ج.م | كاريزما للعطور`} />
        <meta property="og:description" content={product.description || `لا تفوت عرض ${product.name} المميز. اطلبه الآن!`} />
        <meta property="og:image" content={product.imageUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://www.karizmaperfumes.com/product/${product.slug.current}`} />
      </Head>

      {/* 4. حقن بيانات المنتج لجوجل (Rich Snippets) */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* 👆 نهاية سحر الـ SEO */}

      {/* إشعار الإضافة للسلة */}
      {showNotification && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#28a745', color: 'white', padding: '10px 20px',
          borderRadius: '8px', zIndex: 1000, boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          ✅ تمت إضافة {product.name} للسلة بنجاح!
        </div>
      )}

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        
        {/* 1️⃣ صورة المنتج */}
        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '1px solid #eee' }}>
            {discount > 0 && (
              <span style={{
                position: 'absolute', top: '10px', right: '10px',
                backgroundColor: '#e74c3c', color: 'white', padding: '5px 15px',
                borderRadius: '20px', fontWeight: 'bold'
              }}>
                خصم {discount}% 🔥
              </span>
            )}
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }} 
            />
          </div>
        </div>

        {/* 2️⃣ تفاصيل المنتج */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333' }}>{product.name}</h1>
          
          <div style={{ marginBottom: '20px' }}>
            {discount > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#e74c3c' }}>{finalPrice} ج.م</span>
                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.2rem' }}>{price} ج.م</span>
              </div>
            ) : (
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }}>{price} ج.م</span>
            )}
          </div>

          {/* الوصف */}
          <p style={{ 
            lineHeight: '1.8', 
            color: '#666', 
            marginBottom: '30px', 
            fontSize: '1.1rem',
            whiteSpace: 'pre-line' 
          }}>
            {product.description ? product.description : 'وصف العطر ومكوناته المميزة ستجدها هنا قريباً...'}
          </p>

          {/* التحكم بالكمية */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <span style={{ fontWeight: 'bold' }}>الكمية:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px' }}>
              <button onClick={decQty} style={{ padding: '10px 15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
              <span style={{ padding: '10px 15px', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', minWidth: '40px', textAlign: 'center' }}>{quantity}</span>
              <button onClick={incQty} style={{ padding: '10px 15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={handleAddToCart}
              style={{ 
                flex: 1, padding: '15px', backgroundColor: '#1a1a1a', color: 'white', 
                border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}
            >
              🛒 إضافة للسلة
            </button>
          </div>
          
          <Link href="/shop" style={{ marginTop: '20px', textAlign: 'center', color: '#d4af37', textDecoration: 'none', display: 'block' }}>
            &larr; مواصلة التسوق
          </Link>

          {/* 👇 زر العودة للصفحة الرئيسية الجديد */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link href="/" style={{ 
              display: 'inline-block', 
              padding: '10px 25px', 
              backgroundColor: '#fff', 
              border: '2px solid #d4af37', 
              color: '#1a1a1a', 
              textDecoration: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              transition: '0.3s'
            }}>
              🏠 العودة للصفحة الرئيسية
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id,
    name,
    image,
    price,
    discount,
    description,
    slug,
    "imageUrl": image.asset->url
  }`;
  
  const product = await client.fetch(query);

  return {
    props: { product }
  }
}