import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType' // (إذا كان لديك ملف للتصنيفات، وإلا احذف هذا السطر)
import { postType } from './postType' // (نفس الشيء، احذف السطر إذا لم يكن لديك مدونة)
import product from './product' // 👈 هذا هو السطر الأهم! استيراد ملف المنتج الجديد

export const schema = {
  types: [product], // 👈 ونضعه هنا في القائمة
}