import React from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '../src/context/CartContext';
import Script from 'next/script'; // 👈 استدعاء مكتبة السكربتات
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // 👇 هذا هو كود التيك توك الخاص بك
  const TIKTOK_PIXEL_ID = 'D5R89ABC77U6BSHUH0G0'; 

  return (
    <CartProvider>
      {/* 👇 هذا الكود يزرع التيك توك بيكسل في الموقع */}
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var tt=w[t]=w[t]||[];
            tt.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],
            tt.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var i=0;i<tt.methods.length;i++)tt.setAndDefer(tt,tt.methods[i]);
            tt.instance=function(t){for(var e=tt.methods[i],n=0;n<tt.methods.length;n++)tt.setAndDefer(e,tt.methods[n]);return e},
            tt.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
            tt._i=tt._i||{},tt._i[e]=[],tt._i[e]._u=i,tt._t=tt._t||{},tt._t[e]=+new Date,tt._o=tt._o||{},tt._o[e]=n||{};
            var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
            var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            
            tt.load("${TIKTOK_PIXEL_ID}");
            tt.page();
          }(window, document, 'ttq');
        `}
      </Script>

      <Toaster />
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp;