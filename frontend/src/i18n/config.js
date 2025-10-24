// src/i18n/config.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "loading": "Loading...",
      "login": "Login",
      "register": "Register",
      "logout": "Logout",
      "email": "Email",
      "password": "Password",
      "name": "Name",
      "phone": "Phone Number",
      "dont_have_account": "Don't have an account?",
      "register_here": "Register here",
      "tourist": "Tourist",
      "authority": "Authority",
      "dashboard": "Dashboard",
      "tourist_dashboard": "Tourist Safety Dashboard",
      "authority_dashboard": "Authority Control Center",
      "overview": "Overview",
      "profile": "Profile",
      "your_profile": "Your Profile",
      "sos": "SOS",
      "emergency_alert": "Emergency Alert",
      "press_sos": "Press and hold the button below in case of emergency",
      "alerts": "Alerts",
      "my_alerts": "My Alerts",
      "emergency_contacts": "Emergency Contacts",
      "safety_tips": "Safety Tips",
      "quick_actions": "Quick Actions",
      "report_incident": "Report Incident",
      "find_nearby_help": "Find Nearby Help",
      "share_location": "Share Location",
      "live_map": "Live Map",
      "analytics": "Analytics",
      
      // Authority Dashboard Stats
      "total_alerts": "Total Alerts",
      "active_alerts": "Active Alerts",
      "resolved": "Resolved",
      "active_tourists": "Active Tourists",
      
      // Authority Dashboard Sections
      "active_alerts_section": "Active Alerts",
      "live_tracking_map": "Live Tracking Map",
      "analytics_insights": "Analytics & Insights",
      "no_active_alerts": "No active alerts matching your filters!",
      
      // Analytics Cards
      "total_alerts_card": "Total Alerts",
      "active_now": "Active Now",
      "resolved_card": "Resolved",
      "avg_response_time": "Avg Response Time",
      
      // Charts
      "alerts_over_time": "Alerts Over Time",
      "alerts_by_severity": "Alerts by Severity",
      "alerts_by_type": "Alerts by Type",
      
      // Severity Levels
      "critical": "Critical",
      "high": "High",
      "medium": "Medium",
      "low": "Low",
      
      // Emergency Contacts
      "your_emergency_contact": "Your Emergency Contact",
      "relation": "Relation",
      "call_now": "Call Now",
      "police": "Police",
      "ambulance": "Ambulance",
      "fire_brigade": "Fire Brigade",
      "women_helpline": "Women Helpline",
      "tourist_police": "Tourist Police",
      "disaster_mgmt": "Disaster Mgmt",
      
      // Additional Resources
      "useful_resources": "Useful Resources",
      "tourist_safety_guidelines": "Tourist Safety Guidelines",
      "nearest_police_station": "Nearest Police Station",
      "nearest_hospital": "Nearest Hospital",
      "safety_tips_women": "Safety Tips for Women",
      
      // Quick Safety Tips
      "quick_safety_tips": "Quick Safety Tips",
      "keep_phone_charged": "Keep your phone charged above 20%",
      "share_live_location": "Share live location with trusted contacts",
      "keep_photocopies": "Keep photocopies of important documents",
      "use_registered_taxis": "Use registered taxis/cabs only",
      "avoid_isolated_areas": "Avoid isolated areas after dark",
      "keep_emergency_cash": "Keep emergency cash separately",
      
      // Profile & Dashboard
      "safety_score": "Safety Score",
      "emergency_contact": "Emergency Contact",
      "active": "Active",
      "last_alert": "Last Alert",
      "view_all_alerts": "View All Alerts",
      "none": "None",
      
      // Weather & Advisories
      "weather_advisories": "Weather & Advisories",
      "clear_sky": "Clear sky, perfect for sightseeing",
      "humidity": "Humidity",
      "wind": "Wind",
      "safe_to_travel": "Safe to Travel",
      
      // Alerts History
      "your_alert_history": "Your Alert History",
      "no_alerts": "No alerts yet. Stay safe!",
      "severity": "Severity",
      "status": "Status",
      
      // Safety Tips List
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
      
      // Analytics Additional
      "medical": "Medical",
      "theft": "Theft",
      "lost": "Lost",
      "other": "Other",
      "response_time_distribution": "Response Time Distribution",
      "peak_alert_hour": "Peak Alert Hour",
      "most_common_location": "Most Common Location",
      "resolution_rate": "Resolution Rate",
      "active_officers": "Active Officers"
    }
  },
  hi: {
    translation: {
      "welcome": "स्वागत है",
      "loading": "लोड हो रहा है...",
      "login": "लॉगिन",
      "register": "पंजीकरण",
      "logout": "लॉगआउट",
      "email": "ईमेल",
      "password": "पासवर्ड",
      "name": "नाम",
      "phone": "फ़ोन नंबर",
      "dont_have_account": "खाता नहीं है?",
      "register_here": "यहां पंजीकरण करें",
      "tourist": "पर्यटक",
      "authority": "प्राधिकारी",
      "dashboard": "डैशबोर्ड",
      "tourist_dashboard": "पर्यटक सुरक्षा डैशबोर्ड",
      "authority_dashboard": "प्राधिकरण नियंत्रण केंद्र",
      "overview": "अवलोकन",
      "profile": "प्रोफ़ाइल",
      "your_profile": "आपकी प्रोफ़ाइल",
      "sos": "SOS",
      "emergency_alert": "आपातकालीन अलर्ट",
      "press_sos": "आपातकाल की स्थिति में नीचे दिया गया बटन दबाएं",
      "alerts": "अलर्ट",
      "my_alerts": "मेरे अलर्ट",
      "emergency_contacts": "आपातकालीन संपर्क",
      "safety_tips": "सुरक्षा सुझाव",
      "quick_actions": "त्वरित कार्रवाई",
      "report_incident": "घटना रिपोर्ट करें",
      "find_nearby_help": "पास में मदद खोजें",
      "share_location": "स्थान साझा करें",
      "live_map": "लाइव मैप",
      "analytics": "विश्लेषण",
      
      // Authority Dashboard Stats
      "total_alerts": "कुल अलर्ट",
      "active_alerts": "सक्रिय अलर्ट",
      "resolved": "हल हो गया",
      "active_tourists": "सक्रिय पर्यटक",
      
      // Authority Dashboard Sections
      "active_alerts_section": "सक्रिय अलर्ट",
      "live_tracking_map": "लाइव ट्रैकिंग मैप",
      "analytics_insights": "विश्लेषण और अंतर्दृष्टि",
      "no_active_alerts": "आपके फ़िल्टर से मेल खाता कोई सक्रिय अलर्ट नहीं!",
      
      // Analytics Cards
      "total_alerts_card": "कुल अलर्ट",
      "active_now": "अभी सक्रिय",
      "resolved_card": "हल हो गया",
      "avg_response_time": "औसत प्रतिक्रिया समय",
      
      // Charts
      "alerts_over_time": "समय के साथ अलर्ट",
      "alerts_by_severity": "गंभीरता के अनुसार अलर्ट",
      "alerts_by_type": "प्रकार के अनुसार अलर्ट",
      
      // Severity Levels
      "critical": "गंभीर",
      "high": "उच्च",
      "medium": "मध्यम",
      "low": "कम",
      
      // Emergency Contacts
      "your_emergency_contact": "आपका आपातकालीन संपर्क",
      "relation": "रिश्ता",
      "call_now": "अभी कॉल करें",
      "police": "पुलिस",
      "ambulance": "एम्बुलेंस",
      "fire_brigade": "अग्नि शमन दल",
      "women_helpline": "महिला हेल्पलाइन",
      "tourist_police": "पर्यटक पुलिस",
      "disaster_mgmt": "आपदा प्रबंधन",
      
      // Additional Resources
      "useful_resources": "उपयोगी संसाधन",
      "tourist_safety_guidelines": "पर्यटक सुरक्षा दिशानिर्देश",
      "nearest_police_station": "निकटतम पुलिस स्टेशन",
      "nearest_hospital": "निकटतम अस्पताल",
      "safety_tips_women": "महिलाओं के लिए सुरक्षा सुझाव",
      
      // Quick Safety Tips
      "quick_safety_tips": "त्वरित सुरक्षा सुझाव",
      "keep_phone_charged": "अपने फ़ोन को 20% से अधिक चार्ज रखें",
      "share_live_location": "विश्वसनीय संपर्कों के साथ लाइव स्थान साझा करें",
      "keep_photocopies": "महत्वपूर्ण दस्तावेजों की फोटोकॉपी रखें",
      "use_registered_taxis": "केवल पंजीकृत टैक्सी/कैब का उपयोग करें",
      "avoid_isolated_areas": "अंधेरे के बाद अलग-थलग क्षेत्रों से बचें",
      "keep_emergency_cash": "आपातकालीन नकदी अलग रखें",
      
      // Profile & Dashboard
      "safety_score": "सुरक्षा स्कोर",
      "emergency_contact": "आपातकालीन संपर्क",
      "active": "सक्रिय",
      "last_alert": "अंतिम अलर्ट",
      "view_all_alerts": "सभी अलर्ट देखें",
      "none": "कोई नहीं",
      
      // Weather & Advisories
      "weather_advisories": "मौसम और सलाह",
      "clear_sky": "साफ आसमान, दर्शनीय स्थलों के लिए एकदम सही",
      "humidity": "आर्द्रता",
      "wind": "हवा",
      "safe_to_travel": "यात्रा के लिए सुरक्षित",
      
      // Alerts History
      "your_alert_history": "आपका अलर्ट इतिहास",
      "no_alerts": "अभी तक कोई अलर्ट नहीं। सुरक्षित रहें!",
      "severity": "गंभीरता",
      "status": "स्थिति",
      
      // Safety Tips List
      "keep_phone_charged_always": "अपने फोन को हमेशा चार्ज रखें",
      "share_location_trusted": "विश्वसनीय संपर्कों के साथ अपना स्थान साझा करें",
      "avoid_isolated_night": "अलग-थलग क्षेत्रों से बचें, विशेष रूप से रात में",
      "stay_in_groups": "जब भी संभव हो समूह में रहें",
      "keep_map_gps": "मानचित्र या GPS संभाल कर रखें",
      "secure_documents": "महत्वपूर्ण दस्तावेजों को सुरक्षित रखें",
      "use_registered_services": "पंजीकृत टैक्सी/राइड-शेयरिंग सेवाओं का उपयोग करें",
      "inform_bank": "यात्रा योजनाओं के बारे में बैंक को सूचित करें",
      
      // Summary
      "your_safety_summary": "आपकी सुरक्षा सारांश"
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido",
      "loading": "Cargando...",
      "login": "Iniciar sesión",
      "register": "Registrarse",
      "logout": "Cerrar sesión",
      "email": "Correo electrónico",
      "password": "Contraseña",
      "name": "Nombre",
      "phone": "Número de teléfono",
      "dont_have_account": "¿No tienes cuenta?",
      "register_here": "Regístrate aquí",
      "tourist": "Turista",
      "authority": "Autoridad",
      "dashboard": "Panel",
      "tourist_dashboard": "Panel de Seguridad Turística",
      "authority_dashboard": "Centro de Control",
      "overview": "Resumen",
      "profile": "Perfil",
      "your_profile": "Tu Perfil",
      "sos": "SOS",
      "emergency_alert": "Alerta de Emergencia",
      "press_sos": "Mantén presionado en caso de emergencia",
      "alerts": "Alertas",
      "my_alerts": "Mis Alertas",
      "emergency_contacts": "Contactos de Emergencia",
      "safety_tips": "Consejos de Seguridad",
      "quick_actions": "Acciones Rápidas",
      "report_incident": "Reportar Incidente",
      "find_nearby_help": "Buscar Ayuda Cercana",
      "share_location": "Compartir Ubicación",
      "live_map": "Mapa en Vivo",
      "analytics": "Análisis",
      
      // Authority Dashboard Stats
      "total_alerts": "Alertas Totales",
      "active_alerts": "Alertas Activas",
      "resolved": "Resueltas",
      "active_tourists": "Turistas Activos",
      
      // Authority Dashboard Sections
      "active_alerts_section": "Alertas Activas",
      "live_tracking_map": "Mapa de Seguimiento en Vivo",
      "analytics_insights": "Análisis y Perspectivas",
      "no_active_alerts": "¡No hay alertas activas que coincidan con tus filtros!",
      
      // Analytics Cards
      "total_alerts_card": "Alertas Totales",
      "active_now": "Activas Ahora",
      "resolved_card": "Resueltas",
      "avg_response_time": "Tiempo Promedio de Respuesta",
      
      // Charts
      "alerts_over_time": "Alertas a lo Largo del Tiempo",
      "alerts_by_severity": "Alertas por Severidad",
      "alerts_by_type": "Alertas por Tipo",
      
      // Severity Levels
      "critical": "Crítico",
      "high": "Alto",
      "medium": "Medio",
      "low": "Bajo",
      
      // Emergency Contacts
      "your_emergency_contact": "Tu Contacto de Emergencia",
      "relation": "Relación",
      "call_now": "Llamar Ahora",
      "police": "Policía",
      "ambulance": "Ambulancia",
      "fire_brigade": "Bomberos",
      "women_helpline": "Línea de Ayuda para Mujeres",
      "tourist_police": "Policía Turística",
      "disaster_mgmt": "Gestión de Desastres",
      
      // Additional Resources
      "useful_resources": "Recursos Útiles",
      "tourist_safety_guidelines": "Guías de Seguridad Turística",
      "nearest_police_station": "Estación de Policía Más Cercana",
      "nearest_hospital": "Hospital Más Cercano",
      "safety_tips_women": "Consejos de Seguridad para Mujeres",
      
      // Quick Safety Tips
      "quick_safety_tips": "Consejos Rápidos de Seguridad",
      "keep_phone_charged": "Mantén tu teléfono cargado por encima del 20%",
      "share_live_location": "Comparte ubicación en vivo con contactos de confianza",
      "keep_photocopies": "Guarda fotocopias de documentos importantes",
      "use_registered_taxis": "Usa solo taxis/cabs registrados",
      "avoid_isolated_areas": "Evita áreas aisladas después del anochecer",
      "keep_emergency_cash": "Guarda efectivo de emergencia por separado",
      
      // Profile & Dashboard
      "safety_score": "Puntuación de Seguridad",
      "emergency_contact": "Contacto de Emergencia",
      "active": "Activo",
      "last_alert": "Última Alerta",
      "view_all_alerts": "Ver Todas las Alertas",
      "none": "Ninguno",
      
      // Weather & Advisories
      "weather_advisories": "Clima y Avisos",
      "clear_sky": "Cielo despejado, perfecto para turismo",
      "humidity": "Humedad",
      "wind": "Viento",
      "safe_to_travel": "Seguro para Viajar",
      
      // Alerts History
      "your_alert_history": "Tu Historial de Alertas",
      "no_alerts": "Aún no hay alertas. ¡Mantente seguro!",
      "severity": "Severidad",
      "status": "Estado",
      
      // Safety Tips List
      "keep_phone_charged_always": "Mantén tu teléfono cargado en todo momento",
      "share_location_trusted": "Comparte tu ubicación con contactos de confianza",
      "avoid_isolated_night": "Evita áreas aisladas, especialmente de noche",
      "stay_in_groups": "Permanece en grupos cuando sea posible",
      "keep_map_gps": "Mantén un mapa o GPS a mano",
      "secure_documents": "Mantén documentos importantes seguros",
      "use_registered_services": "Usa servicios de taxi/viajes compartidos registrados",
      "inform_bank": "Informa al banco sobre planes de viaje",
      
      // Summary
      "your_safety_summary": "Tu Resumen de Seguridad"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;