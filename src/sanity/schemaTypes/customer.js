export default {
  name: 'customer',
  title: '👥 العملاء ونقاط الولاء',
  type: 'document',
  fields: [
    {
      name: 'phoneNumber',
      title: '📱 رقم الهاتف (هووية العميل)',
      type: 'string',
      validation: Rule => Rule.required().warning('رقم الهاتف ضروري لتمييز العميل')
    },
    {
      name: 'name',
      title: 'اسم العميل',
      type: 'string',
    },
    {
      name: 'points',
      title: '💎 رصيد النقاط الحالي',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.min(0)
    },
    {
      name: 'notes',
      title: 'ملاحظات (طلبات سابقة)',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'phoneNumber',
      score: 'points'
    },
    prepare(selection) {
      const {title, subtitle, score} = selection
      return {
        title: title || 'بدون اسم',
        subtitle: `${subtitle} - الرصيد: ${score || 0} نقطة 💎`
      }
    }
  }
}