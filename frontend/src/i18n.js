// src/i18n.js - COMPLETE WORKING VERSION
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Auth
      "login": "Login",
      "email": "Email", 
      "password": "Password",
      "enter_email": "Enter your email",
      "enter_password": "Enter your password",
      "logging_in": "Logging in...",
      "login_failed": "Login failed. Please check your credentials.",
      "invalid_response": "Invalid response from server",
      "dont_have_account": "Don't have an account?",
      "register_here": "Register here",
      "demo_credentials": "Demo Credentials",
      "tourist": "Tourist",
      "authority": "Authority",
      
      // Dashboard
      "loading": "Loading...",
      "tourist_dashboard": "Tourist Safety Dashboard",
      "welcome": "Welcome",
      "logout": "Logout",
      
      // Tabs
      "overview": "Overview",
      "emergency_contacts": "Emergency Contacts",
      "my_alerts": "My Alerts",
      
      // Profile
      "your_profile": "Your Profile",
      "name": "Name",
      "phone": "Phone",
      "safety_score": "Safety Score",
      "emergency_contact": "Emergency Contact",
      "relation": "Relation",
      
      // Emergency
      "emergency_alert": "Emergency Alert",
      "press_sos": "Press and hold the button below in case of emergency",
      
      // Quick Actions
      "quick_actions": "Quick Actions",
      "report_incident": "Report Incident",
      "find_nearby_help": "Find Nearby Help",
      "share_location": "Share Location",
      
      // Safety Tips
      "safety_tips": "Safety Tips",
      "keep_phone_charged_always": "Keep your phone charged at all times",
      "share_location_trusted": "Share your location with trusted contacts",
      "avoid_isolated_night": "Avoid isolated areas, especially at night",
      "stay_in_groups": "Stay in groups when possible",
      "keep_map_gps": "Keep a map or GPS handy",
      "secure_documents": "Keep important documents secure",
      "use_registered_services": "Use registered taxis/ride-sharing services",
      "inform_bank": "Inform bank about travel plans",
      
      // Summary
      "your_safety_summary": "Your Safety Summary",
      "total_alerts": "Total Alerts",
      "active": "Active",
      "resolved": "Resolved",
      "last_alert": "Last Alert",
      "none": "None",
      "view_all_alerts": "View All Alerts",
      
      // Weather
      "weather_advisories": "Weather & Advisories",
      "clear_sky": "Clear sky, perfect for sightseeing",
      "humidity": "Humidity",
      "wind": "Wind",
      "safe_to_travel": "Safe to Travel",
      
      // Alert History
      "your_alert_history": "Your Alert History",
      "no_alerts": "No alerts yet. Stay safe!"
    }
  },
  hi: {
    translation: {
      "login": "लॉगिन",
      "email": "ईमेल",
      "password": "पासवर्ड",
      "enter_email": "अपना ईमेल दर्ज करें",
      "enter_password": "अपना पासवर्ड दर्ज करें",
      "logging_in": "लॉगिन हो रहा है...",
      "dont_have_account": "खाता नहीं है?",
      "register_here": "यहाँ पंजीकरण करें",
      "demo_credentials": "डेमो क्रेडेंशियल",
      "tourist": "पर्यटक",
      "authority": "प्राधिकरण",
      "loading": "लोड हो रहा है...",
      "tourist_dashboard": "पर्यटक सुरक्षा डैशबोर्ड",
      "welcome": "स्वागत है",
      "logout": "लॉगआउट",
      "overview": "अवलोकन",
      "emergency_contacts": "आपातकालीन संपर्क",
      "my_alerts": "मेरी अलर्ट",
      "your_profile": "आपकी प्रोफ़ाइल",
      "name": "नाम",
      "phone": "फ़ोन",
      "safety_score": "सुरक्षा स्कोर",
      "emergency_contact": "आपातकालीन संपर्क",
      "relation": "संबंध",
      "emergency_alert": "आपातकालीन अलर्ट",
      "press_sos": "आपातकालीन स्थिति में नीचे दिए गए बटन को दबाएं और होल्ड करें",
      "quick_actions": "त्वरित कार्रवाई",
      "report_incident": "घटना की रिपोर्ट करें",
      "find_nearby_help": "आस-पास सहायता खोजें",
      "share_location": "स्थान साझा करें",
      "safety_tips": "सुरक्षा युक्तियाँ",
      "your_safety_summary": "आपकी सुरक्षा सारांश",
      "total_alerts": "कुल अलर्ट",
      "active": "सक्रिय",
      "resolved": "हल हो गया",
      "weather_advisories": "मौसम और सलाह",
      "your_alert_history": "आपका अलर्ट इतिहास",
      "no_alerts": "अभी तक कोई अलर्ट नहीं। सुरक्षित रहें!"
    }
  },
  es: {
    translation: {
      "login": "Iniciar sesión",
      "email": "Correo electrónico",
      "password": "Contraseña",
      "enter_email": "Introduce tu correo",
      "enter_password": "Introduce tu contraseña",
      "logging_in": "Iniciando sesión...",
      "loading": "Cargando...",
      "tourist_dashboard": "Panel de Seguridad Turística",
      "welcome": "Bienvenido",
      "logout": "Cerrar sesión",
      "overview": "Resumen",
      "emergency_contacts": "Contactos de Emergencia",
      "my_alerts": "Mis Alertas"
    }
  },
  fr: {
    translation: {
      "login": "Connexion",
      "email": "Email",
      "password": "Mot de passe",
      "enter_email": "Entrez votre email",
      "enter_password": "Entrez votre mot de passe",
      "logging_in": "Connexion...",
      "loading": "Chargement...",
      "tourist_dashboard": "Tableau de Bord de Sécurité Touristique",
      "welcome": "Bienvenue",
      "logout": "Se déconnecter",
      "overview": "Aperçu",
      "emergency_contacts": "Contacts d'Urgence",
      "my_alerts": "Mes Alertes"
    }
  },
  de: {
    translation: {
      "login": "Anmelden",
      "email": "E-Mail",
      "password": "Passwort",
      "enter_email": "E-Mail eingeben",
      "enter_password": "Passwort eingeben",
      "logging_in": "Anmeldung...",
      "loading": "Wird geladen...",
      "tourist_dashboard": "Touristen-Sicherheits-Dashboard",
      "welcome": "Willkommen",
      "logout": "Abmelden",
      "overview": "Übersicht",
      "emergency_contacts": "Notfallkontakte",
      "my_alerts": "Meine Warnungen",
      "your_profile": "Ihr Profil",
      "name": "Name",
      "phone": "Telefon",
      "safety_score": "Sicherheitsbewertung",
      "emergency_alert": "Notfallalarm",
      "quick_actions": "Schnellaktionen",
      "safety_tips": "Sicherheitstipps",
      "your_safety_summary": "Ihre Sicherheitszusammenfassung",
      "total_alerts": "Gesamtwarnungen",
      "active": "Aktiv",
      "resolved": "Gelöst"
    }
  },
  ja: {
    translation: {
      "login": "ログイン",
      "email": "メール",
      "password": "パスワード",
      "loading": "読み込み中...",
      "tourist_dashboard": "観光安全ダッシュボード",
      "welcome": "ようこそ",
      "logout": "ログアウト",
      "overview": "概要",
      "emergency_contacts": "緊急連絡先",
      "my_alerts": "私の警告"
    }
  },
  zh: {
    translation: {
      "login": "登录",
      "email": "电子邮件",
      "password": "密码",
      "loading": "加载中...",
      "tourist_dashboard": "旅游安全仪表板",
      "welcome": "欢迎",
      "logout": "登出",
      "overview": "概述",
      "emergency_contacts": "紧急联系人",
      "my_alerts": "我的警报"
    }
  },
  ar: {
    translation: {
      "login": "تسجيل الدخول",
      "email": "البريد الإلكتروني",
      "password": "كلمة المرور",
      "loading": "جار التحميل...",
      "tourist_dashboard": "لوحة تحكم السلامة السياحية",
      "welcome": "مرحبا",
      "logout": "تسجيل الخروج",
      "overview": "نظرة عامة",
      "emergency_contacts": "جهات الاتصال في حالات الطوارئ",
      "my_alerts": "تنبيهاتي"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;