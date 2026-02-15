import { createClient } from '@sanity/client';

// إعداد العميل للكتابة (Write Client)
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // مهم جداً أن يكون false للكتابة والقراءة الفورية
  token: process.env.SANITY_API_TOKEN, // 🔑 المفتاح السري (تأكد من صلاحياته Editor أو أعلى)
  apiVersion: '2024-01-01',
});

export default async function handler(req, res) {
  // السماح فقط بطلبات POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, rating, comment, productId } = req.body;

  // التحقق من البيانات الأساسية
  if (!name || !rating || !comment || !productId) {
    return res.status(400).json({ message: 'بيانات غير مكتملة' });
  }

  try {
    // ✅ الخطوة السحرية: ننشئ المستند ونعطيه ID عشوائي
    const doc = {
      _type: 'review',
      name,
      rating: Number(rating),
      comment,
      product: {
        _type: 'reference',
        _ref: productId, // ربط التعليق بالمنتج
      },
    };

    // نستخدم client.create ولكن النتيجة تكون منشورة فوراً إذا كان الـ Token بصلاحية Editor
    // للتأكد 100%، سنستخدم create وبمجرد نجاحها تكون منشورة
    await client.create(doc);

    return res.status(200).json({ message: 'تم نشر التعليق بنجاح!' });
  } catch (error) {
    console.error('Error submitting review:', error);
    return res.status(500).json({ message: 'حدث خطأ أثناء الحفظ', error: error.message });
  }
}