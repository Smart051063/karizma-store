// pages/blog/[slug].js
import { client } from '../../src/sanity/lib/client';
import { PortableText } from 'next-sanity'; // لترجمة محتوى المقال وتنسيقه

export default function BlogPost({ post }) {
  if (!post) return <div className="text-center py-20">المقال غير موجود</div>;

  return (
    <article className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        {/* زر العودة */}
        <a href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
          ← عودة للمدونة
        </a>

        {/* العنوان */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

        {/* التاريخ */}
        <div className="text-gray-500 text-sm mb-8">
          نشر في: {new Date(post.publishedAt).toLocaleDateString('ar-EG')}
        </div>

        {/* الصورة الرئيسية */}
        {post.imageUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* محتوى المقال (Portable Text) */}
        <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
}

// 1. تحديد الروابط المطلوبة (Slugs) لبنائها
export async function getStaticPaths() {
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
}

// 2. جلب بيانات المقال بناءً على الرابط
export async function getStaticProps({ params }) {
  const { slug } = params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      body,
      "imageUrl": mainImage.asset->url
    }`,
    { slug }
  );

  return {
    props: { post },
    revalidate: 10,
  };
}