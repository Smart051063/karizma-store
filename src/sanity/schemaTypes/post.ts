// src/sanity/schemaTypes/post.ts

export default {
  name: 'post',
  title: 'Blog Post (المقالات)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'عنوان المقال',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('العنوان مطلوب'),
    },
    {
      name: 'slug',
      title: 'رابط المقال (Slug)',
      type: 'slug',
      options: {
        source: 'title', // يقوم بإنشاء الرابط تلقائياً من العنوان
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('الرابط مطلوب'),
    },
    {
      name: 'mainImage',
      title: 'صورة الغلاف',
      type: 'image',
      options: {
        hotspot: true, // يسمح بقص الصورة والتركيز على جزء معين
      },
    },
    {
      name: 'publishedAt',
      title: 'تاريخ النشر',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'excerpt',
      title: 'مقتطف قصير (يظهر في قائمة المقالات)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'body',
      title: 'محتوى المقال',
      type: 'array',
      of: [
        { type: 'block' }, // للنصوص والفقرات
        {
          type: 'image', // للسماح بإضافة صور داخل وسط المقال
          options: { hotspot: true },
        },
      ],
    },
  ],
}