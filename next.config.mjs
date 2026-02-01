/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.karizmaperfumes.com', // رابط موقعك
  generateRobotsTxt: true, // ✅ هذا السطر هو الذي سينشئ ملف robots.txt
  sitemapSize: 7000,
  
  // التحكم في الملف
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/', // اسمح لجوجل بدخول كل الموقع
        disallow: ['/studio', '/api'], // ⛔ امنع جوجل من دخول لوحة التحكم والـ API
      },
    ],
    // إضافة رابط الخريطة داخل الملف
    additionalSitemaps: [
      'https://www.karizmaperfumes.com/sitemap.xml',
    ],
  },
}