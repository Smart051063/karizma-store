import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // جلب المنتجات
    client.fetch(`*[_type == "product"]{_id, name, price, discount, "imageUrl": image.asset->url, slug}`).then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  // دالة البحث
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = products.filter(product => 
      product.name && product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div style={{ minHeight: '80vh', direction: 'rtl', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* عنوان وحقل البحث */}
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ color: '#d4af37', fontSize: '2rem', marginBottom: '20px' }}>🔍 ابحث عن عطرك المفضل</h1>
        
        <input 
          type="text" 
          placeholder="اكتب اسم العطر هنا..." 
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: '100%', maxWidth: '500px', padding: '15px', borderRadius: '30px',
            border: '2px solid #d4af37', fontSize: '1.1rem', textAlign: 'center', outline: 'none'
          }}
        />
      </div>

      {/* شبكة النتائج */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            
            // 🛑 فحص أمان هام جداً: إذا لم يكن للمنتج رابط، لا تعرضه
            if (!product.slug || !product.slug.current) return null;

            // حساب السعر والخصم
            const hasDiscount = product.discount > 0;
            const originalPrice = product.price;
            const finalPrice = hasDiscount 
              ? Math.round(originalPrice - (originalPrice * product.discount / 100)) 
              : originalPrice;

            return (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div style={productCardStyle}>
                  
                  {/* الصورة + شريط الخصم */}
                  <div style={{ height: '150px', overflow: 'hidden', borderRadius: '10px 10px 0 0', position: 'relative' }}>
                      {hasDiscount && (
                        <div style={{ 
                          position: 'absolute', top: 0, left: 0, 
                          backgroundColor: '#e74c3c', color: 'white', 
                          fontSize: '0.8rem', padding: '4px 8px', 
                          borderRadius: '0 0 10px 0', fontWeight: 'bold', zIndex: 2
                        }}>
                          خصم {product.discount}%
                        </div>
                      )}
                      
                      {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>

                  {/* التفاصيل */}
                  <div style={{ padding: '10px', textAlign: 'center' }}>
                    <h3 style={productNameStyle}>{product.name}</h3>
                    
                    {hasDiscount ? (
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: '#999', textDecoration: 'line-through' }}>{originalPrice}</span>
                        <p style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>{finalPrice} ج.م</p>
                      </div>
                    ) : (
                      <p style={productPriceStyle}>{originalPrice} ج.م</p>
                    )}
                  </div>

                </div>
              </Link>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', marginTop: '30px', color: '#777', fontSize: '1.2rem' }}>
            لا توجد نتائج تطابق بحثك.. 🧐
          </p>
        )}
      </div>

      

    </div>
  );
}

// --- التنسيقات ---
const productCardStyle = { 
  width: '180px', backgroundColor: 'white', borderRadius: '10px', 
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #d4af37', 
  cursor: 'pointer', transition: 'transform 0.2s', margin: '10px'
};

const productNameStyle = { 
  fontSize: '0.9rem', color: '#1a1a1a', margin: '0 0 5px', fontWeight: 'bold',
  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
};

const productPriceStyle = { color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 };