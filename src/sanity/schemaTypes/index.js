// استيراد الملفات (بدون أقواس لأنها default export)
import product from './product'
import banner from './banner'
import post from './post'
import landingPage from './landingPage'

// 👇 1. استدعاء الملفات الجديدة هنا
import customer from './customer'
import review from './review'

// ✅ الحل: تصدير المصفوفة باسم schemaTypes ليقبلها ملف الإعدادات
export const schemaTypes = [
  product, 
  banner, 
  post, 
  landingPage, 
  customer, // 👈 2. تمت الإضافة هنا
  review    // 👈 وتمت الإضافة هنا
]