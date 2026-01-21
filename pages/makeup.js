import Link from 'next/link'

export default function Makeup() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', direction: 'rtl' }}>
      <h1>قسم المكياج 💄</h1>
      <p>جاري إضافة منتجات التجميل قريباً...</p>
      <br />
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        العودة للرئيسية
      </Link>
    </div>
  )
}