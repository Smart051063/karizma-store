'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// استيراد السكيما مع تحديد المسار الكامل لتجنب الأخطاء
import {schema} from './src/sanity/schemaTypes/index.js'

// تعريف المتغيرات مباشرة (باستخدام القيم التي أرسلتها لي)
const projectId = 'qdlep10i'
const dataset = 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    visionTool({defaultApiVersion: '2024-01-01'}),
  ],
})