import React from 'react';
import { client } from '../../src/sanity/lib/client'; // لاحظ النقطتين للرجوع للخلف
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function BlogPost({ post }) {
  // حماية في حال لم يتم تحميل المقال بعد
  if (!post) return <div style={{textAlign:'center', padding:'50px'}}>جاري التحميل...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', direction: 'rtl', fontFamily: 'Tajawal, Arial' }}>
      <Head>
        <title>{post.title} | مدونة كاريزما</title>
      </Head>

      {/* زر العودة للمدونة */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Link href="/blog" style={{ textDecoration: 'none', color: '#d4af37', fontWeight: 'bold' }}>
           ← العودة للمدونة
        </Link>
      </div>

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        {/* عنوان المقال */}
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '20px' }}>{post.title}</h1>

        {/* الصورة الرئيسية */}
        {post.imageUrl && (
          <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '30px', borderRadius: '15px', overflow: 'hidden' }}>
            <Image 
              src={post.imageUrl} 
              alt={post.title} 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        )}

        {/* محتوى المقال (النص) */}
        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444' }}>
          <PortableText 
            value={post.body} 
            components={{
              block: {
                normal: ({children}) => <p style={{ marginBottom: '15px' }}>{children}</p>,
                h2: ({children}) => <h2 style={{ color: '#d4af37', marginTop: '30px' }}>{children}</h2>,
                h3: ({children}) => <h3 style={{ color: '#333', marginTop: '20px', fontWeight: 'bold' }}>{children}</h3>,
                blockquote: ({children}) => <blockquote style={{ borderRight: '4px solid #d4af37', paddingRight: '15px', fontStyle: 'italic', backgroundColor: '#f9f9f9', padding: '10px' }}>{children}</blockquote>,
              },
              list: {
                bullet: ({children}) => <ul style={{ listStyleType: 'disc', paddingRight: '20px', marginBottom: '15px' }}>{children}</ul>,
                number: ({children}) => <ol style={{ listStyleType: 'decimal', paddingRight: '20px', marginBottom: '15px' }}>{children}</ol>,
              }
            }}
          />
        </div>
        
        {/* تاريخ النشر */}
        <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px', color: '#888', fontSize: '0.9rem' }}>
            تم النشر في: {new Date(post.publishedAt).toLocaleDateString('ar-EG')}
        </div>
      </article>
    </div>
  );
}

// 1. إنشاء مسارات لجميع المقالات الموجودة
export const getStaticPaths = async () => {
  // نجلب المقالات (سواء كان اسمها في قاعدة البيانات post أو blogPost)
  const query = `*[_type == "post" || _type == "blogPost"] { slug { current } }`;
  const posts = await client.fetch(query);

  const paths = posts.map((post) => ({
    params: { slug: post.slug.current }
  }));

  return { paths, fallback: 'blocking' };
}

// 2. جلب محتوى المقال بناءً على الرابط (Slug)
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type in ["post", "blogPost"] && slug.current == '${slug}'][0]{
    title,
    body,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }`;

  const post = await client.fetch(query);

  if (!post) return { notFound: true };

  return { props: { post }, revalidate: 60 };
}