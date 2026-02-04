import React from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

// 🧠 القاموس الذكي: لترجمة الروابط الإنجليزية إلى عناوين عربية فخمة
const categoryTitles = {
  'men': '🤵 العطور الرجالية الفاخرة',
  'women': '💃 العطور النسائية الجذابة',
  'unisex': '👫 عطور النيش (للجنسين)',
  'niche': '💎 عطور النيش الحصرية',
  'oud': '🪵 دهن العود والبخور',
  'gulf': '🕌 العطور الخليجية والمخلطات',
  'mixes': '⚗️ ميكسات كاريزما الخاصة',
  'musks': '🧴 المسك والروائح الهادئة',
  'bakhoor': '🪔 البخور والمعمول',
  'burners': '♨️ الفوحات والإكسسوارات',
  'fresheners': '🌸 معطرات الجو والمفارش',
  'makeup': '💄 مستحضرات التجميل',
  'detergents': '🧼 المنظفات والمطهرات',
  'offers': '🔥 العروض والتخفيضات'
};

export default function CategoryPage({ products, slug, categoryTitle }) {
  
  // إذا لم يكن هناك منتجات في هذا القسم
  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Arial', minHeight: '60vh' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>{categoryTitle}</h1>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>📦</div>
        <h3>عذراً، لم نضف منتجات في هذا القسم بعد.</h3>
        <p style={{ color: '#666' }}>نعمل على تجهيز تشكيلة مميزة تليق بكم.</p>
        <Link href="/">
          <button style={ctaButtonStyle}>العودة للرئيسية</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: '#f9f9f9', fontFamily: 'Arial, sans-serif' }}>
      <Head>
        <title>{categoryTitle} | كاريزما للعطور</title>
      </Head>

      {/* هيدر القسم */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '40px 20px', textAlign: 'center', color: 'white', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#d4af37', margin: 0 }}>{categoryTitle}</h1>
        <p style={{ marginTop: '10px', opacity: 0.8 }}>تصفح أفضل المنتجات المختارة بعناية</p>
      </div>

      {/* شبكة المنتجات */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {products.map((product) => (
            <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
              <div className="product-card" style={productCardStyle}>
                
                {/* صورة المنتج */}
                <div style={{ position: 'relative', height: '250px', backgroundColor: 'white', borderBottom: '1px solid #eee' }}>
                  {product.discount > 0 && (
                    <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#e74c3c', color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 1 }}>
                      خصم {product.discount}%
                    </span>
                  )}
                  {product.imageUrl && (
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name} 
                      fill 
                      style={{ objectFit: 'contain', padding: '10px' }} 
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                  )}
                </div>

                {/* تفاصيل المنتج */}
                <div style={{ padding: '15px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1rem', color: '#333', marginBottom: '10px', height: '40px', overflow: 'hidden' }}>{product.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} ج.م</span>
                    {product.oldPrice && <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>{product.oldPrice} ج.م</span>}
                  </div>
                </div>
                
                {/* زر أضف للسلة (شكلي) */}
                <div style={{ padding: '10px', borderTop: '1px solid #f9f9f9' }}>
                  <div style={{ backgroundColor: '#1a1a1a', color: '#d4af37', padding: '8px', borderRadius: '5px', textAlign: 'center', fontSize: '0.9rem' }}>
                    عرض التفاصيل 👁️
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* زر العودة */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link href="/">
            <button style={{ ...ctaButtonStyle, backgroundColor: 'white', border: '2px solid #d4af37', color: 'black' }}>🏠 العودة للرئيسية</button>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .product-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .product-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
}

// السيرفر: جلب المنتجات حسب القسم
export async function getServerSideProps({ params }) {
  const { slug } = params;

  // 1. تحديد العنوان العربي بناءً على الرابط
  const categoryTitle = categoryTitles[slug] || `قسم ${slug}`;

  // 2. الاستعلام من Sanity
  // هذا الاستعلام يبحث عن المنتجات التي ينتمي قسمها (category) لنفس الاسم (slug)
  // ملاحظة: نفترض أن لديك حقل 'categories' في المنتج، أو سنستخدم الفلترة بالكلمات المفتاحية
  // لتسهيل الأمر عليك حالياً، سنجلب المنتجات التي تحتوي "tags" أو قسم يطابق الاسم
  
  // السيناريو الأذكى: جلب كل المنتجات وفلترتها (إذا لم يكن الـ Schema جاهزاً تماماً)
  // أو استخدام استعلام دقيق إذا كنت قد ربطت الأقسام.
  // سأستخدم استعلاماً مرناً يبحث في (القسم)
  
  const query = `*[_type == "product" && references(*[_type == "category" && slug.current == '${slug}']._id)] | order(_createdAt desc) {
    _id,
    name,
    price,
    discount,
    "imageUrl": image.asset->url,
    slug
  }`;

  // ⚠️ إذا لم يعمل الاستعلام السابق (لأنك ربما لم تربط الأقسام بعد)،
  // يمكنك استبداله مؤقتاً بـ: *[_type == "product"] لجلب كل المنتجات للتجربة.
  
  const products = await client.fetch(query);

  return {
    props: {
      products: products || [],
      slug,
      categoryTitle
    }
  };
}

// التنسيقات
const productCardStyle = { width: '250px', backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '1px solid #eee', cursor: 'pointer' };
const ctaButtonStyle = { padding: '12px 30px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' };