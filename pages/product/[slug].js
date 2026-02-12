import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function ProductDetails({ product, reviews, relatedProducts, error }) {
  const { onAdd, setShowCart } = useCart();
  
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

  const handleAddToCart = () => {
    onAdd(product, 1);
    setShowCart(true);
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
          
          {/* ✅ تعديل عرض السعر المحدث */}
          <div style={{ marginBottom: '30px' }}>
            {product.discountPrice ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 style={{ color: '#d4af37', fontSize: '2.5rem', margin: 0 }}>{product.discountPrice} ج.م</h2>
                <span style={{ color: '#999', fontSize: '1.5rem', textDecoration: 'line-through' }}>{product.price} ج.م</span>
                <span style={{ backgroundColor: '#ffefef', color: '#ff4d4d', padding: '4px 10px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', border: '1px solid #ff4d4d' }}>خصم خاص 🔥</span>
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
            ) : <p style={{ textAlign: 'center', color: '#777' }}>لا توجد تقييمات بعد.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({ params: { slug: product.slug.current } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // ✅ أضفنا discountPrice هنا لكي يتم جلب البيانات من Sanity
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