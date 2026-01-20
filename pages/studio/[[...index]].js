import { NextStudio } from 'sanity/next-studio'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  title: 'Karizma Studio',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {
    types: [], // سنضيف أنواع العطور هنا لاحقاً
  },
})

export default function StudioPage() {
  return <NextStudio config={config} />
}