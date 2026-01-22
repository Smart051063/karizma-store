export default {
  name: 'banner',
  title: 'Banner (العروض والبنرات)',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'صورة العرض',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      title: 'عنوان العرض (مثلاً: خصومات رمضان)',
      type: 'string',
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