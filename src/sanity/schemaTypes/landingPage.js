export default {
  name: 'landingPage',
  title: '⚙️ إعدادات صفحة الهبوط',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'عنوان العرض (للتوضيح فقط)',
      type: 'string',
    },
    {
      name: 'offerEndTime',
      title: '⏰ موعد انتهاء العرض (التاريخ والوقت)',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: Rule => Rule.required().warning('يجب تحديد موعد لانتهاء العرض لكي يعمل العداد')
    },
    {
      name: 'heroImage',
      title: '📸 صورة العرض (اختياري)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoUrl',
      title: '🎥 رابط فيديو العرض (اختياري - من ملفات public)',
      type: 'string',
      description: 'مثال: /offer.mp4'
    },
    // 👇👇 هذا هو القسم الجديد لإضافة المنتجات 👇👇
    {
      name: 'selectedProducts',
      title: '📦 منتجات العرض (اختر يدوياً)',
      type: 'array',
      description: 'أضف هنا المنتجات التي تريد ظهورها في صفحة الهبوط',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }] // ربط مع قسم المنتجات
        }
      ]
    }
  ]
}