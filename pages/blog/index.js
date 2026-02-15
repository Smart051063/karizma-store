import React from 'react';
// 👇👇👇 التصحيح هنا: نقطتين زيادة للرجوع للمجلد الرئيسي
import { client } from '../../src/sanity/lib/client'; 
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogIndex({ posts }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: 'Tajawal, Arial', direction: 'rtl' }}>
      <Head>
        <title>مدونة كاريزما | أسرار العطور</title>
        <meta name="description" content="اقرأ أحدث المقالات والنصائح عن عالم العطور واختيار العطر المناسب لك." />
      </Head>

      {/* هيدر بسيط للمدونة */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#d4af37', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>📝 مدونة كاريزما</h1>
        <p style={{ color: '#ccc', fontSize: '1.2rem' }}>أسرار العطور وكيف تختار عطرك المثالي</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
        
        {/* شبكة عرض المقالات */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {posts?.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '15px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
                  width: '350px',
                  border: '1px solid #eee',
                  display: 'flex',
                  flexDirection: 'column'
              }}>
                {/* صورة المقال */}
                <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                  {post.imageUrl ? (
                    <Image src={post.imageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>لا توجد صورة</div>
                  )}
                </div>

                {/* محتوى الكارت */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.3rem' }}>{post.title}</h3>
                  <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.6' }}>
                     {/* عرض جزء بسيط من النص إذا وجد، أو نص ثابت */}
                     اضغط للقراءة لمعرفة المزيد من التفاصيل...
                  </p>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#999' }}>
                      {new Date(post.publishedAt).toLocaleDateString('ar-EG')}
                    </span>
                    <Link href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none' }}>
                       <span style={{ color: '#d4af37', fontWeight: 'bold', cursor: 'pointer' }}>اقرأ المزيد ←</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', width: '100%', padding: '50px' }}>
              <h3>لا توجد مقالات منشورة حالياً 📭</h3>
            </div>
          )}
        </div>

        {/* زر العودة للرئيسية */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
           <Link href="/">
             <button style={{ padding: '12px 30px', backgroundColor: '#d4af37', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>
               🏠 العودة للصفحة الرئيسية
             </button>
           </Link>
        </div>

      </div>
    </div>
  );
}

// جلب المقالات من Sanity
export const getStaticProps = async () => {
  // تأكد أن الاسم هنا يطابق اسم الـ Schema في Sanity (غالباً post)
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }`;

  const posts = await client.fetch(query);

  return {
    props: { posts },
    revalidate: 60 // تحديث كل دقيقة
  };
};