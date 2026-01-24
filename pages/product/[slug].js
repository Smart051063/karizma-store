import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';

export default function ProductDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (slug) {
      // 1. جلب بيانات المنتج (بما فيها الخصم discount)
      client.fetch(`*[_type == "product" && slug.current == $slug][0]{
        _id, 
        name, 
        price, 
        discount, 
        description, 
        "imageUrl": image.asset->url
      }`, { slug }).then(setProduct);
    }
  }, [slug]);

  if (!product) return <div style={{ textAlign: 'center', padding: '50px' }}>جاري التحميل... ⏳</div>;

  // 🔥 2. معادلة حساب السعر الجديد
  const hasDiscount = product.discount > 0;
  const originalPrice = product.price;
  const finalPrice = hasDiscount 
    ? Math.round(originalPrice - (originalPrice * product.discount / 100)) 
    : originalPrice;

  // دالة الإضافة للسلة (ترسل السعر الجديد)
  const handleAddToCart = () => {
    addToCart({ ...product, price: finalPrice }, qty); // 👈 نرسل finalPrice بدلاً من price الأصلي
    alert(`تمت إضافة ${product.name} إلى السلة بسعر ${finalPrice} ج.م`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', direction: 'rtl', fontFamily: 'Arial, sans-serif' }}>
      
      <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* صورة المنتج */}
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '400px', position: 'relative' }}>
          {/* شريط الخصم على الصورة */}
          {hasDiscount && (
             <div style={{ 
               position: 'absolute', top: '10px', right: '10px', 
               backgroundColor: '#e74c3c', color: 'white', padding: '5px 15px', 
               borderRadius: '20px', fontWeight: 'bold', fontSize: '1rem', zIndex: 2
             }}>
               خصم {product.discount}% 🔥
             </div>
          )}
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '15px', border: '1px solid #ddd' }} />
        </div>

        {/* تفاصيل المنتج */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', color: '#1a1a1a', marginBottom: '10px' }}>{product.name}</h1>
          
          <div style={{ marginBottom: '20px' }}>
            {hasDiscount ? (
              // عرض السعر القديم والجديد إذا كان هناك خصم
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '1.2rem', color: '#999', textDecoration: 'line-through' }}>{originalPrice} ج.م</span>
                <span style={{ fontSize: '1.8rem', color: '#e74c3c', fontWeight: 'bold' }}>{finalPrice} ج.م</span>
              </div>
            ) : (
              // عرض السعر العادي
              <p style={{ fontSize: '1.5rem', color: '#d4af37', fontWeight: 'bold' }}>{originalPrice} ج.م</p>
            )}
          </div>

          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '30px', fontSize: '1.1rem' }}>
            {product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.'}
          </p>

          {/* أزرار التحكم بالكمية */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={qtyBtnStyle}>-</button>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', width: '30px', textAlign: 'center' }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} style={qtyBtnStyle}>+</button>
          </div>

          {/* زر الإضافة للسلة */}
          <button 
            onClick={handleAddToCart}
            style={{
              padding: '15px', backgroundColor: '#1a1a1a', color: '#d4af37', 
              border: 'none', borderRadius: '10px', fontSize: '1.1rem', 
              cursor: 'pointer', fontWeight: 'bold', width: '100%',
              transition: 'background 0.3s'
            }}
          >
            إضافة للسلة 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #ccc',
  backgroundColor: 'white', cursor: 'pointer', fontSize: '1.2rem'
};