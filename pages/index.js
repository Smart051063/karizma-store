{/* 4️⃣ وصلنا حديثاً (نسخة فائقة الرشاقة ✨) */}
      <div style={{ padding: '10px 10px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333', fontSize: '1.8rem' }}>وصلنا حديثاً ✨</h2>
        
        {/* تقليل الفجوة (gap) لـ 10px لتبدو المنتجات متقاربة وأنيقة */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {products.map((product) => {
            if (!product.slug || !product.slug.current) return null;
            return (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div style={productCardStyle}>
                  {/* 👇 ارتفاع الصورة أصبح 130px فقط */}
                  <div style={{ height: '130px', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
                     {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  
                  {/* 👇 تقليل المسافات الداخلية وحجم الخط */}
                  <div style={{ padding: '8px', textAlign: 'center' }}>
                    <h3 style={{ 
                      fontSize: '0.85rem', // خط صغير وأنيق
                      color: '#1a1a1a', 
                      margin: '0 0 5px', 
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis' 
                    }}>
                      {product.name}
                    </h3>
                    <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '0.95rem', margin: 0 }}>
                      {product.price} ج.م
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>