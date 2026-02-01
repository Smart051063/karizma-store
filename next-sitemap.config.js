/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.karizmaperfumes.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  
  // 👇 حذفنا قسم additionalSitemaps لأنه هو سبب المشكلة
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api'],
      },
    ],
  },
} 