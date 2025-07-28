import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Connecting Farmers Directly with Buyers": "Connecting Farmers Directly with Buyers",
      "Discover fresh produce straight from local farms": "Discover fresh produce straight from local farms",
      "Search": "Search",
      "Use My Location": "Use My Location",
      "Showing products near": "Showing products near",
      "Discover local produce in your area": "Discover local produce in your area",
      "Fresh Produce Available": "Fresh Produce Available",
      "Contact Seller": "Contact Seller",
      "Clear Filters": "Clear Filters",
      "No products found in": "No products found in",
      "Show All Products": "Show All Products",
      "Connecting farmers and buyers directly since 2023": "Connecting farmers and buyers directly since 2023",
      "Quick Links": "Quick Links",
      "About Us": "About Us",
      "Contact": "Contact",
      "FAQ": "FAQ",
      "Legal": "Legal",
      "Privacy Policy": "Privacy Policy",
      "Terms of Service": "Terms of Service",
      "Connect": "Connect",
      "Showing results for": "Showing results for"
    }
  },
  hi: {
    translation: {
      "Connecting Farmers Directly with Buyers": "किसानों को सीधे खरीदारों से जोड़ना",
      "Discover fresh produce straight from local farms": "स्थानीय खेतों से ताजा उत्पाद खोजें",
      "Search": "खोजें",
      "Use My Location": "मेरी लोकेशन का उपयोग करें",
      "Showing products near": "इनके पास उत्पाद दिखा रहे हैं",
      "Discover local produce in your area": "अपने क्षेत्र में स्थानीय उत्पाद खोजें",
      "Fresh Produce Available": "ताजा उत्पाद उपलब्ध",
      "Contact Seller": "विक्रेता से संपर्क करें",
      "Clear Filters": "फ़िल्टर हटाएं",
      "No products found in": "यहां कोई उत्पाद नहीं मिला",
      "Show All Products": "सभी उत्पाद दिखाएं",
      "Connecting farmers and buyers directly since 2023": "2023 से किसानों और खरीदारों को सीधे जोड़ना",
      "Quick Links": "त्वरित लिंक",
      "About Us": "हमारे बारे में",
      "Contact": "संपर्क करें",
      "FAQ": "सामान्य प्रश्न",
      "Legal": "कानूनी",
      "Privacy Policy": "गोपनीयता नीति",
      "Terms of Service": "सेवा की शर्तें",
      "Connect": "जुड़ें",
      "Showing results for": "परिणाम दिखा रहे हैं"
    }
  },
  mr: {
    translation: {
      "Connecting Farmers Directly with Buyers": "शेतकऱ्यांना थेट खरेदीदारांशी जोडणे",
      "Discover fresh produce straight from local farms": "स्थानिक शेतांमधून ताजे उत्पादन शोधा",
      "Search": "शोधा",
      "Use My Location": "माझे स्थान वापरा",
      "Showing products near": "या ठिकाणी उत्पादने दाखवत आहे",
      "Discover local produce in your area": "तुमच्या भागातील स्थानिक उत्पादने शोधा",
      "Fresh Produce Available": "ताजे उत्पादन उपलब्ध",
      "Contact Seller": "विक्रेत्याशी संपर्क साधा",
      "Clear Filters": "फिल्टर हटवा",
      "No products found in": "येथे कोणतीही उत्पादने सापडली नाहीत",
      "Show All Products": "सर्व उत्पादने दाखवा",
      "Connecting farmers and buyers directly since 2023": "2023 पासून शेतकरी आणि खरेदीदारांना थेट जोडत आहे",
      "Quick Links": "द्रुत दुवे",
      "About Us": "आमच्याबद्दल",
      "Contact": "संपर्क",
      "FAQ": "सामान्य प्रश्न",
      "Legal": "कायदेशीर",
      "Privacy Policy": "गोपनीयता धोरण",
      "Terms of Service": "सेवेच्या अटी",
      "Connect": "जोडा",
      "Showing results for": "परिणाम दाखवत आहे"
    }
  },
  pa: {
    translation: {
      "Connecting Farmers Directly with Buyers": "ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਸਿੱਧੇ ਤੌਰ 'ਤੇ ਕਿਸਾਨਾਂ ਨੂੰ ਜੋੜਨਾ",
      "Discover fresh produce straight from local farms": "ਸਥਾਨਕ ਖੇਤਾਂ ਤੋਂ ਤਾਜ਼ਾ ਉਤਪਾਦ ਲੱਭੋ",
      "Search": "ਖੋਜ",
      "Use My Location": "ਮੇਰਾ ਸਥਾਨ ਵਰਤੋ",
      "Showing products near": "ਇਸ ਸਥਾਨ 'ਤੇ ਉਤਪਾਦ ਦਿਖਾਓ",
      "Discover local produce in your area": "ਆਪਣੇ ਖੇਤਰ ਵਿੱਚ ਸਥਾਨਕ ਉਤਪਾਦ ਲੱਭੋ",
      "Fresh Produce Available": "ਤਾਜ਼ਾ ਉਤਪਾਦ ਉਪਲਬਧ",
      "Contact Seller": "ਵੇਚਣ ਵਾਲੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
      "Clear Filters": "ਫਿਲਟਰ ਹਟਾਓ",
      "No products found in": "ਇੱਥੇ ਕੋਈ ਉਤਪਾਦ ਨਹੀਂ ਮਿਲੇ",
      "Show All Products": "ਸਾਰੇ ਉਤਪਾਦ ਦਿਖਾਓ",
      "Connecting farmers and buyers directly since 2023": "2023 ਤੋਂ ਕਿਸਾਨਾਂ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਸਿੱਧੇ ਤੌਰ 'ਤੇ ਜੋੜਨਾ",
      "Quick Links": "ਤੇਜ਼ ਲਿੰਕ",
      "About Us": "ਸਾਡੇ ਬਾਰੇ",
      "Contact": "ਸੰਪਰਕ",
      "FAQ": "ਆਮ ਸਵਾਲ",
      "Legal": "ਕਾਨੂੰਨੀ",
      "Privacy Policy": "ਗੁਪਤਤਾ ਨੀਤੀ",
      "Terms of Service": "ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ",
      "Connect": "ਜੋੜੋ",
      "Showing results for": "ਨਤੀਜੇ ਦਿਖਾਓ"
    }
  },
  gu: {
    translation: {
      "Connecting Farmers Directly with Buyers": "ખરીદદારો સાથે સીધા ખેડૂતોને જોડવું",
      "Discover fresh produce straight from local farms": "સ્થાનિક ખેતરોમાંથી તાજા ઉત્પાદનો શોધો",
      "Search": "શોધો",
      "Use My Location": "મારું સ્થાન વાપરો",
      "Showing products near": "આ સ્થાન પર ઉત્પાદનો બતાવો",
      "Discover local produce in your area": "તમારા વિસ્તારમાં સ્થાનિક ઉત્પાદનો શોધો",
      "Fresh Produce Available": "તાજા ઉત્પાદનો ઉપલબ્ધ",
      "Contact Seller": "વેચનારનો સંપર્ક કરો",
      "Clear Filters": "ફિલ્ટર દૂર કરો",
      "No products found in": "અહીં કોઈ ઉત્પાદનો મળ્યા નથી",
      "Show All Products": "બધા ઉત્પાદનો બતાવો",
      "Connecting farmers and buyers directly since 2023": "2023 થી ખેડૂતો અને ખરીદદારોને સીધા જોડવું",
      "Quick Links": "ઝડપી લિંક્સ",
      "About Us": "અમારા વિશે",
      "Contact": "સંપર્ક",
      "FAQ": "સામાન્ય પ્રશ્નો",
      "Legal": "કાનૂની",
      "Privacy Policy": "ગોપનીયતા નીતિ",
      "Terms of Service": "સેવાની શરતો",
      "Connect": "જોડાઓ",
      "Showing results for": "પરિણામો બતાવો"
    }
  },
  bn: {
    translation: {
      "Connecting Farmers Directly with Buyers": "ক্রেতাদের সাথে সরাসরি কৃষকদের সংযোগ স্থাপন করা",
      "Discover fresh produce straight from local farms": "স্থানীয় খামার থেকে তাজা পণ্য আবিষ্কার করুন",
      "Search": "অনুসন্ধান",
      "Use My Location": "আমার স্থান ব্যবহার করুন",
      "Showing products near": "এই স্থানে পণ্য দেখান",
      "Discover local produce in your area": "আপনার এলাকায় স্থানীয় পণ্য আবিষ্কার করুন",
      "Fresh Produce Available": "তাজা পণ্য উপলব্ধ",
      "Contact Seller": "বিক্রেতার সাথে যোগাযোগ করুন",
      "Clear Filters": "ফিল্টার সরান",
      "No products found in": "এখানে কোনো পণ্য পাওয়া যায়নি",
      "Show All Products": "সমস্ত পণ্য দেখান",
      "Connecting farmers and buyers directly since 2023": "2023 সাল থেকে ক্রেতাদের সাথে সরাসরি কৃষকদের সংযোগ স্থাপন করা",
      "Quick Links": "দ্রুত লিঙ্ক",
      "About Us": "আমাদের সম্পর্কে",
      "Contact": "যোগাযোগ",
      "FAQ": "সাধারণ প্রশ্ন",
      "Legal": "আইনগত",
      "Privacy Policy": "গোপনীয়তা নীতি",
      "Terms of Service": "পরিষেবার শর্তাবলী",
      "Connect": "যোগাযোগ করুন",
      "Showing results for": "ফলাফল দেখান"
    }
  },
  ta: {
    translation: {
      "Connecting Farmers Directly with Buyers": "விவசாயிகளை வாங்குபவர்களுடன் நேரடியாக இணைக்கிறது",
      "Discover fresh produce straight from local farms": "உள்ளூர் பண்ணைகளிலிருந்து புதிய பொருட்களைக் கண்டறியவும்",
      "Search": "தேடல்",
      "Use My Location": "எனது இருப்பிடத்தைப் பயன்படுத்துக",
      "Showing products near": "இந்த இடத்தில் தயாரிப்புகளைக் காட்டு",
      "Discover local produce in your area": "உங்கள் பகுதியில் உள்ளூர் பொருட்களைக் கண்டறியவும்",
      "Fresh Produce Available": "புதிய பொருட்கள் கிடைக்கும்",
      "Contact Seller": "விற்பனையாளரைத் தொடர்பு கொள்ளவும்",
      "Clear Filters": "வடிகட்டிகளை அகற்று",
      "No products found in": "இங்கு எந்த பொருட்களும் கிடைக்கவில்லை",
      "Show All Products": "எல்லா பொருட்களையும் காட்டு",
      "Connecting farmers and buyers directly since 2023": "2023 முதல் விவசாயிகளையும் வாங்குபவர்களையும் நேரடியாக இணைக்கிறது",
      "Quick Links": "விரைவு இணைப்புகள்",
      "About Us": "எங்களைப் பற்றி",
      "Contact": "தொடர்பு",
      "FAQ": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      "Legal": "சட்ட",
      "Privacy Policy": "தனியுரிமைக் கொள்கை",
      "Terms of Service": "சேவை விதிமுறைகள்",
      "Connect": "இணைக்கவும்",
      "Showing results for": "முடிவுகளைக் காட்டு"
    }
  },
  kn: {
    translation: {
      "Connecting Farmers Directly with Buyers": "ಖರೀದಿದಾರರೊಂದಿಗೆ ನೇರವಾಗಿ ರೈತರನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ",
      "Discover fresh produce straight from local farms": "ಸ್ಥಳೀಯ ತೋಟಗಳಿಂದ ತಾಜಾ ಉತ್ಪನ್ನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
      "Search": "ಹುಡುಕಿ",
      "Use My Location": "ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
      "Showing products near": "ಈ ಸ್ಥಳದಲ್ಲಿ ಉತ್ಪನ್ನಗಳನ್ನು ತೋರಿಸಿ",
      "Discover local produce in your area": "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಸ್ಥಳೀಯ ಉತ್ಪನ್ನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
      "Fresh Produce Available": "ತಾಜಾ ಉತ್ಪನ್ನಗಳು ಲಭ್ಯವಿದೆ",
      "Contact Seller": "ಮಾರಾಟಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ",
      "Clear Filters": "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆಗೆದುಹಾಕಿ",
      "No products found in": "ಇಲ್ಲಿ ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
      "Show All Products": "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳನ್ನು ತೋರಿಸಿ",
      "Connecting farmers and buyers directly since 2023": "2023 ರಿಂದ ರೈತರು ಮತ್ತು ಖರೀದಿದಾರರನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸುತ್ತದೆ",
      "Quick Links": "ತ್ವರಿತ ಸಂಪರ್ಕಗಳು",
      "About Us": "ನಮ್ಮ ಬಗ್ಗೆ",
      "Contact": "ಸಂಪರ್ಕಿಸಿ",
      "FAQ": "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
      "Legal": "ಕಾನೂನುಬದ್ಧ",
      "Privacy Policy": "ಗೌಪ್ಯತೆ ನೀತಿ",
      "Terms of Service": "ಸೇವಾ ನಿಯಮಗಳು",
      "Connect": "ಸಂಪರ್ಕಿಸಿ",
      "Showing results for": "ಫಲಿತಾಂಶಗಳನ್ನು ತೋರಿಸಿ"
    }
  }
  // Add more languages as needed (pa, gu, bn, ta, kn, etc.)
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;