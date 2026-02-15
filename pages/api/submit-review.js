// هذا الكود يوضع فقط في: pages/api/submit-review.js

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // للنشر الفوري
  token: process.env.SANITY_API_TOKEN, // التوكن السري الذي وضعناه في .env.local
  apiVersion: '2024-01-01',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, rating, comment, productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'رقم المنتج غير موجود' });
  }

  try {
    // الإنشاء والنشر الفوري
    await client.create({
      _type: 'review',
      name,
      rating: Number(rating),
      comment,
      product: {
        _type: 'reference',
        _ref: productId,
      },
    });

    return res.status(200).json({ message: 'تم نشر التعليق بنجاح!' });
  } catch (error) {
    console.error('❌ خطأ في نشر التقييم:', error);
    return res.status(500).json({ message: 'فشل الحفظ', error: error.message });
  }
}