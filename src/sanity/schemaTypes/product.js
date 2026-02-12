export default {
  name: 'product',
  title: 'المنتجات (Products)',
  type: 'document',
  fields: [
    // 1️⃣ اسم المنتج
    {
      name: 'name',
      title: 'اسم المنتج (Name)',
      type: 'string',
      validation: Rule => Rule.required().error('يجب إدخال اسم المنتج')
    },
    
    // 2️⃣ الرابط (Slug)
    {
      name: 'slug',
      title: 'رابط المنتج (Slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },

    // 3️⃣ السعر الأصلي (قبل الخصم)
    {
      name: 'price',
      title: 'السعر الأصلي (Original Price)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },

    // 4️⃣ السعر بعد الخصم (هذا هو التعديل المهم) 🔥
    {
      name: 'discountPrice',
      title: 'السعر بعد الخصم (Discount Price)',
      type: 'number',
      description: 'اكتب السعر النهائي هنا (مثلاً: 600). اتركه فارغاً إذا لم يكن هناك خصم.',
      validation: Rule => Rule.min(0)
    },

    // 5️⃣ التصنيف
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

    // 6️⃣ صورة المنتج
    {
      name: 'image',
      title: 'صورة المنتج',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },

    // 7️⃣ الوصف
    {
      name: 'description',
      title: 'وصف المنتج',
      type: 'text', 
      rows: 3
    }
  ]
}