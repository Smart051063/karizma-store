import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '../src/context/LanguageContext';
import { CartProvider } from '../src/context/CartContext';
import Script from 'next/script';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LanguageProvider>
      <CartProvider>
        
        {/* ================================================= */}
        {/* 1️⃣ كود تيك توك بيكسل (TikTok Pixel) */}
        {/* ================================================= */}
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

                ttq.load('D5R89ABC77U6BSHUH0G0');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />

        {/* ================================================= */}
        {/* 2️⃣ كود فيسبوك بيكسل (Meta Pixel) - تم التحديث ✅ */}
        {/* ================================================= */}
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
              
              fbq('init', '1418587233195999'); // 👈 الرقم الصحيح من الصورة
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* ================================================= */}
        {/* 3️⃣ كود إحصائيات جوجل (Google Analytics) - إضافي ✅ */}
        {/* ================================================= */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-8MBK7Y702C`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8MBK7Y702C');
            `,
          }}
        />

        {/* بقية الموقع */}
        {mounted && <Toaster />}
        <Navbar /> 
        <Component {...pageProps} />
        <Footer /> 

      </CartProvider>
    </LanguageProvider>
  )
}

export default MyApp;