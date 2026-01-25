const handleAddToCart = () => {
   // 👇 الصحيح: نرسل السعر الأصلي (product.price)
   // ونترك السلة تقوم بخصم النسبة مرة واحدة فقط
   addToCart({ 
     _id: product._id,
     name: product.name,
     price: product.price, // ✅ هنا نرسل 780
     discount: product.discount,
     image: product.imageUrl,
     slug: product.slug.current,
     quantity: quantity 
   });
   // ...
};