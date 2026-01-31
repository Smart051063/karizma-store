import Head from 'next/head'
import { NextStudio } from 'next-sanity/studio'
// 👇 هذا السطر يفترض أن ملف sanity.config.js موجود في المجلد الرئيسي للمشروع
// إذا ظهر خطأ في المسار، تأكد أن عدد النقاط (../../) يوصل للملف الصحيح
import config from '../../sanity.config' 

export default function StudioPage() {
  return (
    <>
      <Head>
        <title>لوحة التحكم | Karizma Studio</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta name="robots" content="noindex" /> {/* يمنع جوجل من أرشفة لوحة الأدمن */}
      </Head>
      
      {/* تشغيل الاستوديو بالإعدادات المستوردة */}
      <NextStudio config={config} />
    </>
  )
}