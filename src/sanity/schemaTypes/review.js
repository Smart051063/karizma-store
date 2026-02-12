export default {
  name: 'review',
  title: '💬 تقييمات المنتجات',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'اسم العميل',
      type: 'string',
    },
    {
      name: 'product',
      title: 'المنتج الذي تم تقييمه',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'اتركه فارغاً إذا كان رأياً عاماً عن الموقع'
    },
    {
      name: 'comment',
      title: 'التعليق',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'التقييم (نجوم)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    }
  ]
}