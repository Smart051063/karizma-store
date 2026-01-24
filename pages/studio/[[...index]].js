import Head from 'next/head'
import { NextStudio } from 'next-sanity/studio'
// نفترض أن ملف الإعدادات موجود في المجلد الرئيسي (خارج src أو pages)
import config from '../../sanity.config' 

export default function StudioPage() {
  return (
    <>
      <Head>
        {/* إعدادات بسيطة للعنوان والعرض لضمان عمل الاستوديو بشكل جيد على الجوال */}
        <title>لوحة التحكم | Karizma Studio</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta name="robots" content="noindex" /> {/* لمنع جوجل من أرشفة لوحة التحكم */}
      </Head>
      
      {/* تشغيل الاستوديو */}
      <NextStudio config={config} />
    </>
  )
}