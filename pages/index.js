{/* 1️⃣ قسم البنر العلوي (ثابت وغير قابل للنقر 🛑) */}
      {banner && (
        <div style={{ 
          backgroundColor: '#fff', 
          textAlign: 'center', 
          borderBottom: '1px solid #eee', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.05)' 
        }}>
          {/* 👇 تمت إزالة <Link> هنا */}
          <img 
            src={banner.imageUrl} 
            alt={banner.title} 
            style={{ 
              width: '100%', 
              height: 'auto', 
              maxHeight: '350px', 
              objectFit: 'cover',
              cursor: 'default' // 👈 المؤشر سيظهر كسهم عادي وليس كيد
            }} 
          />
        </div>
      )}