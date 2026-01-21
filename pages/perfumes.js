import Link from 'next/link'

export default function Perfumes() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', direction: 'rtl' }}>
      <h1>قسم العطور 🧴</h1>
      <p>جاري تجهيز هذه الصفحة بأحدث المنتجات...</p>
      <br />
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        العودة للرئيسية
      </Link>
    </div>
  )
}