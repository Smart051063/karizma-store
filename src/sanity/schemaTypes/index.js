// استيراد الملفات (بدون أقواس لأنها default export)
import product from './product'
import banner from './banner'
import post from './post'
import landingPage from './landingPage'

// ✅ الحل: تصدير المصفوفة باسم schemaTypes ليقبلها ملف الإعدادات
export const schemaTypes = [product, banner, post, landingPage]