// 👇 لاحظ: استيراد بدون أقواس (لأننا نستخدم export default في الملفات)
import product from './product'
import banner from './banner'

// 👇 لاحظ: غيرنا الاسم إلى schemaTypes ليرضى ملف الإعدادات
export const schemaTypes = [product, banner]