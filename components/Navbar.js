import Link from 'next/link';
import { useCart } from '../context/CartContext'; // 1. استدعاء أداة الاتصال بالذاكرة

export default function Navbar() {
  const { cartCount } = useCart(); // 2. جلب عدد المنتجات الحالي

  return (
    <nav className="bg-black border-b border-yellow-600/30 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* الشعار */}
        <Link href="/" className="text-2xl font-bold text-yellow-500 font-serif tracking-wider">
          KARIZMA
        </Link>

        {/* الروابط */}
        <div className="flex gap-6 text-gray-300 text-sm tracking-wide items-center">
          <Link href="/perfumes" className="hover:text-yellow-400 transition">العطور</Link>
          <Link href="/makeup" className="hover:text-yellow-400 transition">التجميل</Link>
          
          {/* رابط السلة مع العداد الذكي */}
          <Link href="/cart" className="hover:text-yellow-400 transition font-bold flex items-center gap-1">
            <span>🛒</span>
            <span>السلة</span>
            <span className="bg-yellow-600 text-black text-xs rounded-full px-2 py-0.5 ml-1">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}