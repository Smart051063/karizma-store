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
    // 👇 هذا هو الحقل الجديد الذي أضفناه
    {
      name: 'slug',
      title: 'Slug (الرابط الخاص)',
      type: 'slug',
      options: {
        source: 'name', // سيقوم بتوليد الرابط تلقائياً من اسم المنتج
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
          { title: 'عطور', value: 'perfumes' },
          { title: 'عود وبخور', value: 'oud' },
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