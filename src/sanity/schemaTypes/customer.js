export default {
  name: 'customer',
  title: '👥 العملاء ونقاط الولاء',
  type: 'document',
  fields: [
    {
      name: 'phoneNumber',
      title: '📱 رقم الهاتف (هوية العميل)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'name',
      title: 'اسم العميل',
      type: 'string',
    },
    {
      name: 'points',
      title: '💎 رصيد النقاط',
      type: 'number',
      initialValue: 0
    },
    // 👇👇 هذا هو الحقل الجديد 👇👇
    {
      name: 'purchasedProducts',
      title: '🛍️ المنتجات التي اشتراها (للسماح بالتقييم)',
      type: 'array',
      description: 'أضف هنا المنتجات التي اشتراها العميل لكي يتمكن من تقييمها على الموقع',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'phoneNumber',
    }
  }
}