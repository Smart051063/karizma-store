import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'qdlep10i', // رقم مشروعك الجديد
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // اجعلها false لترى التحديثات فوراً بدون تأخير الكاش
})