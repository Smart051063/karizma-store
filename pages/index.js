{/* 1️⃣ قسم البنر العلوي ... */}
{banner && (
  <div style={{ backgroundColor: '#f0f0f0', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
    <Link href={banner.link || '/search'}>
      <img 
        src={banner.imageUrl} 
        alt={banner.title} 
        style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer' }} 
      />
    </Link>
  </div>
)}