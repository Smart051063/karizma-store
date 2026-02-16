// ضعه في: pages/api/submit-review.js

import { createClient } from 'next-sanity'; // ✅ نستخدم مكتبة next-sanity المضمونة

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // ⚠️ يجب أن يكون false للكتابة الفورية
  token: process.env.SANITY_API_TOKEN,// 🔑 هذا هو المفتاح الذي يجب إضافته في .env
  apiVersion: '2024-01-01',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, rating, comment, productId } = req.body;

  // التحقق من البيانات
  if (!productId) {
    return res.status(400).json({ message: 'رقم المنتج غير موجود' });
  }

  try {
    // إنشاء مستند التقييم في Sanity
    await client.create({
      _type: 'review',
      name,
      rating: Number(rating),
      comment,
      product: {
        _type: 'reference',
        _ref: productId, // 🔗 ربط التقييم بالمنتج
      },
    });

    return res.status(200).json({ message: '✅ تم نشر التعليق بنجاح!' });
  } catch (error) {
    console.error('❌ خطأ Sanity:', error);
    return res.status(500).json({ message: 'فشل الحفظ', error: error.message });
  }
}