import React, { useEffect } from 'react';
import Script from 'next/script'; // استيراد مكون السكربت من Next.js
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { CartProvider } from '../src/context/CartContext';
import TopBar from '../src/components/TopBar';
import Footer from '../src/components/Footer';

// 👇 ضع رقم البيكسل الخاص بك هنا بدلاً من الأصفار
const FB_PIXEL_ID = '1418587233195999'; 

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // تتبع تغيير الصفحات (لأن Next.js لا يعيد تحميل الصفحة بالكامل)
    const handleRouteChange = () => {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(FB_PIXEL_ID);
          ReactPixel.pageView();
        });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* 1️⃣ كود فيسبوك بيكسل الرئيسي */}
      <Script
        id="fb-pixel"
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
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* 2️⃣ باقي الموقع */}
      <CartProvider>
        <TopBar />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </>
  );
}

export default MyApp;