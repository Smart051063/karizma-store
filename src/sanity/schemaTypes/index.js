// استيراد الملف الجديد (المدونة)
import post from './post'

// استيراد ملفاتك القديمة (المنتجات والبانر)
import product from './product'
import banner from './banner'

// تصدير القائمة الكاملة (لاحظ أننا أضفنا post للقائمة)
export const schemaTypes = [product, banner, post]