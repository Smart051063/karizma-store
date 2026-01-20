import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
// تأكد أن هذا المسار يؤدي لملف الأنواع الذي أنشأناه
import { schemaTypes } from '../../src/sanity/schemaTypes'

const config = defineConfig({
  projectId: 'p8v3hsqn', // معرف مشروعك
  dataset: 'production',
  title: 'متجر كاريزما للعطور 🎨',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
})

// هذا الجزء هو "المكون" الذي يعرض اللوحة في المتصفح
export default function StudioPage() {
  return <NextStudio config={config} />
}