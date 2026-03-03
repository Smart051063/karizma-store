import { Html, Head, Main, NextScript } from "next/document";
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap" rel="stylesheet" />

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