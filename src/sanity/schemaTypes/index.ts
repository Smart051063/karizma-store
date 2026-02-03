// src/sanity/schemaTypes/index.ts

// 1. استيراد الملف الجديد
import post from './post'

// 2. استيراد ملفاتك القديمة (كما هي)
import product from './product'
import banner from './banner'

// 3. تصدير القائمة (بنفس الصيغة التي تعمل عندك حالياً)
export const schemaTypes = [product, banner, post]