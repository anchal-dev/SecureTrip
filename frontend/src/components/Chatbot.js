// src/components/Chatbot.js - ADVANCED AI-LIKE VERSION
import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: 'Hi! 👋 I\'m your AI safety assistant.\n\nI can help you with:\n🚨 Emergency alerts\n📝 Incident reporting\n📍 Finding help nearby\n💡 Safety tips\n📞 Emergency contacts\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Advanced response patterns with context awareness
  const responsePatterns = {
    sos: {
      keywords: ['sos', 'emergency', 'urgent', 'help me', 'danger', 'panic', 'attack', 'threatened'],
      responses: [
        '🚨 **EMERGENCY PROTOCOL**\n\n**Immediate Actions:**\n1. Press & HOLD the red SOS button (3 seconds)\n2. Your location will be shared with authorities\n3. Emergency contacts will be notified\n\n**What happens next:**\n✓ Police/ambulance dispatched\n✓ Live location tracking activated\n✓ Emergency contact gets SMS alert\n\n⚠️ **Use only in real emergencies!**\n\nStay calm and stay on the line if possible.',
        '🆘 **Quick Emergency Guide:**\n\n**For immediate danger:**\n• Press SOS button (hold 3 seconds)\n• Call 112 (India emergency)\n• Share live location\n\n**Your alert includes:**\n• GPS coordinates\n• Timestamp\n• Your profile info\n• Medical conditions (if added)\n\nHelp is usually 5-10 minutes away in cities.',
        '🚨 **Emergency Response System:**\n\nWhen you trigger SOS:\n\n**Within 30 seconds:**\n→ Nearest police station alerted\n→ Emergency contact notified\n→ Location tracked in real-time\n\n**Within 2-5 minutes:**\n→ Response team dispatched\n→ Live updates sent to you\n→ Safe zone recommendations\n\n**Stay visible, stay safe!**'
      ]
    },
    safety: {
      keywords: ['safety', 'tips', 'advice', 'precaution', 'protect', 'secure', 'safe'],
      responses: [
        '🛡️ **Essential Safety Tips:**\n\n**Before Going Out:**\n✓ Charge phone to 100%\n✓ Share itinerary with family\n✓ Keep power bank\n✓ Note emergency numbers\n\n**While Outside:**\n✓ Stay in populated areas\n✓ Avoid isolated spots at night\n✓ Trust your instincts\n✓ Keep valuables hidden\n\n**Digital Safety:**\n✓ Enable live location\n✓ Keep SOS app ready\n✓ Save offline maps',
        '💡 **Smart Safety Habits:**\n\n**Personal Security:**\n• Walk confidently\n• Make eye contact\n• Vary your routes\n• Stay alert (no headphones at night)\n\n**Transportation:**\n• Use verified cabs (Uber/Ola)\n• Share ride details\n• Sit behind driver\n• Verify license plate\n\n**At Night:**\n• Stick to well-lit areas\n• Walk with others\n• Keep keys ready\n• Trust your gut feelings',
        '🔒 **Advanced Protection Tips:**\n\n**For Solo Travelers:**\n1. Check in regularly (every 2-3 hours)\n2. Use hotel safe for documents\n3. Keep copy of passport\n4. Learn basic local phrases\n5. Know embassy location\n\n**Tech Safety:**\n• Enable Find My Phone\n• Use VPN on public WiFi\n• Backup important data\n• Keep emergency cash hidden\n\n**Health:**\n• Keep medical info in phone\n• Carry basic first aid\n• Know nearest hospital'
      ]
    },
    report: {
      keywords: ['report', 'incident', 'crime', 'theft', 'harassment', 'complaint', 'file'],
      responses: [
        '📝 **How to Report an Incident:**\n\n**Step 1:** Click "Report Incident" button\n**Step 2:** Select incident type:\n• Theft/Robbery\n• Harassment\n• Medical Emergency\n• Lost Items\n• Unsafe Conditions\n• Other\n\n**Step 3:** Provide details:\n• What happened\n• When (time)\n• Where (auto-location)\n• Photos (if safe to take)\n\n**Step 4:** Submit → Authorities notified\n\n📊 **Response time:** Usually 30-60 minutes',
        '🚔 **Incident Reporting Guide:**\n\n**Types of Reports:**\n\n**🚨 Urgent (< 15 min response):**\n• Active crime\n• Physical danger\n• Medical emergency\n\n**⚠️ Important (< 1 hour):**\n• Theft\n• Harassment\n• Suspicious activity\n\n**📋 Standard (< 24 hours):**\n• Lost items\n• Property damage\n• Safety concerns\n\n**Your report includes:**\n→ Auto-location tagging\n→ Photo evidence\n→ Time-stamped submission\n→ Reference number for tracking',
        '📱 **Digital Incident Report:**\n\n**Why Report?**\n• Creates official record\n• Helps authorities respond\n• Protects other tourists\n• Insurance claims support\n\n**What to Include:**\n✓ Detailed description\n✓ Exact time & location\n✓ Witness information\n✓ Photos/videos (if possible)\n✓ Police report number (if filed)\n\n**Follow-up:**\n• Get reference number\n• Check status in "My Alerts"\n• Save confirmation email\n• Contact embassy if serious'
      ]
    },
    location: {
      keywords: ['location', 'gps', 'track', 'share', 'where', 'find me', 'nearby', 'directions'],
      responses: [
        '📍 **Location Services:**\n\n**Share Live Location:**\n1. Click "Share Location" button\n2. Choose sharing method:\n   • WhatsApp\n   • SMS\n   • Email\n   • Direct link\n3. Select duration (1hr - 8hrs)\n4. Send to trusted contacts\n\n**Features:**\n✓ Real-time updates every 30 sec\n✓ Battery-optimized tracking\n✓ Works offline (with last known location)\n✓ Geofence alerts (if you leave area)',
        '🗺️ **Finding Help Nearby:**\n\n**Click "Find Nearby Help" to see:**\n\n🚓 **Police Stations** (< 2km)\n🏥 **Hospitals** (< 5km)\n🏨 **Safe Zones** (verified hotels)\n🚕 **Taxi Stands**\n☎️ **Tourist Help Centers**\n\n**Navigation:**\n• Tap any marker for details\n• Click "Directions" for Google Maps\n• Call directly from map\n• Save favorites for quick access\n\n**Offline Maps:**\nDownload area map to use without internet!',
        '🌐 **GPS & Tracking:**\n\n**Accuracy:**\n• Urban areas: 3-5 meters\n• Rural areas: 10-20 meters\n• Works even without SIM card\n\n**Battery Saving:**\n• Use "Smart Location" mode\n• Update every 2-5 minutes\n• Disable when not traveling\n\n**Privacy:**\n→ Only YOU control sharing\n→ Stop anytime with one tap\n→ No permanent tracking\n→ Data encrypted end-to-end\n\n**Pro Tip:** Enable "High Accuracy" mode for emergencies!'
      ]
    },
    police: {
      keywords: ['police', 'cop', 'station', 'officer', 'law', 'authority', 'arrest'],
      responses: [
        '👮 **Police Assistance:**\n\n**Emergency Numbers:**\n🚨 **112** - All emergencies (India)\n🚓 **100** - Police direct\n\n**When to Call:**\n• Active crime\n• Threats to safety\n• Suspicious activity\n• Road accidents\n• Lost/stolen items\n\n**Tourist Police:**\nSpecial units in major cities:\n• Speak English\n• Tourist-friendly\n• Know travel issues\n• Available 24/7\n\n**Nearest Station:** Check "Emergency Contacts" tab',
        '🚔 **Working with Police:**\n\n**If You\'re Stopped:**\n• Be polite and cooperative\n• Show ID/passport\n• Explain you\'re a tourist\n• Ask for English speaker\n• Note officer\'s name/badge\n\n**Filing FIR (First Information Report):**\n1. Go to police station\n2. Provide incident details\n3. Get FIR copy (important!)\n4. Note FIR number\n5. Keep for insurance\n\n**Rights:**\n✓ Right to interpreter\n✓ Contact embassy\n✓ Legal representation\n✓ Copy of statements',
        '🚨 **Police Response Guide:**\n\n**Response Times (Average):**\n• Emergency: 5-10 minutes\n• Urgent: 15-30 minutes\n• Standard: 1-2 hours\n\n**What to Tell Them:**\n1. Your name & nationality\n2. Exact location\n3. Nature of emergency\n4. Number of people involved\n5. Injuries (if any)\n\n**Language Barriers:**\n→ Use our app translator\n→ Show your phone screen\n→ Use emergency phrases card\n→ Ask for tourist police\n\n**Stay calm, speak clearly!**'
      ]
    },
    hospital: {
      keywords: ['hospital', 'doctor', 'medical', 'sick', 'injured', 'health', 'ambulance', 'medicine'],
      responses: [
        '🏥 **Medical Emergency:**\n\n**Ambulance Numbers:**\n🚑 **102** - Government ambulance\n🚑 **108** - Free emergency ambulance\n\n**Private Services (faster):**\n• Ziqitza: 1298\n• Dial4242: 42424242\n\n**Finding Hospitals:**\n1. Tap "Find Nearby Help"\n2. Filter: "Hospitals"\n3. See distance & reviews\n4. Get directions\n5. Call ahead if possible\n\n**Carry:**\n→ Passport copy\n→ Insurance card\n→ Blood group info\n→ Allergy list',
        '💊 **Health & Medical Guide:**\n\n**24/7 Medical Helplines:**\n• Apollo: 1066\n• Fortis: 9540647070\n• Max Healthcare: 9818422313\n\n**Common Issues:**\n\n🤢 **Food Poisoning:**\n→ Drink ORS\n→ Avoid dairy\n→ Rest\n→ See doctor if severe\n\n🌡️ **Fever/Flu:**\n→ Take paracetamol\n→ Stay hydrated\n→ Rest in AC room\n\n🤕 **Injury:**\n→ Clean wound\n→ Apply antiseptic\n→ Cover with bandage\n→ Get tetanus shot if needed',
        '🏥 **Hospital Visit Guide:**\n\n**What to Bring:**\n✓ Passport (original + copy)\n✓ Travel insurance card\n✓ List of medications you take\n✓ Emergency contact info\n✓ Credit card (for deposit)\n\n**Costs (Approximate):**\n• Consultation: ₹500-1500\n• ER visit: ₹2000-5000\n• Overnight stay: ₹5000-20000\n\n**Insurance:**\n→ Call provider first\n→ Get pre-authorization\n→ Keep all receipts\n→ Get detailed bill\n\n**Pharmacies:**\nOpen 24/7 near major hospitals'
      ]
    },
    weather: {
      keywords: ['weather', 'rain', 'storm', 'temperature', 'forecast', 'climate', 'hot', 'cold'],
      responses: [
        '🌤️ **Weather & Travel Safety:**\n\n**Check Dashboard for:**\n• Current temperature\n• Humidity levels\n• Wind speed\n• Rain forecast\n• UV index\n\n**Travel Advisories:**\n🟢 **Safe:** Normal conditions\n🟡 **Caution:** Monitor weather\n🔴 **Warning:** Avoid travel\n\n**Monsoon Tips (Jun-Sep):**\n• Carry umbrella/raincoat\n• Wear waterproof shoes\n• Avoid flood-prone areas\n• Book indoor activities\n• Keep electronics dry',
        '⛈️ **Extreme Weather Guide:**\n\n**Heatwave (>40°C):**\n→ Stay hydrated (3-4L water/day)\n→ Avoid 12pm-4pm outside\n→ Wear sunscreen SPF 50+\n→ Light, loose clothing\n→ Carry ORS packets\n\n**Heavy Rain:**\n→ Don\'t wade through water\n→ Avoid riverside areas\n→ Stay on higher floors\n→ Charge devices\n→ Keep emergency kit ready\n\n**Storms:**\n→ Stay indoors\n→ Avoid windows\n→ Unplug electronics\n→ Have flashlight ready',
        '🌡️ **Seasonal Travel Tips:**\n\n**Summer (Mar-Jun):**\n• 35-45°C average\n• Peak tourist season\n• Book AC accommodations\n• Hill stations recommended\n• Drink 4-5L water daily\n\n**Monsoon (Jul-Sep):**\n• Heavy rains\n• Lower prices\n• Lush green scenery\n• Some roads closed\n• Carry rain gear\n\n**Winter (Nov-Feb):**\n• 10-25°C pleasant\n• Best travel time\n• Pack warm clothes for nights\n• Clear skies for sightseeing'
      ]
    },
    lost: {
      keywords: ['lost', 'missing', 'stolen', 'theft', 'robbed', 'pickpocket', 'bag', 'wallet', 'passport'],
      responses: [
        '😰 **Lost/Stolen Items:**\n\n**Immediate Actions:**\n\n📱 **Phone:**\n1. Call your number (might still ring)\n2. Use Find My Device/iPhone\n3. Block SIM card immediately\n4. File police complaint\n5. Contact insurance\n\n💳 **Cards/Wallet:**\n1. Block all cards (save numbers!)\n2. File FIR at police station\n3. Contact bank fraud department\n4. Check unauthorized transactions\n5. Get new cards issued\n\n**Report via app:** Use "Report Incident" button',
        '🎒 **Lost Belongings Guide:**\n\n**Priority Actions:**\n\n**Documents (Passport/Visa):**\n🔴 **URGENT:**\n1. File police FIR immediately\n2. Get FIR copy (3 copies)\n3. Contact your embassy\n   • Report loss\n   • Get emergency docs\n4. Apply for temporary passport\n5. Get re-entry permit if needed\n\n**Valuables:**\n• File police report\n• Hotel lost & found\n• Transport company\n• Check CCTV footage\n• Insurance claim\n\n**Prevention:**\n→ Use hotel safe\n→ Keep copies separate\n→ Use anti-theft bag',
        '🆘 **Theft/Robbery Protocol:**\n\n**During Incident:**\n⚠️ Don\'t resist if threatened\n⚠️ Safety > possessions\n→ Observe details (face, clothes)\n→ Note direction they went\n→ Remember time exactly\n\n**After Incident:**\n1. Go to safe place\n2. Call police: 100/112\n3. File FIR within 24 hours\n4. List all stolen items\n5. Get medical help if injured\n6. Contact embassy\n7. Inform credit card companies\n8. Report to insurance (48hrs)\n\n**Our Support:**\n→ Emergency contacts list\n→ Nearest police station\n→ Embassy information'
      ]
    },
    greetings: {
      keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening', 'namaste'],
      responses: [
        'Hello! 👋 Great to see you!\n\nI\'m your AI-powered safety assistant. I\'m here 24/7 to help you stay safe while traveling.\n\n**Quick Help:**\n• Type "SOS" for emergency info\n• Type "safety" for travel tips\n• Type "report" to file incident\n• Type "help" to see all features\n\nWhat can I help you with today?',
        'Hey there! 😊 Welcome back!\n\nI hope you\'re having a safe and amazing trip! I\'m here if you need:\n\n🚨 Emergency assistance\n💡 Safety advice\n📍 Location services\n📝 Incident reporting\n📞 Emergency contacts\n\nJust ask me anything - I\'m trained to help travelers like you!',
        'Namaste! 🙏 Hello!\n\nYour personal safety companion is online and ready to help!\n\n**I can assist with:**\n→ Emergency protocols\n→ Finding nearby help\n→ Safety tips & advice\n→ Reporting incidents\n→ Medical emergencies\n→ Weather updates\n\nFeel free to ask me anything about staying safe!'
      ]
    },
    thanks: {
      keywords: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'good'],
      responses: [
        'You\'re very welcome! 😊\n\nStay safe out there! Remember:\n• Keep SOS button accessible\n• Share your location\n• Trust your instincts\n\nI\'m here 24/7 if you need anything else. Happy travels! 🌍✨',
        'Glad I could help! 🎉\n\nYour safety is our priority. Don\'t hesitate to reach out anytime - day or night!\n\nHave an amazing and safe journey! 🛡️',
        'Happy to assist! 🌟\n\nRemember: Prevention is better than cure. Stay alert, stay safe!\n\nFeel free to ask more questions anytime. Safe travels! ✈️'
      ]
    }
  };

  const getSmartResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Find matching category
    for (const [category, data] of Object.entries(responsePatterns)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        // Return random response from that category
        const responses = data.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Default intelligent fallback
    const fallbackResponses = [
      '🤔 I\'m not quite sure about that, but I can definitely help you with:\n\n• 🚨 **Emergency situations** - Type "emergency" or "SOS"\n• 💡 **Safety tips** - Type "safety tips"\n• 📝 **Report incidents** - Type "report"\n• 📍 **Find nearby help** - Type "location" or "nearby"\n• 🏥 **Medical help** - Type "hospital" or "doctor"\n• 🌤️ **Weather info** - Type "weather"\n\nWhat would you like to know?',
      'Interesting question! While I specialize in safety and travel assistance, here\'s what I can help you with:\n\n**My Expertise:**\n→ Emergency protocols\n→ Safety recommendations\n→ Incident reporting\n→ Finding help nearby\n→ Medical emergencies\n→ Weather updates\n\nTry asking something safety-related!',
      'I\'m your safety assistant, so I focus on keeping you secure! 🛡️\n\n**Try asking me about:**\n• "How to use SOS?"\n• "What to do if I\'m lost?"\n• "Nearest police station?"\n• "Safety tips for solo travelers?"\n• "What if my passport is stolen?"\n\nI\'m great at these topics!'
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { 
      type: 'user', 
      text: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI "thinking" time
    setTimeout(() => {
      const botResponse = getSmartResponse(input);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: botResponse,
        timestamp: new Date()
      }]);
    }, 800 + Math.random() * 400); // Random delay 800-1200ms for realism
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action) => {
    setInput(action);
    // Auto-send after a brief moment
    setTimeout(() => {
      const event = { target: { value: action } };
      setInput(action);
      setTimeout(handleSend, 100);
    }, 100);
  };

  return (
    <div className="chatbot">
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AI Safety Assistant"
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && <span className="chat-badge">AI</span>}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-title">🤖 AI Safety Assistant</span>
              <span className="chatbot-status">● Online</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="chatbot-close">✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.type === 'bot' && <div className="bot-avatar">🤖</div>}
                <div className="message-bubble">
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="bot-avatar">🤖</div>
                <div className="message-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-actions">
            <button onClick={() => handleQuickAction('SOS help')} className="quick-btn">
              🚨 Emergency
            </button>
            <button onClick={() => handleQuickAction('safety tips')} className="quick-btn">
              💡 Safety Tips
            </button>
            <button onClick={() => handleQuickAction('report incident')} className="quick-btn">
              📝 Report
            </button>
            <button onClick={() => handleQuickAction('find nearby hospital')} className="quick-btn">
              🏥 Hospital
            </button>
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about safety..."
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="send-btn"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;