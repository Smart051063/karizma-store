import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

export default function ProductDetails({ product, relatedProducts }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  // حماية: إذا لم يتم العثور على المنتج
  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'Arial' }}>
        <h2>عذراً، المنتج غير متاح حالياً 😕</h2>
        <Link href="/shop" style={{ color: '#d4af37', textDecoration: 'none' }}>العودة للمتجر</Link>
      </div>
    );
  }

  // حساب السعر والخصم
  const price = product.price;
  const discount = product.discount || 0;
  const finalPrice = discount ? Math.round(price - (price * discount / 100)) : price;

  // دوال الكمية
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

  // إعداد بيانات الـ SEO (Schema Markup)
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
      "url": `https://www.karizmaperfumes.com/product/${product.slug.current}`,
      "priceCurrency": "EGP",
      "price": finalPrice,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', fontFamily: 'Arial, sans-serif', direction: 'rtl' }}>
      
      <Head>
        <title>{`${product.name} | كاريزما للعطور`}</title>
        <meta name="description" content={product.description ? product.description.substring(0, 160) : `احصل على ${product.name} بسعر ${finalPrice} جنيه.`} />
        <meta property="og:title" content={`${product.name} - ${finalPrice} ج.م`} />
        <meta property="og:image" content={product.imageUrl} />
      </Head>

      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* إشعار الإضافة للسلة */}
      {showNotification && (
        <div className="fade-in" style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#2ecc71', color: 'white', padding: '12px 25px',
          borderRadius: '50px', zIndex: 2000, boxShadow: '0 5px 15px rgba(0,0,0,0.2)', fontWeight: 'bold'
        }}>
          ✅ تمت الإضافة للسلة بنجاح!
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* ================= القسم العلوي: تفاصيل المنتج ================= */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
          
          {/* الصورة */}
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <div style={{ position: 'relative', height: '500px', borderRadius: '15px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
              {discount > 0 && (
                <span style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#e74c3c', color: 'white', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', zIndex: 10 }}>
                  خصم {discount}%
                </span>
              )}
              {product.imageUrl && (
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  style={{ objectFit: 'contain' }}
                  priority 
                />
              )}
            </div>
          </div>

          {/* التفاصيل */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#1a1a1a' }}>{product.name}</h1>
            
            <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d4af37' }}>{finalPrice} ج.م</span>
              {discount > 0 && <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.2rem' }}>{price} ج.م</span>}
            </div>

            <p style={{ lineHeight: '1.8', color: '#666', marginBottom: '30px', fontSize: '1.1rem', whiteSpace: 'pre-line' }}>
              {product.description || 'وصف العطر ومكوناته الفاخرة سيتم إضافتها قريباً...'}
            </p>

            {/* التحكم بالكمية والإضافة */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #eee', borderRadius: '30px', overflow: 'hidden' }}>
                <button onClick={decQty} style={{ padding: '10px 20px', background: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
                <span style={{ padding: '10px 10px', minWidth: '30px', textAlign: 'center', fontWeight: 'bold' }}>{quantity}</span>
                <button onClick={incQty} style={{ padding: '10px 20px', background: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="hover-btn"
                style={{ 
                  flex: 1, padding: '15px 30px', backgroundColor: '#d4af37', color: 'black', 
                  border: 'none', borderRadius: '30px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}
              >
                🛍️ إضافة للسلة
              </button>
            </div>

            <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <p style={{ color: '#27ae60', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🚚 <strong>شحن سريع</strong> خلال 2-4 أيام عمل
              </p>
              <p style={{ color: '#2980b9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🛡️ <strong>ضمان</strong> استرجاع خلال 14 يوم
              </p>
            </div>
          </div>
        </div>

        {/* ================= القسم الجديد: منتجات قد تعجبك ================= */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center', color: '#333' }}>منتجات قد تعجبك ❤️</h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
              {relatedProducts.map((item) => (
                <Link href={`/product/${item.slug.current}`} key={item._id} style={{ textDecoration: 'none' }}>
                  <div className="product-card" style={{ width: '220px', backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' }}>
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
        .product-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
        .hover-btn:hover { background-color: #c49f27 !important; transform: scale(1.02); }
        .fade-in { animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, -10px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
    </div>
  );
}

// السيرفر: جلب المنتج الحالي + منتجات مقترحة
export const getServerSideProps = async ({ params: { slug } }) => {
  // 1. جلب المنتج الحالي
  const queryProduct = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id, name, price, discount, description, slug,
    "imageUrl": image.asset->url
  }`;
  
  const product = await client.fetch(queryProduct);

  // 2. جلب 4 منتجات أخرى (ليست المنتج الحالي) لتعرض كـ "منتجات ذات صلة"
  const queryRelated = `*[_type == "product" && slug.current != '${slug}'] | order(_createdAt desc) [0..3] {
    _id, name, price, slug,
    "imageUrl": image.asset->url
  }`;

  const relatedProducts = await client.fetch(queryRelated);

  return {
    props: { 
      product: product || null,
      relatedProducts: relatedProducts || []
    }
  }
}