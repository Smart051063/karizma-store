import React, { useState } from 'react';
import { client } from '../src/sanity/lib/client';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // لمعرفة هل تم البحث أم لا

  // دالة البحث
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setHasSearched(true);

    // البحث في الاسم أو الوصف
    const query = `*[_type == "product" && (name match "${searchTerm}*" || description match "${searchTerm}*")] | order(_createdAt desc) {
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug
    }`;

    try {
      const results = await client.fetch(query);
      setSearchResults(results);
    } catch (error) {
      console.error("خطأ في البحث:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', padding: '40px 20px', backgroundColor: '#f9f9f9', fontFamily: 'Arial' }}>
      <Head>
        <title>البحث | كاريزما للعطور</title>
      </Head>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#d4af37', marginBottom: '30px' }}>🔍 البحث عن عطر</h1>

        {/* نموذج البحث */}
        <form onSubmit={handleSearch} style={{ marginBottom: '50px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="اكتب اسم العطر..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={searchButtonStyle}>
            {loading ? '...' : 'بحث'}
          </button>
        </form>

        {/* عرض النتائج */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div style={productCardStyle}>
                  
                  {/* صورة المنتج */}
                  <div style={{ position: 'relative', height: '180px', backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden' }}>
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain', padding: '10px' }} sizes="200px" />
                    ) : (
                       <span style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>🧴</span>
                    )}
                  </div>

                  {/* تفاصيل المنتج */}
                  <div style={{ padding: '15px' }}>
                    <h3 style={{ fontSize: '1rem', color: '#333', margin: '10px 0' }}>{product.name}</h3>
                    <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem' }}>{product.price} ج.م</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            /* رسالة عند عدم وجود نتائج */
            hasSearched && !loading && (
              <div style={{ color: '#777', marginTop: '20px' }}>
                <h3>عذراً، لا توجد نتائج مطابقة لـ "{searchTerm}" 🙁</h3>
                <p>جرب البحث بكلمة أخرى.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
} 
// 👆 ✅ هذا القوس هو الذي كان ناقصاً وتسبب في المشكلة!

// ---للتنسيقات---
const inputStyle = {
  padding: '15px',
  borderRadius: '30px',
  border: '1px solid #ddd',
  width: '70%',
  maxWidth: '400px',
  fontSize: '1rem',
  outline: 'none',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
};

const searchButtonStyle = {
  padding: '15px 30px',
  borderRadius: '30px',
  border: 'none',
  backgroundColor: '#d4af37',
  color: 'black',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

const productCardStyle = {
  width: '200px',
  backgroundColor: 'white',
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  transition: '0.3s',
  border: '1px solid #eee',
  overflow: 'hidden',
  cursor: 'pointer'
};