'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// تصحيح الاستيراد: استخدام schemaTypes بدلاً من schema
import {schemaTypes} from './src/sanity/schemaTypes/index.js'

// تعريف المتغيرات مباشرة
const projectId = 'qdlep10i'
const dataset = 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // تصحيح طريقة تمرير السكيما
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool({defaultApiVersion: '2024-01-01'}),
  ],
})