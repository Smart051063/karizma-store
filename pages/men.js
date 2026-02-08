import React from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function Men({ products }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4', padding: '40px 20px', direction: 'rtl', fontFamily: 'Arial' }}>
      <Head>
        <title>عطور رجالية | كاريزما للعطور</title>
      </Head>

      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>🤵 عطور رجالية</h1>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {products.map((product) => (
          <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
            <div className="product-card" style={{ width: '250px', backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', transition: '0.3s' }}>
              <div style={{ position: 'relative', height: '250px', backgroundColor: '#fff' }}>
                 {product.discount > 0 && (
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#e74c3c', color: 'white', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 2 }}>
                    خصم {product.discount}%
                  </span>
                )}
                {product.imageUrl && (
                  <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain' }} sizes="250px" />
                )}
              </div>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '10px' }}>{product.name}</h3>
                <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} ج.م</p>
                <button style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

       {/* ❌ تم حذف زر العودة المكرر */}

      <style jsx global>{`
        .product-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
}

export const getStaticProps = async () => {
  const query = `*[_type == "product" && category == 'men'] | order(_createdAt desc) {
    _id, name, price, discount, slug,
    "imageUrl": image.asset->url
  }`;
  const products = await client.fetch(query);

  return { props: { products }, revalidate: 10 };
};