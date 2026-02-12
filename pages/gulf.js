import React from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function GulfPerfumes({ products }) {
  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: '#f9f9f9', fontFamily: 'Arial' }}>
      <Head>
        <title>العطور الخليجية والمخلطات | كاريزما للعطور</title>
      </Head>

      {/* الهيدر البسيط */}
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: 'black', color: '#d4af37' }}>
        <h1 style={{ margin: 0 }}>🕌 العطور الخليجية والمخلطات</h1>
        <Link href="/" style={{ color: 'white', textDecoration: 'underline', fontSize: '0.9rem', marginTop: '10px', display: 'block' }}>العودة للرئيسية</Link>
      </div>

      {/* شبكة المنتجات */}
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {products.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {products.map((product) => (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div style={productCardStyle}>
                  <div style={{ position: 'relative', height: '200px', backgroundColor: '#fff' }}>
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain', padding: '10px' }} sizes="250px" />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🪵</div>
                    )}
                  </div>
                  <div style={{ padding: '15px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '10px' }}>{product.name}</h3>
                    <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} ج.م</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', color: '#777' }}>
            <h2>قريباً.. أندر المخلطات الخليجية 🪵🔥</h2>
            <p>نعمل حالياً على إضافة منتجات هذا القسم.</p>
            <Link href="/shop"><button style={btnStyle}>تصفح كل العطور</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}

// جلب البيانات من Sanity
export const getStaticProps = async () => {
  // ⚠️ ملاحظة: تأكد أنك أنشأت تصنيفاً في Sanity والـ Slug الخاص به هو "gulf"
  // أو سيقوم الكود بجلب المنتجات التي تحتوي كلمة "خليجي" في اسمها أو وصفها كحل بديل
  const query = `*[_type == "product" && (category->slug.current == "gulf" || name match "خليجي*" || description match "خليجي*")] | order(_createdAt desc) {
    _id,
    name,
    price,
    "imageUrl": image.asset->url,
    slug
  }`;

  const products = await client.fetch(query);

  return {
    props: { products },
    revalidate: 60 // تحديث كل دقيقة
  };
};

// التنسيقات
const productCardStyle = {
  width: '250px',
  backgroundColor: 'white',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  transition: '0.3s',
  border: '1px solid #eee',
  overflow: 'hidden',
  cursor: 'pointer'
};

const btnStyle = {
  padding: '10px 25px',
  backgroundColor: '#d4af37',
  color: 'black',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '20px'
};