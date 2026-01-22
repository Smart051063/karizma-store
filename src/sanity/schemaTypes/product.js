export default {
  name: 'product',
  title: 'Product (المنتجات)',
  type: 'document',
  fields: [
    // --- البيانات الأساسية ---
    {
      name: 'name',
      title: 'اسم المنتج (Arabic Name)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'nameEn',
      title: 'اسم المنتج بالإنجليزية (English Name)',
      type: 'string',
      description: 'هذا الاسم سيظهر عند تحويل الموقع للغة الإنجليزية'
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
    
    // --- التصنيفات ---
    {
      name: 'category',
      title: 'Category (القسم الرئيسي)',
      type: 'string',
      options: {
        list: [
          { title: 'عطور (Perfumes)', value: 'perfumes' },
          { title: 'عود وبخور (Oud & Incense)', value: 'oud' },
          { title: 'معطرات المنزل (Home Scents)', value: 'home' },
        ],
      },
    },
    {
      name: 'subCategory',
      title: 'Sub Category (التصنيف الفرعي)',
      type: 'string',
      options: {
        list: [
          { title: 'رجالي (Men)', value: 'men' },
          { title: 'نسائي (Women)', value: 'women' },
          { title: 'للجنسين (Unisex)', value: 'unisex' },
          { title: 'خليجي (Gulf)', value: 'gulf' },
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
          { title: 'رمضان والأعياد', value: 'ramadan' },
        ],
      },
    },

    // --- الوصف ---
    {
      name: 'description',
      title: 'وصف المنتج (Arabic)',
      type: 'text',
    },
    {
      name: 'descriptionEn',
      title: 'وصف المنتج بالإنجليزية (English Description)',
      type: 'text',
    }
  ],
};