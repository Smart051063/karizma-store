import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a', // نفس لون النافبار
      color: '#fff',
      padding: '20px',
      textAlign: 'center',
      marginTop: '50px', // مسافة لفصله عن المحتوى
      borderTop: '3px solid #d4af37', // خط ذهبي رفيع في الأعلى
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif'
    }}>
      <p style={{ margin: '5px 0', fontSize: '1.1rem' }}>✨ كاريزما للعطور</p>
      <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#ccc' }}>
        جميع الحقوق محفوظة © {new Date().getFullYear()}
      </p>
      <div style={{ marginTop: '10px', fontSize: '1.5rem', cursor: 'pointer' }}>
        {/* يمكنك إضافة روابط السوشيال ميديا هنا لاحقاً */}
        📷 📘 💬
      </div>
    </footer>
  );
}