import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '../src/context/CartContext';
import { LanguageProvider } from '../src/context/LanguageContext';
import Script from 'next/script';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // 👇 1. تعريف متغير حالة للتأكد من التحميل
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // عند تحميل الصفحة، نغير الحالة إلى true
  }, []);

  return (
    <LanguageProvider>
      <CartProvider>
        
        {/* كود تيك توك */}
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

        {/* 👇 2. نعرض التوستر فقط إذا اكتمل التحميل */}
        {mounted && <Toaster />}
        
        <Navbar /> 
        <Component {...pageProps} />
        <Footer /> 

      </CartProvider>
    </LanguageProvider>
  )
}

export default MyApp;