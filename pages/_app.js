import '../styles/globals.css'; // تأكد أن هذا السطر موجود إذا كان لديك ملف CSS
import TopBar from '../components/TopBar'; // تأكد من مسار التوب بار
import { CartProvider } from '../src/context/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    // غلفنا التطبيق كله بمزود السلة
    <CartProvider>
      {/* التوب بار سيظهر الآن تلقائياً في كل الصفحات، لا داعي لتكراره */}
      <TopBar />
      <Component {...pageProps} />
      {/* يمكنك إضافة Footer هنا لاحقاً ليظهر في كل الصفحات */}
    </CartProvider>
  );
}

export default MyApp;