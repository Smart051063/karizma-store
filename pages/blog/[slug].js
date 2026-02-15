import React from 'react';
import { client } from '../../src/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BlogPost({ post }) {
  const router = useRouter();

  // 1. حالة التحميل
  if (router.isFallback) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>⏳ جاري تحميل المقال...</div>;
  }

  // 2. حالة عدم وجود المقال
  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>⚠️ المقال غير موجود</h2>
        <Link href="/blog">
            <button style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>العودة للمدونة</button>
        </Link>
      </div>
    );
  }

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
        {/* العنوان */}
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '20px' }}>{post.title}</h1>

        {/* الصورة */}
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

        {/* المحتوى */}
        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444' }}>
          <PortableText 
            value={post.body} 
            components={{
              block: {
                normal: ({children}) => <p style={{ marginBottom: '15px' }}>{children}</p>,
                h2: ({children}) => <h2 style={{ color: '#d4af37', marginTop: '30px' }}>{children}</h2>,
              }
            }}
          />
        </div>
        
        <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px', color: '#888' }}>
            تم النشر في: {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('ar-EG') : ''}
        </div>
      </article>
    </div>
  );
}

// ✅ أهم جزء: البحث عن (post) وليس (product)
export const getStaticPaths = async () => {
  const query = `*[_type == "post"] { slug { current } }`;
  const posts = await client.fetch(query);
  const paths = posts.map((post) => ({ params: { slug: post.slug.current } }));
  return { paths, fallback: true };
}

export const getStaticProps = async ({ params: { slug } }) => {
  // لاحظ هنا نبحث عن post وليس product
  const query = `*[_type == "post" && slug.current == '${slug}'][0]{
    title, body, publishedAt, "imageUrl": mainImage.asset->url
  }`;
  const post = await client.fetch(query);

  if (!post) return { notFound: true };

  return { props: { post }, revalidate: 60 };
}