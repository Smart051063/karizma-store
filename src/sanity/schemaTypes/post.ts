export default {
  name: 'post',
  title: 'Blog Post (المقالات)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'عنوان المقال',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'رابط المقال (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'صورة الغلاف',
      type: 'image',
      options: {
        hotspot: true,
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
      title: 'مقتطف قصير',
      type: 'text',
      rows: 3,
    },
    {
      name: 'body',
      title: 'محتوى المقال',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    },
  ],
}