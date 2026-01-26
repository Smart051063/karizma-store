import Link from 'next/link';

export default function Perfumes() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', direction: 'rtl', minHeight: '80vh' }}>
      
      <h1 style={{ color: '#d4af37', marginBottom: '20px' }}>قسم العطور 🧴</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>جاري تجهيز هذه الصفحة بأحدث المنتجات...</p>
      
      {/* 👇 زر العودة للصفحة الرئيسية (تم وضعه في المكان الصحيح) */}
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

    </div>
  );
}