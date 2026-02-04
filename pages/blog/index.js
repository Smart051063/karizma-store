import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../src/sanity/lib/client'; // 👈 لاحظ المسار الصحيح

export default function Blog({ posts }) {
  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: '#f9f9f9', fontFamily: 'Arial, sans-serif' }}>
      
      {/* هيدر بسيط للمدونة */}
      <div style={{ backgroundColor: 'black', padding: '20px', textAlign: 'center', color: '#d4af37' }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>📝 مدونة كاريزما</h1>
        <p style={{ margin: '5px 0 0', color: 'white' }}>أسرار العطور وكيف تختار عطرك المثالي</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* التحقق هل توجد مقالات أم لا */}
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>لا توجد مقالات منشورة حالياً 📭</h2>
            <Link href="/">
              <button style={btnStyle}>العودة للرئيسية</button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {/* عرض المقالات */}
            {posts.map((post) => (
              <Link href={`/blog/${post.slug.current}`} key={post._id} style={{ textDecoration: 'none' }}>
                <div className="blog-card" style={cardStyle}>
                  {/* صورة المقال */}
                  <div style={{ position: 'relative', height: '200px', backgroundColor: '#eee' }}>
                    {post.imageUrl ? (
                      <Image 
                        src={post.imageUrl} 
                        alt={post.title} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                      />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>📝</div>
                    )}
                  </div>
                  
                  {/* عنوان ونبذة */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 10px', color: '#333', fontSize: '1.2rem' }}>{post.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      {post.excerpt ? post.excerpt : 'اقرأ المزيد لمعرفة التفاصيل...'}
                    </p>
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '0.9rem' }}>اقرأ المزيد ←</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link href="/">
            <button style={btnStyle}>🏠 العودة للرئيسية</button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .blog-card { transition: transform 0.3s box-shadow 0.3s; }
        .blog-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
}

// السيرفر: جلب البيانات من Sanity
export async function getStaticProps() {
  // جلب المقالات (Post)
  const posts = await client.fetch(`*[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    "imageUrl": mainImage.asset->url,
    "excerpt": array::join(string::split(pt::text(body), "")[0..100], "") + "..."
  }`);

  return {
    props: {
      posts: posts || [],
    },
    revalidate: 10, // تحديث الصفحة كل 10 ثوانٍ
  };
}

// تنسيقات بسيطة
const cardStyle = { backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' };
const btnStyle = { padding: '12px 25px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' };