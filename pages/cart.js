import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // 1. استدعاء الذاكرة

export default function Cart() {
  // 2. لاحظ أننا جلبنا removeFromCart هنا
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const checkoutHandler = () => {
    const phoneNumber = "201000000000"; 
    let message = "مرحباً، أود إتمام الطلب التالي من متجر كاريزما:%0a";
    
    cart.forEach(item => {
      message += `- ${item.name} (العدد: ${item.quantity}) - السعر: ${item.price * item.quantity} ج.م%0a`;
    });

    message += `%0a💰 *الإجمالي الكلي: ${total} ج.م*`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-black min-h-screen pb-20">
      <Navbar />
      
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-yellow-500 mb-8 font-serif">
          سلة المشتريات
        </h1>

        {cart.length === 0 ? (
          <div className="text-center mt-12 border border-gray-800 p-10 rounded-lg bg-gray-900/30">
            <p className="text-gray-400 text-xl mb-6">سلتك فارغة حالياً 🛒</p>
            <Link href="/perfumes" className="bg-yellow-600 text-black px-6 py-3 rounded font-bold hover:bg-yellow-500 transition">
              تصفح العطور الآن
            </Link>
          </div>
        ) : (
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 max-w-4xl mx-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-gray-800 py-4 last:border-0">
                <div className="flex-1">
                  <h3 className="text-xl text-yellow-500 font-serif">{item.name}</h3>
                  <p className="text-gray-400 text-sm">الكمية: {item.quantity}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-white font-bold text-lg">
                    {item.price * item.quantity} ج.م
                  </div>
                  
                  {/* 🆕 زر الحذف الأحمر */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-900/30 p-2 rounded transition"
                    title="حذف المنتج"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8 border-t border-yellow-600/30 pt-6">
              <div className="flex justify-between items-center text-2xl font-bold text-white mb-6">
                <span>الإجمالي الكلي:</span>
                <span className="text-yellow-500">{total} ج.م</span>
              </div>

              <button 
                onClick={checkoutHandler}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-lg transition duration-300 flex justify-center items-center gap-2 text-lg">
                <span>📱</span>
                إتمام الطلب عبر واتساب
              </button>
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div className="text-center mt-8">
            <Link href="/perfumes" className="text-gray-400 hover:text-yellow-500 underline">
              ← إضافة المزيد من المنتجات
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}