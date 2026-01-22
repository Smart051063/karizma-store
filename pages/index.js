// تنسيق الدوائر (Circles) - الكود الصحيح
const circleCardStyle = {
  width: '120px', 
  height: '120px', 
  borderRadius: '50%', 
  backgroundColor: '#f9f9f9',
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', // 👈 هنا كان الخطأ، أضفنا القيمة center وأغلقنا التنصيص
  justifyContent: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
  cursor: 'pointer', 
  transition: 'transform 0.3s'
};