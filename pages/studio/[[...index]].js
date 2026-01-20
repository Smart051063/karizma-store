import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '../../src/sanity/schemaTypes'

const config = defineConfig({
  projectId: 'qdlep10i', // رقم مشروعك الجديد لضمان صلاحية الدخول
  dataset: 'production',
  title: 'متجر كاريزما للعطور 🎨',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})

export default function StudioPage() {
  return <NextStudio config={config} />
}