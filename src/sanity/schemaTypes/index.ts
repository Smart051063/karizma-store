// src/sanity/schemaTypes/index.ts

// استيراد الملفات الموجودة لديك (تأكد أن الأسماء تطابق ملفاتك الحالية)
// مثال: import { product } from './product'
// مثال: import { category } from './category'

import post from './post' // 👈 أضف هذا السطر (استيراد ملف المقالات)

export const schema = {
  types: [
    // ... أضف هنا ملفاتك القديمة (product, category, etc)
    post, // 👈 أضف هذا السطر لتفعيل المقالات
  ],
}