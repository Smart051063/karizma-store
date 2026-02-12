import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // نستخدم false للكتابة الفورية
  token: process.env.SANITY_API_TOKEN, // 🔑 المفتاح السري الذي أنشأته
  apiVersion: '2024-01-01',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, rating, comment, productId } = req.body;

  try {
    await client.create({
      _type: 'review',
      name,
      rating: Number(rating),
      comment,
      product: {
        _type: 'reference',
        _ref: productId, // ربط التعليق بالمنتج
      },
    });

    return res.status(200).json({ message: 'تم نشر التعليق بنجاح!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'حدث خطأ أثناء الحفظ' });
  }
}