export default {
  name: 'banner',
  title: 'Banner (العروض والبنرات)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'عنوان العرض (مثلاً: خصومات رمضان)',
      type: 'string',
    },
    {
      name: 'heroImage', // 👈 الحقل الجديد للخلفية الرئيسية
      title: 'صورة الخلفية الرئيسية للموقع',
      description: 'هذه الصورة تظهر في أعلى الصفحة الرئيسية خلف كلمة كاريزما للعطور',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'image',
      title: 'صورة بنر العروض (السلايدر)',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'وصف قصير',
      type: 'text',
    },
    {
      name: 'link',
      title: 'رابط العرض (مثلاً: /oriental)',
      type: 'string',
      description: 'أين يذهب العميل عند الضغط على الصورة؟',
    },
    {
      name: 'isActive',
      title: 'تفعيل العرض؟',
      type: 'boolean',
      initialValue: true,
      description: 'شغل هذا الزر ليظهر العرض في الموقع، وأغلقه لإخفائه',
    }
  ],
};