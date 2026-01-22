export default {
  name: 'product',
  title: 'Product (المنتجات)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name (اسم المنتج)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (الرابط الخاص)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    {
      name: 'price',
      title: 'Price (السعر)',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Image (صورة المنتج)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category (القسم الرئيسي)',
      type: 'string',
      options: {
        list: [
          { title: 'عطور (Perfumes)', value: 'perfumes' },
          { title: 'عود وبخور (Oud & Incense)', value: 'oud' },
          { title: 'معطرات المنزل (Home Scents)', value: 'home' }, // 👈 قسم جديد للفواحات والمعطرات
        ],
      },
    },
    {
      name: 'subCategory',
      title: 'Sub Category (التصنيف الفرعي)',
      type: 'string',
      options: {
        list: [
          // الأقسام القديمة
          { title: 'رجالي (Men)', value: 'men' },
          { title: 'نسائي (Women)', value: 'women' },
          { title: 'للجنسين (Unisex)', value: 'unisex' },
          { title: 'خليجي (Gulf)', value: 'gulf' },
          
          // 👇 الأقسام الجديدة التي طلبتها
          { title: 'عطور مسك (Musk)', value: 'musk' },
          { title: 'ميكسات عطور (Mixes)', value: 'mixes' },
          { title: 'أعواد شرقية (Oriental Sticks)', value: 'oriental' },
          { title: 'بخور (Incense)', value: 'incense' },
          { title: 'فواحات ومباخر (Burners)', value: 'burners' },
          { title: 'معطرات (Fresheners)', value: 'fresheners' },
        ],
      },
    },
    {
      name: 'occasion',
      title: 'Occasion (المناسبة)',
      type: 'string',
      options: {
        list: [
          { title: 'استخدام يومي', value: 'daily' },
          { title: 'هدايا (Gifts)', value: 'gifts' },
          { title: 'حفلات زفاف (Wedding)', value: 'wedding' },
          { title: 'رمضان والأعياد', value: 'ramadan' }, // 👈 إضافة ممتازة للمواسم
        ],
      },
    },
    {
      name: 'description',
      title: 'Description (وصف المنتج)',
      type: 'text',
    }
  ],
};