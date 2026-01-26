import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    // 👇 التعديل هنا: جعلنا اللغة عربية والاتجاه من اليمين لليسار
    <Html lang="ar" dir="rtl">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}