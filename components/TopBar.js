import React from 'react';

export default function TopBar() {
  return (
    <div style={{
      backgroundColor: '#fcf8e3', // لون خلفية كريمي/ذهبي فاتح للتنبيه
      color: '#8a6d3b', // لون النص بني ذهبي
      textAlign: 'center',
      padding: '10px',
      fontSize: '0.9rem',
      borderBottom: '1px solid #faebcc',
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif'
    }}>
      ⚠️ <strong>تنويه:</strong> جميع عطورنا مستوحاة من العطر الأصلي وتأتي في عبواتنا الخاصة "كاريزما".
    </div>
  );
}