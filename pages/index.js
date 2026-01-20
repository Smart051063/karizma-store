export default function PerfumesPage({ perfumes }) {
  return (
    <div style={{ padding: '20px', direction: 'rtl' }}>
      <h1>مجموعة كاريزما للعطور ✨</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {perfumes.map((perfume) => (
          <div key={perfume._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            {/* عرض صورة العطر المرفوعة */}
            {perfume.imageUrl && (
              <img src={perfume.imageUrl} alt={perfume.name} style={{ width: '100%', height: 'auto' }} />
            )}
            <h3>{perfume.name}</h3>
            <p style={{ fontWeight: 'bold' }}>السعر: {perfume.price} جنيه</p>
            <p>{perfume.description}</p>
            <button style={{ background: '#000', color: '#fff', padding: '5px 10px', cursor: 'pointer' }}>
              إضافة للسلة 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}