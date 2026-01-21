import { client } from '../src/sanity/lib/client'

// 1. كود الواجهة (Frontend) - يوضع في أعلى الملف
export default function PerfumesPage({ perfumes }) {
  return (
    <div style={{ padding: '40px', direction: 'rtl', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: '40px' }}>مجموعة كاريزما للعطور ✨</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {perfumes.map((perfume) => (
          <div key={perfume._id} style={{ 
            border: 'none', 
            borderRadius: '15px', 
            padding: '20px', 
            textAlign: 'center', 
            backgroundColor: '#fff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease'
          }}>
            {/* عرض صورة العطر */}
            {perfume.imageUrl && (
              <img 
                src={perfume.imageUrl} 
                alt={perfume.name} 
                style={{ width: '100%', height: '250px', objectFit: 'contain', borderRadius: '10px', marginBottom: '15px' }} 
              />
            )}
            <h3 style={{ fontSize: '1.4rem', color: '#333' }}>{perfume.name}</h3>
            <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>السعر: {perfume.price} جنيه</p>
            <p style={{ color: '#666', fontSize: '0.9rem', minHeight: '50px' }}>{perfume.description}</p>
            
            <button style={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              padding: '12px 25px', 
              border: 'none', 
              borderRadius: '30px', 
              cursor: 'pointer',
              fontSize: '1rem',
              width: '100%',
              marginTop: '15px'
            }}>
              إضافة للسلة 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// 2. كود جلب البيانات (Backend) - يوضع في أسفل الملف
export async function getStaticProps() {
  const perfumes = await client.fetch(`*[_type == "perfume"]{
    _id,
    name,
    price,
    description,
    "imageUrl": image.asset->url
  }`)

  return {
    props: { perfumes },
    revalidate: 10, // تحديث الصفحة تلقائياً عند إضافة عطور جديدة
    // update).
  }
}