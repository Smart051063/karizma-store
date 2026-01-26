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
{/* 👇 زر العودة للصفحة الرئيسية */}
      <div style={{ marginTop: '60px', marginBottom: '30px', textAlign: 'center' }}>
        <Link href="/" style={{ 
          display: 'inline-block', 
          padding: '12px 30px', 
          backgroundColor: '#1a1a1a', 
          color: '#d4af37', 
          textDecoration: 'none', 
          borderRadius: '8px', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}>
          🏠 العودة للصفحة الرئيسية
        </Link>
      </div>
}