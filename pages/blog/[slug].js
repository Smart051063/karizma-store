import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../src/sanity/lib/client';
import { PortableText } from '@portabletext/react'; // المكتبة التي قمنا بتثبيتها

export default function BlogPost({ post }) {
  
  // شاشة تحميل أو خطأ إذا لم يوجد المقال
  if (!post) return (
    <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>⚠️ المقال غير موجود</h1>
      <Link href="/blog" style={{ color: '#d4af37' }}>العودة للمدونة</Link>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1. صورة الغلاف (الهيرو) */}
      <div style={{ position: 'relative', width: '100%', height: '50vh', backgroundColor: 'black' }}>
        {post.imageUrl && (
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill 
            style={{ objectFit: 'cover', opacity: 0.7 }} 
            priority
          />
        )}
        {/* العنوان فوق الصورة */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '40px 20px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', color: 'white' }}>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', color: '#d4af37' }}>{post.title}</h1>
            {post.publishedAt && (
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                📅 نُشر في: {new Date(post.publishedAt).toLocaleDateString('ar-EG')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. محتوى المقال */}
      <div style={{ maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
        
        {/* زر العودة */}
        <div style={{ marginBottom: '30px' }}>
          <Link href="/blog" style={{ textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>
            ← العودة لجميع المقالات
          </Link>
        </div>

        {/* جسم المقال (النصوص والصور الداخلية) */}
        <div className="content-body">
          <PortableText 
            value={post.body} 
            components={myPortableTextComponents} 
          />
        </div>

        {/* خاتمة وزر */}
        <div style={{ marginTop: '60px', borderTop: '1px solid #eee', paddingTop: '30px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>هل أعجبك المقال؟</h3>
          <Link href="/shop">
            <button style={{ padding: '12px 30px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>
              تصفح عطورنا الآن 🛍️
            </button>
          </Link>
        </div>

      </div>

      {/* تنسيقات خاصة للنصوص القادمة من Sanity */}
      <style jsx global>{`
        .content-body h2 { color: #d4af37; margin-top: 40px; font-size: 1.8rem; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
        .content-body h3 { color: #333; margin-top: 30px; font-size: 1.4rem; font-weight: bold; }
        .content-body p { margin-bottom: 20px; text-align: justify; }
        .content-body ul { padding-right: 20px; margin-bottom: 20px; list-style-type: disc; color: #555; }
        .content-body li { margin-bottom: 10px; }
        .content-body blockquote { border-right: 5px solid #d4af37; padding-right: 20px; margin: 30px 0; font-style: italic; background: #fafafa; padding: 20px; color: #555; }
        .content-body strong { color: black; }
        .content-body a { color: #d4af37; text-decoration: underline; }
      `}</style>
    </div>
  );
}

// 🖌️ تخصيص مكونات PortableText (للصور داخل المقال)
const myPortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div style={{ margin: '30px 0', position: 'relative', height: '400px', width: '100%' }}>
          {/* ملاحظة: هذا يتطلب دالة مساعدة لجلب رابط الصورة، لكن للتبسيط سنتركها الآن */}
          <img 
             src={`https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`} 
             style={{ width: '100%', height: 'auto', borderRadius: '10px' }} 
             alt={value.alt || 'صورة مقال'}
          />
        </div>
      );
    }
  }
};

// 1. إنشاء المسارات
export async function getStaticPaths() {
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
}

// 2. جلب البيانات
export async function getStaticProps({ params }) {
  const { slug } = params;
  
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    publishedAt,
    body,
    "imageUrl": mainImage.asset->url
  }`, { slug });

  return {
    props: {
      post: post || null,
    },
    revalidate: 10,
  };
}