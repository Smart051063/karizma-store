export const schemaTypes = [
  {
    name: 'perfume',
    title: 'العطور 🧴',
    type: 'document',
    fields: [
      { name: 'name', title: 'اسم العطر', type: 'string' },
      { name: 'price', title: 'السعر', type: 'number' },
      { name: 'description', title: 'وصف العطر', type: 'text' },
      { name: 'image', title: 'صورة العطر', type: 'image', options: { hotspot: true } },
    ]
  }
]