import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client';

export default function Home() {
  const [banner, setBanner] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 1. جلب البنر
    const bannerQuery = `*[_type == "banner" && isActive == true][0]{
      title, link, "imageUrl": image.asset->url
    }`;
    client.fetch(bannerQuery).then((data) => setBanner(data));

    // 2. جلب المنتجات
    const productQuery = `*[_type == "product"]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug
    }`;
    client.fetch(productQuery).then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white' }}>
      
      {/* 1️⃣ قسم البنر (يظهر فقط عند التفعيل) */}
      {banner && (
        <div style={{ backgroundColor: '#f0f0f0', textAlign: 'center' }}>
          <Link href={banner.link || '/search'}>
            <img 
              src={banner.imageUrl} 
              alt={banner.title} 
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', cursor: 'pointer' }} 
            />
          </Link>
        </div>
      )}

      {/* 2️⃣ الشاشة الرئيسية (Hero Section) */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        height: '70vh', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: