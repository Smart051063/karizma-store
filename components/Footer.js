import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#0a0a0a', // أسود داكن جداً
      color: '#ffffff', 
      padding: '60px 20px 20px', 
      marginTop: '80px', 
      direction: 'rtl', 
      borderTop: '3px solid #d4af37' // خط ذهبي من الأعلى
    }}>
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        gap: '40px' 
      }}>

        {/* العمود الأول: عن البراند */}
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#d4af37', marginBottom: '20px', fontSize: '1.8rem' }}>✨ كاريزما للعطور</h2>
          <p style={{ lineHeight: '1.8', color: '#ccc' }}>
            نحن لا نبيع مجرد عطور، بل نصنع ذكريات لا تُنسى. تشكيلة فاخرة من العطور الفرنسية والشرقية المستوحاة من أرقى الماركات العالمية، صُنعت بحب لتناسب ذوقك الرفيع.
          </p>
        </div>

        {/* العمود الثاني: روابط تهمك */}
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ color: 'white', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>روابط سريعة</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}><Link href="/men" style={linkStyle}>› عطور رجالية</Link></li>
            <li style={{ marginBottom: '10px' }}><Link href="/women" style={linkStyle}>› عطور نسائية</Link></li>
            <li style={{ marginBottom: '10px' }}><Link href="/oriental" style={linkStyle}>› الروائح الشرقية</Link></li>
            <li style={{ marginBottom: '10px' }}><Link href="/search" style={linkStyle}>› البحث عن عطر</Link></li>
          </ul>
        </div>

        {/* العمود الثالث: تواصل معنا */}
        <div style={{ flex: '1 1 250px' }}>
          <h3 style={{ color: 'white', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>خدمة العملاء</h3>
          <p style={{ marginBottom: '10px', color: '#ccc' }}>📍  جمهورية مصر العربية</p>
          <p style={{ marginBottom: '10px', color: '#ccc' }}>📞 واتساب: 01002410037</p>
          <p style={{ marginBottom: '10px', color: '#ccc' }}>✉️ ايميل: info@karizmaperfumes.com</p>
          
          {/* أيقونات التواصل الاجتماعي (رموز تعبيرية كبديل مؤقت) */}
          <div style={{ marginTop: '20px', fontSize: '1.5rem', display: 'flex', gap: '15px' }}>
            <span style={{ cursor: 'pointer' }}>📸</span>
            <span style={{ cursor: 'pointer' }}>🐦</span>
            <span style={{ cursor: 'pointer' }}>📘</span>
          </div>
        </div>

      </div>

      {/* الحقوق في الأسفل */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px', 
        paddingTop: '20px', 
        borderTop: '1px solid #222', 
        color: '#666', 
        fontSize: '0.9rem' 
      }}>
        © {new Date().getFullYear()} جميع الحقوق محفوظة لـ متجر كاريزما للعطور.
      </div>

    </footer>
  );
}

// تنسيق الروابط عند التمرير
const linkStyle = {
  textDecoration: 'none',
  color: '#bbb',
  transition: '0.3s',
  cursor: 'pointer',
  display: 'block'
};