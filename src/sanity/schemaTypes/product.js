export default {
  name: 'product',
  title: 'المنتجات (Products)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'اسم المنتج (Name)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'رابط المنتج (Slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'السعر الأصلي (Price)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },

    // 👇👇👇 أضف هذا الحقل الجديد 👇👇👇
    {
      name: 'customSizes',
      title: 'أحجام وأسعار خاصة (اختياري)',
      description: 'أضف هذا فقط إذا كنت تريد تحديد سعر معين لحجم معين، وإلا سيقوم الموقع بحسابه تلقائياً',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'size', title: 'الحجم (مل)', type: 'number'}, // 50, 30, etc
            {name: 'price', title: 'السعر', type: 'number'}
          ]
        }
      ]
    },
    // ... باقي الحقول ...
    // ✅ التعديل هنا: طلب نسبة مئوية بدلاً من سعر ثابت
    {
      name: 'discount',
      title: 'نسبة الخصم % (Discount Percentage)',
      type: 'number',
      description: 'اكتب النسبة فقط (مثلاً: 20 أو 50). سيقوم الموقع بحساب السعر النهائي تلقائياً.',
      validation: Rule => Rule.min(0).max(100)
    },

    {
      name: 'category',
      title: 'القسم (Category)',
      type: 'string',
      options: {
        list: [
          { title: 'رجالي (Men)', value: 'men' },
          { title: 'نسائي (Women)', value: 'women' },
          { title: 'للجنسين (Unisex)', value: 'unisex' },
          { title: 'نيش (Niche)', value: 'niche' },
          { title: 'أعواد (Oud)', value: 'oud' },
          { title: 'خليجي (Gulf)', value: 'gulf' },
          { title: 'ميكسات (Mixes)', value: 'mixes' },
          { title: 'مسكات (Musks)', value: 'musks' },
          { title: 'بخور (Bakhoor)', value: 'bakhoor' },
          { title: 'فوحات ومباخر (Burners)', value: 'burners' },
          { title: 'معطرات (Fresheners)', value: 'fresheners' },
          { title: 'تجميل وعناية (Makeup)', value: 'makeup' },
          { title: 'منظفات ومطهرات (Detergents)', value: 'detergents' },
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'صورة المنتج',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'وصف المنتج',
      type: 'text', 
      rows: 3
    }
  ]
}