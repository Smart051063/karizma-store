import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const mapLink = "https://www.google.com/maps/search/?api=1&query=25+شارع+ابن+الرومى+مدينة+نصر+الحى+السابع";

  return (
    <footer style={{ backgroundColor: '#111', color: '#fff', padding: '60px 20px 20px', direction: 'rtl', fontFamily: 'Arial, sans-serif', borderTop: '4px solid #d4af37' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>

        {/* 1️⃣ العمود الأول */}
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#d4af37', margin: '0 0 20px', fontSize: '2rem', fontFamily: 'serif' }}>Karizma ✨</h2>
          <p style={{ color: '#bbb', lineHeight: '1.8', marginBottom: '25px', fontSize: '0.95rem' }}>
            نحن لا نبيع مجرد عطور، بل نصنع ذكريات لا تُنسى. تشكيلة فاخرة من العطور الفرنسية والشرقية المستوحاة من أرقى الماركات العالمية.
          </p>
          
          {/* أيقونات السوشيال ميديا */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <SocialIcon href="https://www.facebook.com" path={icons.facebook} />
            <SocialIcon href="https://www.instagram.com" path={icons.instagram} />
            <SocialIcon href="https://www.tiktok.com" path={icons.tiktok} />
            <SocialIcon href="https://wa.me/201002410037" path={icons.whatsapp} />
          </div>
        </div>

        {/* 2️⃣ العمود الثاني */}
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '1.3rem' }}>روابط تهمك</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <FooterLink href="/offers" text="العروض والخصومات" icon={icons.fire} />
            <FooterLink href="/mixes" text="ميكسات كاريزما" icon={icons.flask} />
            <FooterLink href="/men" text="عطور رجالية" icon={icons.male} />
            <FooterLink href="/women" text="عطور نسائية" icon={icons.female} />
            <FooterLink href="/shop" text="كل المنتجات" icon={icons.bag} />
          </ul>
        </div>

        {/* 3️⃣ العمود الثالث (أيقونات التواصل الذهبية) */}
        <div style={{ flex: '1 1 250px' }}>
          <h3 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '1.3rem' }}>خدمة العملاء</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#bbb', fontSize: '0.95rem' }}>
            
            {/* العنوان */}
            <li style={{ marginBottom: '25px', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={iconContainerStyle}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#000"><path d={icons.location} /></svg>
              </div>
              <div>
                <span style={{ display: 'block', marginBottom: '8px', lineHeight: '1.4', color: '#fff' }}>
                  25 شارع ابن الرومى، الحي السابع
                  <br/> مدينة نصر (بجوار الحديقة الدولية)
                </span>
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="map-btn">
                  عرض الموقع على الخريطة 🗺️
                </a>
              </div>
            </li>

            {/* الهاتف */}
            <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={iconContainerStyle}>
                 <svg viewBox="0 0 24 24" width="20" height="20" fill="#000"><path d={icons.phone} /></svg>
              </div>
              <a href="tel:01002410037" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>01002410037</a>
            </li>
            
            {/* الإيميل */}
            <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={iconContainerStyle}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#000"><path d={icons.email} /></svg>
              </div>
              <a href="mailto:info@karizmaperfumes.com" style={{ color: '#fff', textDecoration: 'none' }}>info@karizmaperfumes.com</a>
            </li>

          </ul>
        </div>

      </div>

      <div style={{ borderTop: '1px solid #333', marginTop: '50px', paddingTop: '20px', textAlign: 'center', color: '#777', fontSize: '0.9rem' }}>
        <p>© 2026 جميع الحقوق محفوظة لـ <span style={{ color: '#d4af37' }}>كاريزما للعطور</span>.</p>
      </div>

      {/* تنسيقات CSS */}
      <style jsx>{`
        .map-btn {
          display: inline-block; padding: 6px 12px;
          border: 1px solid #d4af37; color: #d4af37;
          border-radius: 5px; text-decoration: none; font-size: 0.8rem;
          transition: 0.3s;
        }
        .map-btn:hover { background-color: #d4af37; color: #000; }
      `}</style>
    </footer>
  );
}

// --- المكونات المساعدة ---

// نمط خلفية الأيقونة الذهبية
const iconContainerStyle = {
  width: '35px', height: '35px', backgroundColor: '#d4af37', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  boxShadow: '0 0 10px rgba(212, 175, 55, 0.4)' // توهج ذهبي خفيف
};

function FooterLink({ href, text, icon }) {
  return (
    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#d4af37"><path d={icon} /></svg>
      <Link href={href} style={{ color: '#bbb', textDecoration: 'none', transition: 'color 0.3s' }} 
            onMouseOver={(e) => e.target.style.color = '#d4af37'}
            onMouseOut={(e) => e.target.style.color = '#bbb'}>
        {text}
      </Link>
    </li>
  );
}

function SocialIcon({ href, path }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" 
       style={{ 
         width: '40px', height: '40px', backgroundColor: '#222', borderRadius: '50%', 
         display: 'flex', alignItems: 'center', justifyContent: 'center', 
         transition: '0.3s', border: '1px solid #333'
       }}
       onMouseOver={(e) => {
         e.currentTarget.style.backgroundColor = '#d4af37';
         e.currentTarget.querySelector('svg').style.fill = '#000';
       }}
       onMouseOut={(e) => {
         e.currentTarget.style.backgroundColor = '#222';
         e.currentTarget.querySelector('svg').style.fill = '#fff';
       }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" style={{ transition: 'fill 0.3s' }}>
        <path d={path} />
      </svg>
    </a>
  );
}

// 📂 مكتبة الأيقونات (SVG Paths)
const icons = {
  facebook: "M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  tiktok: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  whatsapp: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm2.231-4.178l1.375 2.017c1.601.951 3.448 1.452 5.341 1.452 5.813 0 10.542-4.729 10.545-10.543.001-2.816-1.096-5.462-3.08-7.446C14.478 3.324 11.84 2.23 9.025 2.23c-5.813 0-10.542 4.729-10.545 10.543-.001 1.932.522 3.815 1.516 5.43l.808 1.309-1.472 5.376 5.176-1.388z",
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  fire: "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z",
  flask: "M15 4v2h3v2h-2v8.6c0 1.88-1.52 3.4-3.4 3.4H7.4c-1.88 0-3.4-1.52-3.4-3.4V8H2V6h3V4c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2z",
  male: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  female: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  bag: "M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 15H5V8h14v10z"
};