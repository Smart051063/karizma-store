// 👇 استيراد الملف الجديد
import post from './post'

// 👇 استيراد ملفاتك القديمة كما هي
import product from './product'
import banner from './banner'

// 👇 دمج الجميع في القائمة النهائية
export const schemaTypes = [product, banner, post]