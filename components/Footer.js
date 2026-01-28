import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111', color: '#fff', padding: '60px 20px 20px', direction: 'rtl', fontFamily: 'Arial, sans-serif', borderTop: '4px solid #d4af37' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>

        {/* 1️⃣ العمود الأول */}
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#d4af37', margin: '0 0 20px', fontSize: '2rem', fontFamily: 'serif' }}>Karizma ✨</h2>
          <p style={{ color: '#bbb', lineHeight: '1.8', marginBottom: '25px', fontSize: '0.95rem' }}>
            نحن لا نبيع مجرد عطور، بل نصنع ذكريات لا تُنسى. تشكيلة فاخرة من العطور الفرنسية والشرقية.
          </p>
          
          {/* 👇 الأزرار الذهبية تظهر هنا */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <SocialButton href="https://www.facebook.com/profile.php?id=61561267272083&rdid=6JOpUVqKfGsE7Z4L&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17s7Ue16en%2F#" path={icons.facebook} label="فيسبوك" />
            <SocialButton href="https://www.instagram.com/karizma.fragrances?utm_source=qr&igsh=MWJhbzk0czJ6M2Qzag%3D%3D" path={icons.instagram} label="إنستجرام" />
            <SocialButton href="https://www.tiktok.com/@karizma.fragrance?is_from_webapp=1&sender_device=pc.com" path={icons.tiktok} label="تيك توك" />
            <SocialButton href="https://wa.me/201002410037" path={icons.whatsapp} label="واتساب" />
          </div>
        </div>
        {/* 2️⃣ العمود الثاني */}
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '1.3rem' }}>روابط تهمك</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <FooterLink href="/offers" text="🔥 العروض والخصومات" />
            <FooterLink href="/men" text="🤵 عطور رجالية" />
            <FooterLink href="/women" text="💃 عطور نسائية" />
            <FooterLink href="/makeup" text="💄 تجميل وعناية" />
          </ul>
        </div>

        {/* 3️⃣ العمود الثالث */}
        <div style={{ flex: '1 1 250px' }}>
          <h3 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '1.3rem' }}>تواصل معنا</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#bbb', fontSize: '0.95rem' }}>
            <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem', marginTop: '-5px' }}>📍</span>
              <div>
                <p style={{ margin: '0 0 10px 0', lineHeight: '1.6', color: '#fff' }}>
                  28WM+22W، شارع إبن الرومي<br />
                  الحديقة الدولية، مدينة نصر
                </p>
                {/* زر الخريطة الذهبي */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=28WM%2B22W+%D8%A5%D8%A8%D9%86+%D8%A7%D9%84%D8%B1%D9%88%D9%85%D9%8A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gold-btn" 
                  style={{ fontSize: '0.85rem', padding: '6px 12px' }}
                >
                  عرض الموقع على الخريطة 🗺️
                </a>
              </div>
            </li>
            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span style={{fontSize: '1.2rem'}}>📞</span>
               <a href="tel:01002410037" style={{ color: '#bbb', textDecoration: 'none' }}>01002410037</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{ borderTop: '1px solid #333', marginTop: '50px', paddingTop: '20px', textAlign: 'center', color: '#777' }}>
        <p>© 2026 جميع الحقوق محفوظة لـ <span style={{ color: '#d4af37' }}>كاريزما للعطور</span>.</p>
      </div>
    </footer>
  );
}

// مكون الزر الذهبي الجديد
function SocialButton({ href, path, label }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="gold-btn social-circle-btn" // 👈 هذا الكلاس هو الذي يجعلها ذهبية ودائرية
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}

function FooterLink({ href, text }) {
  return <li style={{ marginBottom: '12px' }}><Link href={href} style={{ color: '#bbb', textDecoration: 'none' }}>{text}</Link></li>;
}

const icons = {
  facebook: "M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  tiktok: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  whatsapp: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm2.231-4.178l1.375 2.017c1.601.951 3.448 1.452 5.341 1.452 5.813 0 10.542-4.729 10.545-10.543.001-2.816-1.096-5.462-3.08-7.446C14.478 3.324 11.84 2.23 9.025 2.23c-5.813 0-10.542 4.729-10.545 10.543-.001 1.932.522 3.815 1.516 5.43l.808 1.309-1.472 5.376 5.176-1.388z"
};