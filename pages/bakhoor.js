import React from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function Bakhoor({ products }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '40px 20px', direction: 'rtl', fontFamily: 'Arial' }}>
      <Head>
        <title>قسم البخور والعود | كاريزما للعطور</title>
      </Head>

      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#d4af37' }}>💨 قسم البخور والعود</h1>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
              <div style={cardStyle}>
                
                {/* صورة المنتج */}
                <div style={{ position: 'relative', height: '220px', backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden' }}>
                   {product.imageUrl && (
                    <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain' }} sizes="250px" />
                   )}
                </div>

                {/* التفاصيل */}
                <div style={{ padding: '15px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '10px' }}>{product.name}</h3>
                  <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {product.price ? product.price + ' ج.م' : '---'}
                  </p>
                  <button style={detailsButtonStyle}>
                    عرض التفاصيل 📄
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ textAlign: 'center', width: '100%', marginTop: '50px' }}>
             <h3>لا توجد منتجات في هذا القسم حالياً ⏳</h3>
          </div>
        )}
      </div>
      
      {/* ملاحظة: لا يوجد زر عودة هنا لأنه موجود تلقائياً في _app.js */}

    </div>
  );
}

// ✅ الحل: تعريف الستايل خارج الدالة (في الأسفل)
const cardStyle = {
  width: '250px', 
  backgroundColor: 'white', 
  borderRadius: '15px', 
  overflow: 'hidden', 
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)', 
  transition: '0.3s',
  cursor: 'pointer',
  border: '1px solid #eee'
};

const detailsButtonStyle = {
  marginTop: '10px', 
  padding: '10px 20px', 
  backgroundColor: 'black', 
  color: 'white', 
  border: 'none', 
  borderRadius: '20px', 
  cursor: 'pointer',
  width: '100%'
};

// جلب البيانات بطريقة سريعة (مثل باقي الصفحات)
export const getStaticProps = async () => {
  const query = `*[_type == "product" && category == "bakhoor"] | order(_createdAt desc) {
    _id,
    name,
    price,
    slug,
    "imageUrl": image.asset->url
  }`;
  const products = await client.fetch(query);

  return {
    props: { products },
    revalidate: 10
  };
};