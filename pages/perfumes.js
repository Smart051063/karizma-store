import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext'; // استيراد الذاكرة
import { useState } from 'react'; // لإظهار رسالة صغيرة عند الإضافة

export default function Perfumes() {
  const { addToCart } = useCart(); // استخراج دالة الإضافة
  
  // حالة لإظهار رسالة "تمت الإضافة"
  const [notification, setNotification] = useState(null);

  const products = [
    { id: 1, name: "عود ملكي", price: 450, desc: "رائحة العود الفاخر مع لمسات العنبر" },
    { id: 2, name: "مسك الليل", price: 320, desc: "نظافة وانتعاش يدوم طويلاً" },
    { id: 3, name: "روز باريس", price: 280, desc: "زهور فرنسية مع الفانيليا" },
    { id: 4, name: "ليذر انتنس", price: 500, desc: "قوة الجلود مع التوابل الحارة" },
    { id: 5, name: "باتشولي", price: 380, desc: "عبق الأرض والأخشاب العطرية" },
    { id: 6, name: "عنبر خاص", price: 600, desc: "فخامة العنبر الخالص للمناسبات" },
  ];

  const handleBuy = (item) => {
    addToCart(item);
    // إظهار تنبيه صغير
    setNotification(`تم إضافة "${item.name}" للسلة ✅`);
    setTimeout(() => setNotification(null), 2000); // إخفاء التنبيه بعد ثانيتين
  };

  return (
    <div className="bg-black min-h-screen pb-10 relative">
      <Navbar />

      {/* رسالة التنبيه العائمة */}
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}
      
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-yellow-500 mb-2 font-serif">
          مجموعة العطور الحصرية
        </h1>
        <p className="text-gray-400 text-center mb-12 tracking-wide">اكتشف جاذبية لا تقاوم</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item.id} className="border border-gray-800 bg-gray-900/50 p-6 rounded-lg hover:border-yellow-600 transition duration-300 group">
              <div className="h-64 bg-black w-full mb-6 flex items-center justify-center text-gray-700 group-hover:text-yellow-500/50 transition border border-gray-800">
                <span className="text-4xl opacity-20">KARIZMA</span>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl text-yellow-500 font-serif mb-2">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-4 min-h-[40px]">{item.desc}</p>
                
                <div className="flex justify-center items-center gap-4 mt-4 border-t border-gray-800 pt-4">
                  <span className="text-white text-lg font-bold">{item.price} ج.م</span>
                  
                  {/* زر الشراء الفعال */}
                  <button 
                    onClick={() => handleBuy(item)}
                    className="bg-yellow-600 text-black px-6 py-2 text-sm font-bold hover:bg-yellow-500 transition rounded-sm active:scale-95">
                    شراء +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}