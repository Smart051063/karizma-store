// في الأعلى استورد useLanguage
import { useLanguage } from '../../src/context/LanguageContext';

// داخل الدالة:
const { language, t } = useLanguage();

// عند العرض (في جزء return):
<h1>{language === 'en' ? (product.nameEn || product.name) : product.name}</h1>
<p>{language === 'en' ? (product.descriptionEn || product.description) : product.description}</p>