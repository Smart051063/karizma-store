import Navbar from '../components/Navbar';
import Link from 'next/link'; // 1. استدعاء أداة الروابط

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center text-center p-4 h-[80vh]">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-500 mb-4 font-serif">
          Karizma
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 tracking-widest uppercase">
          Luxury Fragrances
        </p>
        
        {/* 2. تغليف الزر بالرابط */}
        <Link href="/perfumes">
          <button className="mt-8 px-8 py-3 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300 uppercase tracking-widest cursor-pointer">
            تسوق الآن
          </button>
        </Link>
      </div>
    </div>
  );
}