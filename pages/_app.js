import '../styles/globals.css';
import { CartProvider, useCart } from '../src/context/CartContext';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// ==================== مكون العناصر العامة (الفوتر والأزرار) ====================
const GlobalElements = ({ children }) => {
  const { totalQuantities } = useCart(); // لجلب عدد المنتجات للعداد الأحمر

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* محتوى الصفحة الحالية */}
      <main style={{ flex: 1 }}>
        {children}
        
        {/* ✅ زر العودة للصفحة الرئيسية */}
        <div style={{ textAlign: 'center', margin: '40px 0 20px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  background: 'black', 
                  color: '#d4af37', 
                  border: '2px solid #d4af37', 
                  padding: '12px 30px', 
                  borderRadius: '10px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold', 
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
                }}>
                    🏠 العودة للصفحة الرئيسية
                </div>
            </Link>
        </div>
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

          {/* العمود الثالث */}
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '1.2rem' }}>تواصل معنا</h4>
            <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📍 <span>28WM+22W، شارع إبن الرومي<br/>الحديقة الدولية، مدينة نصر</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>
              📞 01002410037
            </p>

            {/* أزرار السوشيال ميديا */}
            <h4 style={{ color: '#d4af37', marginTop: '20px', marginBottom: '15px', fontSize: '1rem' }}>تابعنا على:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href="https://www.facebook.com/profile.php?id=61561267272083&rdid=gegDMCqFiId602Va&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17s7Ue16en%2F#" target="_blank" style={socialIconStyle} title="Facebook">f</a>
              <a href="https://www.instagram.com/karizma.fragrances?utm_source=qr&igsh=MWJhbzk0czJ6M2Qzag%3D%3D" target="_blank" style={socialIconStyle} title="Instagram">📷</a>
              <a href="https://www.tiktok.com/@karizma.fragrance?_r=1&_t=ZS-93kSwuEYpST" target="_blank" style={socialIconStyle} title="TikTok">🎵</a>
              <a href="https://www.youtube.com/" target="_blank" style={socialIconStyle} title="YouTube">▶️</a>
              <a href="https://t.me/Karizma00Frigrances" target="_blank" style={socialIconStyle} title="Telegram">✈️</a>
              <a href="https://wa.me/201002410037" target="_blank" style={socialIconStyle} title="WhatsApp">💬</a>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #333', fontSize: '0.9rem', color: '#777' }}>
          © 2024 Karizma Perfumes. جميع الحقوق محفوظة.
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
        }} className="floating-btn">
        🛒
        {/* العداد الأحمر */}
        {totalQuantities > 0 && (
          <span style={{
            position: 'absolute', top: '-5px', left: '-5px',
            backgroundColor: '#e74c3c', color: 'white',
            width: '24px', height: '24px', borderRadius: '50%',
            fontSize: '12px', fontWeight: 'bold',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white'
          }}>{totalQuantities}</span>
        )}
      </Link>

      {/* 💬 زر الواتساب العائم */}
      <a href="https://wa.me/201002410037" target="_blank" style={{
          position: 'fixed', bottom: '20px', right: '20px',
          backgroundColor: '#25D366', color: 'white',
          width: '60px', height: '60px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '35px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 9999, transition: '0.3s', textDecoration: 'none'
        }} className="floating-btn">
        💬
      </a>
      
      <style jsx global>{`
        .floating-btn:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(0,0,0,0.4) !important; }
      `}</style>
    </div>
  );
};

// ==================== التطبيق الرئيسي ====================
export default function App({ Component, pageProps }) {
  const router = useRouter();

  // تيك توك بيكسل: إرسال PageView عند تغيير الصفحة
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.ttq) {
        window.ttq.page(); 
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <CartProvider>
      <Toaster />

      {/* 🔵 1. Facebook Pixel */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1418587233195999');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* ⚫ 2. TikTok Pixel (Safe Mode) */}
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
              var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
              var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            
              ttq.load('D5R8HEBC77UDQTF87QVG');
              ttq.page();
            }(window, document, 'ttq');
          `,
        }}
      />

      {/* 🔴 3. Google Analytics (GA4) - الكود الجديد */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-TR0K3GN7JB"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TR0K3GN7JB', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <GlobalElements>
        <Component {...pageProps} />
      </GlobalElements>
    </CartProvider>
  );
}

const socialIconStyle = { 
  width: '40px', height: '40px', borderRadius: '50%', 
  backgroundColor: '#d4af37', color: 'black', 
  display: 'flex', alignItems: 'center', justifyContent: 'center', 
  fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem',
  border: '2px solid #d4af37', transition: '0.3s'
};