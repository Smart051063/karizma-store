import { client } from '../src/sanity/lib/client'
import Image from 'next/image'

export default function Home({ perfumes }) {
  return (
    <div style={{ padding: '20px', direction: 'rtl', fontFamily: 'Arial' }}>
      <h1>مجموعة كاريزما للعطور ✨</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {perfumes.map((perfume) => (
          <div key={perfume._id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', textAlign: 'center' }}>
            {/* عرض صورة العطر */}
            {perfume.imageUrl && (
              <img src={perfume.imageUrl} alt={perfume.name} style={{ width: '100%', borderRadius: '8px' }} />
            )}
            <h3>{perfume.name}</h3>
            <p style={{ color: '#888' }}>{perfume.description}</p>
            <p style={{ fontWeight: 'bold', color: '#d4af37' }}>السعر: {perfume.price} جنيه</p>
            <button style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              إضافة للسلة 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// كود سحب البيانات من Sanity
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
    revalidate: 10, // تحديث البيانات كل 10 ثوانٍ
  }
}