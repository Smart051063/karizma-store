import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'qdlep10i', // معرف مشروعك Karizma-Store
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // اجعلها false لترى التحديثات فوراً أثناء التطوير
})