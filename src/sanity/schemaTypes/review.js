export default {
  name: 'review',
  title: '💬 آراء العملاء',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'اسم العميل',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'comment',
      title: 'التعليق',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'التقييم (من 1 إلى 5 نجوم)',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'image',
      title: 'صورة العميل (اختياري)',
      type: 'image',
      options: { hotspot: true }
    }
  ]
}