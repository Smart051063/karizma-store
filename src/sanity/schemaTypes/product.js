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
      name: 'price',
      title: 'Price (السعر)',
      type: 'number',
    },
    {
      name: 'details',
      title: 'Details (التفاصيل)',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image (صورة المنتج)',
      type: 'image', // تم تعديل النوع ليكون image مباشرة لسهولة التعامل
      options: {
        hotspot: true,
      },
    },
    // --- القوائم الجديدة للتصنيف ---
    {
      name: 'category',
      title: 'Category (القسم الرئيسي)',
      type: 'string',
      options: {
        list: [
          { title: 'عطور (Perfumes)', value: 'perfumes' },
          { title: 'مكياج (Makeup)', value: 'makeup' },
          { title: 'عناية (Skincare)', value: 'skincare' },
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
          { title: 'خليجي / أعواد (Gulf)', value: 'gulf' },
        ],
      },
    },
    {
      name: 'occasion',
      title: 'Occasion (المناسبة)',
      type: 'string',
      options: {
        list: [
          { title: 'هدايا (Gifts)', value: 'gifts' },
          { title: 'حفلات زفاف (Wedding)', value: 'wedding' },
          { title: 'يومي (Daily)', value: 'daily' },
        ],
      },
    }
  ],
}