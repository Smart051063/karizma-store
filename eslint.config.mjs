'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// استيراد السكيما مع تحديد المسار الكامل لتجنب الأخطاء
// (نضيف /index.js لضمان العثور على الملف)
import {schema} from './src/sanity/schemaTypes/index.js'

// تعريف المتغيرات مباشرة هنا بدلاً من استيرادها من ملف خارجي
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})