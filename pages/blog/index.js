// pages/blog/index.js
import Link from 'next/link';
import { client } from '../../src/sanity/lib/client'; // 👈 تأكد أن مسار الكلاينت صحيح حسب ملفاتك

export default function Blog({ posts }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مدونة كاريزما</h1>
          <p className="text-xl text-gray-600">أحدث المقالات والنصائح في عالم العطور</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug.current}`} key={post._id} className="group">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 h-full flex flex-col">
                {/* صورة المقال */}
                {post.imageUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {/* محتوى الكارت */}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString('ar-EG')}
                    </span>
                    <span className="text-blue-600 font-medium text-sm">اقرأ المزيد ←</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            لا توجد مقالات منشورة حالياً.
          </div>
        )}
      </div>
    </div>
  );
}

// ⚙️ هذا الكود يعمل على السيرفر لجلب البيانات أثناء البناء
export async function getStaticProps() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url
  }`);

  return {
    props: {
      posts,
    },
    revalidate: 10, // تحديث الصفحة كل 10 ثوانٍ إذا جد جديد
  };
}