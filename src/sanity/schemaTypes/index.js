import { product } from './product'
import { banner } from './banner'
import { post } from './post'
// 👇 1. استدعاء الملف الجديد
import landingPage from './landingPage' 

export const schema = {
  // 👇 2. إضافته للقائمة
  types: [product, banner, post, landingPage], 
}