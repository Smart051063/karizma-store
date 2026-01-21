import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: 'qdlep10i', // 👈 تأكد أن هذا هو الرقم الجديد
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // 👈 اجعلها false (مهم جداً لكي تظهر التعديلات فوراً)
})npm run dev