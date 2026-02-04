import '../styles/globals.css';
import { CartProvider, useCart } from '../src/context/CartContext';
import Link from 'next/link';

// هذا المكون يحتوي على الأزرار العائمة والفوتر
const GlobalElements = ({ children }) => {
  const { totalQuantities } = useCart(); // العداد الأحمر للسلة

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* محتوى الصفحة الحالية */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* ==================== الفوتر الموحد ==================== */}
      <footer style={{ backgroundColor: 'black', color: 'white', padding: '60px 20px 20px', borderTop: '5px solid #d4af37', direction: 'rtl', fontFamily: 'Arial' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', textAlign: 'right' }}>
          
          {/* العمود الأول */}
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '20px' }}>✨ Karizma</h3>
            <p style={{ lineHeight: '1.8', color: '#ccc' }}>
              نحن لا نبيع مجرد عطور، بل نصنع ذكريات لا تُنسى. تشكيلة فاخرة من العطور الفرنسية والشرقية المستوحاة بأعلى جودة.
            </p>
          </div>

          {/* العمود الثاني */}
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '1.2rem' }}>روابط تهمك</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}><Link href="/offers" style={{ color: '#fff', textDecoration: 'none' }}>🔥 العروض والخصومات</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/men" style={{ color: '#fff', textDecoration: 'none' }}>🤵 عطور رجالية</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/women" style={{ color: '#fff', textDecoration: 'none' }}>💃 عطور نسائية</Link></li>
              <li style={{ marginBottom: '10px' }}><Link href="/blog" style={{ color: '#fff', textDecoration: 'none' }}>📝 نصائح وجمال</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: التواصل والسوشيال ميديا */}
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '1.2rem' }}>تواصل معنا</h4>
            <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📍 <span>28WM+22W، شارع إبن الرومي<br/>الحديقة الدولية، مدينة نصر</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>
              📞 01002410037
            </p>

            {/* 👇👇 هنا أزرار السوشيال ميديا (استبدل الروابط بروابطك) 👇👇 */}
            <h4 style={{ color: '#d4af37', marginTop: '20px', marginBottom: '15px', fontSize: '1rem' }}>تابعنا على:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              
              {/* فيسبوك */}
              <a href="https://www.facebook.com/" target="_blank" style={socialIconStyle} title="Facebook">f</a>
              
              {/* انستجرام */}
              <a href="https://www.instagram.com/" target="_blank" style={socialIconStyle} title="Instagram">📷</a>
              
              {/* تيك توك */}
              <a href="https://www.tiktok.com/" target="_blank" style={socialIconStyle} title="TikTok">🎵</a>
              
              {/* يوتيوب */}
              <a href="https://www.youtube.com/" target="_blank" style={socialIconStyle} title="YouTube">▶️</a>
              
              {/* تليجرام */}
              <a href="https://t.me/" target="_blank" style={socialIconStyle} title="Telegram">✈️</a>

               {/* واتساب (أيقونة إضافية في الفوتر) */}
               <a href="https://wa.me/201002410037" target="_blank" style={socialIconStyle} title="WhatsApp">💬</a>

            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #333', fontSize: '0.9rem', color: '#777' }}>
          © 2024 Karizma Fragrances. جميع الحقوق محفوظة.
        </div>
      </footer>

      {/* ==================== الأزرار العائمة ==================== */}
      
      {/* 🛒 زر السلة العائم */}
      <Link href="/cart" style={{
          position: 'fixed', bottom: '90px', right: '20px', 
          backgroundColor: 'white', color: 'black', border: '2px solid #d4af37',
          width: '60px', height: '60px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 9999, cursor: 'pointer', textDecoration: 'none'
        }}
        className="floating-btn"
      >
        🛒
        {/* 🔴 العداد الأحمر */}
        {totalQuantities > 0 && (
          <span style={{
            position: 'absolute', top: '-5px', left: '-5px',
            backgroundColor: '#e74c3c', color: 'white',
            width: '24px', height: '24px', borderRadius: '50%',
            fontSize: '12px', fontWeight: 'bold',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white'
          }}>
            {totalQuantities}
          </span>
        )}
      </Link>

      {/* 💬 زر الواتساب العائم (بالرقم الصحيح) */}
      <a 
        href="https://wa.me/201002410037" 
        target="_blank"
        style={{
          position: 'fixed', bottom: '20px', right: '20px',
          backgroundColor: '#25D366', color: 'white',
          width: '60px', height: '60px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '35px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 9999, transition: '0.3s', textDecoration: 'none'
        }}
        className="floating-btn"
      >
        💬
      </a>
      
      <style jsx global>{`
        .floating-btn:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(0,0,0,0.4) !important; }
      `}</style>
    </div>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <GlobalElements>
        <Component {...pageProps} />
      </GlobalElements>
    </CartProvider>
  );
}

// تصميم أيقونات السوشيال ميديا (ذهبي وأسود)
const socialIconStyle = { 
  width: '40px', height: '40px', borderRadius: '50%', 
  backgroundColor: '#d4af37', color: 'black', 
  display: 'flex', alignItems: 'center', justifyContent: 'center', 
  fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem',
  border: '2px solid #d4af37', transition: '0.3s'
};