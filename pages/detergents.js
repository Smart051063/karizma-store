import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { client } from '../src/sanity/lib/client';

export default function Detergents() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 👇 التعديل تم هنا: البحث أصبح عن النص مباشرة
    client.fetch(`*[_type == "product" && category == "detergents"]`).then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', padding: '50px 20px' }}>
      <Head>
        <title>منظفات ومطهرات | Karizma Store</title>
      </Head>

      <h1 style={{ textAlign: 'center', color: '#d4af37', marginBottom: '40px', fontSize: '2.5rem' }}>
        🧼 منظفات ومطهرات
      </h1>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777' }}>
           جاري تحميل المنتجات أو لا توجد منتجات حالياً...
           <br/>
           <span style={{fontSize: '0.9rem', color: 'red'}}>(تأكد أنك قمت بنشر المنتج وضبط القسم على "منظفات ومطهرات")</span>
        </p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {products.map((product) => (
             product.slug?.current && (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div className="product-card" style={productCardStyle}>
                  <div style={{ height: '250px', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
                    {product.imageUrl ? (
                       <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                       product.image && <img src={client.imageUrl(product.image).url()} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <div style={{ padding: '15px', textAlign: 'center' }}>
                    <h3 style={{ fontWeight: 'bold', margin: '10px 0', color: '#333' }}>{product.name}</h3>
                    <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} ج.م</p>
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
}

const productCardStyle = { 
  width: '280px', 
  backgroundColor: 'white', 
  borderRadius: '15px', 
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)', 
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  border: '1px solid #eee'
};