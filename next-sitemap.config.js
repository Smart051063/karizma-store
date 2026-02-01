/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.karizmaperfumes.com', // رابط موقعك
  generateRobotsTxt: true, // لإنشاء ملف robots.txt
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api'], // حماية لوحة التحكم
      },
    ],
    additionalSitemaps: [
      'https://www.karizmaperfumes.com/sitemap.xml',
    ],
  },
} 