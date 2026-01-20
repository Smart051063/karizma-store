import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext'; // 1. استدعاء الذاكرة
import { useState } from 'react'; // 2. استدعاء التنبيهات

export default function Makeup() {
  const { addToCart } = useCart(); // استخراج دالة الإضافة
  const [notification, setNotification] = useState(null); // حالة التنبيه

  const products = [
    { id: 101, name: "أحمر شفاه مخملي", price: 350, desc: "لون أحمر كلاسيكي بلمسة مطفية (Matte)" },
    { id: 102, name: "مسكارا تكثيف", price: 220, desc: "سواد فاحم ورموش طويلة وكثيفة" },
    { id: 103, name: "كريم أساس", price: 450, desc: "تغطية كاملة تدوم 24 ساعة لجميع البشرات" },
    { id: 104, name: "آيلاينر سائل", price: 180, desc: "رسمة دقيقة وثبات عالي ضد الماء" },
    { id: 105, name: "بودرة خدود", price: 250, desc: "لمسة وردية طبيعية تضيء الوجه" },
    { id: 106, name: "ظلال عيون سموكي", price: 550, desc: "لوحة ألوان متكاملة للمناسبات الليلية" },
  ];
  // ملاحظة: غيرت أرقام الـ id لتبدأ من 101 حتى لا تتكرر مع العطور

  const handleBuy = (item) => {
    addToCart(item);
    setNotification(`تم إضافة "${item.name}" للسلة 💄`);
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div className="bg-black min-h-screen pb-10 relative">
      <Navbar />

      {/* التنبيه العائم */}
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce border border-pink-400">
          {notification}
        </div>
      )}
      
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-yellow-500 mb-2 font-serif">
          مستحضرات التجميل الفاخرة
        </h1>
        <p className="text-gray-400 text-center mb-12 tracking-wide">لمسات تبرز جمالك الطبيعي</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item.id} className="border border-gray-800 bg-gray-900/50 p-6 rounded-lg hover:border-pink-600 transition duration-300 group">
              
              <div className="h-64 bg-black w-full mb-6 flex items-center justify-center text-gray-700 group-hover:text-pink-500/50 transition border border-gray-800">
                <span className="text-4xl opacity-20">KARIZMA</span>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl text-yellow-500 font-serif mb-2">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-4 min-h-[40px]">{item.desc}</p>
                
                <div className="flex justify-center items-center gap-4 mt-4 border-t border-gray-800 pt-4">
                  <span className="text-white text-lg font-bold">{item.price} ج.م</span>
                  <button 
                    onClick={() => handleBuy(item)}
                    className="bg-pink-700 text-white px-6 py-2 text-sm font-bold hover:bg-pink-600 transition rounded-sm active:scale-95">
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