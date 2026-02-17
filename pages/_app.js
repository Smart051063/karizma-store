import '../styles/globals.css';
import { CartProvider, useCart } from '../src/context/CartContext';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Script from 'next/script'; // استيراد Script
import { useEffect } from 'react'; // 👈 هام جداً: استيراد useEffect
import { useRouter } from 'next/router'; // 👈 هام: لمتابعة تغيير الصفحات

// ... (GlobalElements Component - اتركه كما هو) ...
const GlobalElements = ({ children }) => {
  // ... نفس الكود السابق ...
  const { totalQuantities } = useCart();
  return (
    // ... نفس الكود السابق ...
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
       {/* ... باقي الكود ... */}
       {children}
       {/* ... باقي الكود ... */}
    </div>
  );
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // كود تيك توك بيكسل اليدوي (لضمان العمل مرة واحدة)
    const handleRouteChange = () => {
      if (window.ttq) {
        window.ttq.page(); // إرسال حدث PageView عند تغيير الصفحة
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

      {/* 🔵 Facebook Pixel - الطريقة الصحيحة */}
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

      {/* ⚫ TikTok Pixel - الطريقة الصحيحة والآمنة */}
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

      <GlobalElements>
        <Component {...pageProps} />
      </GlobalElements>
    </CartProvider>
  );
}

// ... (socialIconStyle - اتركه كما هو) ...
const socialIconStyle = { 
  // ... نفس الكود ...
};