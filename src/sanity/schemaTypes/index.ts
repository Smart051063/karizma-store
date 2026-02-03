// src/sanity/schemaTypes/index.ts

// 1. استيراد الملف الجديد
import post from './post'

// 2. استيراد ملفاتك القديمة
import product from './product'
import banner from './banner'

// 3. تصدير القائمة الكاملة (بنفس الصيغة التي تعمل عندك)
export const schemaTypes = [product, banner, post]