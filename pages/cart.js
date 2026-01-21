import Link from 'next/link'

export default function CartPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', direction: 'rtl' }}>
      <h1>عربة التسوق 🛒</h1>
      <p>هذه الصفحة قيد الإنشاء حالياً...</p>
      <br />
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        العودة للتسوق
      </Link>
    </div>
  )
}