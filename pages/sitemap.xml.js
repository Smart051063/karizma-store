import { client } from '../src/sanity/lib/client';

const EXTERNAL_DATA_URL = 'https://www.karizmaperfumes.com';

function generateSiteMap(products) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/shop</loc>
       <changefreq>daily</changefreq>
       <priority>0.8</priority>
     </url>
     ${products
       .map(({ slug }) => {
         return `
       <url>
           <loc>${EXTERNAL_DATA_URL}/product/${slug.current}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  // جلب جميع المنتجات التي لها رابط صحيح
  const products = await client.fetch(`*[_type == "product" && defined(slug.current)]{slug}`);

  // توليد ملف XML
  const sitemap = generateSiteMap(products);

  res.setHeader('Content-Type', 'text/xml');
  // إرسال الملف للمتصفح
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}