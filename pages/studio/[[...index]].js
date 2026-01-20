import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '../../src/sanity/schemaTypes'

const config = defineConfig({
  projectId: 'p8v3hsqn', // معرف مشروعك
  dataset: 'production',
  title: 'متجر كاريزما للعطور 🎨',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})

// هذا هو الجزء الذي ينقصك ويسبب الخطأ الأحمر
export default function StudioPage() {
  return <NextStudio config={config} />
}