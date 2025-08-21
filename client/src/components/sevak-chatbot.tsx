import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Bot, User, MessageCircle, X, Minimize2 } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import OpenAI from 'openai';
// NEW: Import ReactMarkdown to render markdown content
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Your comprehensive knowledge base remains the same
const SEVAKAI_KNOWLEDGE_BASE = `
# SevakAI - AI-Powered Domestic Helper Platform

## Company Overview
SevakAI is India's first AI-powered platform that connects homeowners with verified domestic helpers including maids, cooks, nannies, and elderly care assistants. We replace random referrals and WhatsApp groups with a systematic, AI-driven approach to domestic help hiring.

## Services Offered
### 🏠 Maids & Housekeepers
- Full-time live-in and live-out options
- Part-time (2-6 hours daily)
- One-time deep cleaning services
- Regular weekly/monthly cleaning
- Verified profiles with background checks

### 👨‍🍳 Cooks & Chefs
- Full-time family cooks
- Part-time meal preparation
- Vegetarian and non-vegetarian specialists
- Regional cuisine experts (South Indian, North Indian, Bengali, etc.)
- Special dietary requirements (diabetic, low-sodium, etc.)

### 👶 Nannies & Babysitters
- Experienced child care professionals
- Age-specific care (infants, toddlers, school-age)
- Educational support and activity planning
- Overnight care available
- Emergency babysitting services

### ❤️ Elderly Care
- Companion care services
- Medical appointment assistance
- Medication reminders
- Light housekeeping for seniors
- Emotional support and conversation

## Core Technology Features
### 🤖 AI Interview System
- Multilingual AI agent conducts video interviews
- Supports Hindi, English, Telugu, Tamil, Bengali, Kannada, Malayalam, Marathi, Gujarati
- Comprehensive skill assessment and background verification
- Behavioral analysis through conversation patterns
- Real-time language translation capabilities

### 📊 ML Scoring & Verification
- Advanced machine learning algorithms evaluate candidates
- Scoring based on:
  - Reliability and punctuality history
  - Communication skills
  - Technical competency
  - Trustworthiness indicators
  - Previous employer feedback
  - Background verification results

### 🎯 Smart Matching Algorithm
- AI learns family preferences and requirements
- Location-based matching within your area
- Personality compatibility assessment
- Schedule and availability optimization
- Price range matching
- Special requirement fulfillment (pets, elderly care, etc.)

### 🛡️ Verification Process
- Police background verification
- Identity document verification (Aadhaar, PAN)
- Previous employer reference checks
- Skills assessment tests
- Health and vaccination status
- Address verification


### No Hidden Charges
- Zero commission fees
- No broker charges
- No advance payments to platform
- Direct salary payment to helpers
- Transparent pricing with no surprises

## Geographic Coverage
### Currently Available
- **Hyderabad, Telangana** (Full Service)
  - All areas including Banjara Hills, Jubilee Hills, Gachibowli, Kondapur, Madhapur, Miyapur, Secunderabad

### Expanding Soon (2024-2025)
- **Bengaluru, Karnataka** - Tech hub expansion
- **Chennai, Tamil Nadu** - South India coverage
- **Dubai, UAE** - International market entry
- **Mumbai, Maharashtra** - West India launch
- **Delhi NCR** - North India expansion

## How SevakAI Works
### Step 1: Customer Registration
- Sign up with basic requirements
- Specify helper type, timings, budget
- Detail special requirements (pets, elderly, dietary needs)
- Set location and preferred working hours

### Step 2: AI-Powered Helper Sourcing
- AI interview agent interviews potential helpers
- Comprehensive background verification
- Skills assessment and scoring
- Language preference matching
- Availability confirmation

### Step 3: Smart Matching
- Algorithm matches based on your criteria
- Multiple candidate profiles provided
- Video introductions available
- Schedule preliminary interviews
- Reference check completion

### Step 4: Hiring & Onboarding
- Direct communication with selected helper
- Contract terms discussion
- Trial period arrangement (typically 7-15 days)
- Ongoing support and feedback system
- Performance monitoring

## Unique Value Propositions
### For Customers
- **Time Saving**: No endless searching through unreliable sources
- **Quality Assurance**: All helpers verified and rated
- **Safety First**: Background checks and police verification
- **Language Support**: Multilingual platform and helpers
- **Ongoing Support**: 24/7 customer service
- **Trial Periods**: Risk-free hiring with trial options
- **No Broker Hassles**: Direct platform, no middlemen

### For Helpers
- **Fair Employment**: Direct connection with families
- **Skill Development**: Training programs and certifications
- **Better Wages**: No broker cuts, full salary to helpers
- **Work-Life Balance**: Flexible timing options
- **Career Growth**: Performance-based opportunities
- **Women Empowerment**: Focus on providing opportunities for women

## Technology Stack
- AI-powered video recognition and natural language processing
- Machine learning algorithms for matching and scoring
- Multilingual support with real-time translation
- Mobile-first platform design
- Secure payment processing
- Real-time background verification systems

## Contact Information
- **Phone**: +91 98765 43210 (Available 24/7)
- **Email**: hello@sevakai.com
- **WhatsApp**: Available for instant support
- **Office**: Hyderabad, India
- **Website**: Professional consultation and registration

## Special Programs
### Women Empowerment Initiative
- Priority employment for women from underprivileged backgrounds
- Skill training and certification programs
- Financial literacy workshops
- Career advancement opportunities
- Supportive community building

### Quality Assurance
- Regular performance reviews
- Customer feedback integration
- Continuous improvement programs
- Helper training and development
- Technology-driven monitoring

## Competitive Advantages
1. **AI-First Approach**: Only platform using AI for comprehensive helper evaluation
2. **Multilingual Support**: Truly inclusive platform supporting all major Indian languages
3. **Verification Depth**: Most comprehensive background checking in the industry
4. **No Commission Model**: Fair pricing without hidden broker fees
5. **Technology Integration**: Seamless app and web experience
6. **Customer Support**: 24/7 multilingual customer service
7. **Trial Flexibility**: Risk-free hiring with generous trial periods

This comprehensive knowledge base covers all aspects of SevakAI's services, technology, pricing, and value propositions for customers looking to hire domestic helpers in India.
`;

// NEW: Pre-process the knowledge base into searchable chunks
const preprocessKnowledgeBase = (kb: string) => {
  return kb.split('## ').slice(1).map(section => {
    const lines = section.split('\n');
    const title = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();
    return { title, content };
  });
};

// NEW: Find relevant context from the knowledge base based on user query
const findRelevantContext = (query: string, chunks: { title: string; content: string }[]) => {
  const queryWords = query.toLowerCase().split(/\s+/);
  const scoredChunks = chunks.map(chunk => {
    let score = 0;
    const titleWords = chunk.title.toLowerCase();
    const contentWords = chunk.content.toLowerCase();

    queryWords.forEach(word => {
      if (titleWords.includes(word)) score += 5; // Higher weight for title matches
      if (contentWords.includes(word)) score += 1;
    });
    return { ...chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  
  // Return the top 3 most relevant chunks plus the company overview
  const relevantChunks = scoredChunks.filter(c => c.score > 0).slice(0, 3);
  const overviewChunk = chunks.find(c => c.title.includes("Company Overview"));
  if (overviewChunk && !relevantChunks.some(rc => rc.title === overviewChunk.title)) {
    relevantChunks.unshift({ ...overviewChunk, score: 1.0 });
  }

  return relevantChunks.map(c => `## ${c.title}\n${c.content}`).join('\n\n');
};

export const SevakChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! 👋 I'm your SevakAI Assistant. I'm here to help you find trusted domestic helpers like maids, cooks, and nannies. What kind of help are you looking for? 🏠✨",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [openai, setOpenai] = useState<OpenAI | null>(null);

  // NEW: Memoize the processed knowledge base so it only runs once
  const knowledgeChunks = useMemo(() => preprocessKnowledgeBase(SEVAKAI_KNOWLEDGE_BASE), []);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      const client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
      setOpenai(client);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // CHANGED: This function now uses relevant context instead of the whole knowledge base
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!openai) {
      return "I'm currently experiencing technical difficulties. 🔧 Please contact support at +91 98765 43210.";
    }

    // NEW: Find relevant context before calling the API
    const relevantContext = findRelevantContext(userMessage, knowledgeChunks);

    // NEW: The system prompt is now much more concise
    const systemPrompt = `You are SevakAI Assistant, a friendly, professional, and helpful chatbot for SevakAI.
- Your personality is warm, enthusiastic, and conversational. Use emojis appropriately.
- ONLY answer questions related to SevakAI using the provided context.
- If the answer is not in the context or the question is unrelated, politely say: "I'm here to help with SevakAI's domestic helper services! How can I assist you in finding the perfect helper for your home? 🏠"
- Format your answers using markdown for better readability. Use **bold** for emphasis, bullet points for lists, and ## for section headings when appropriate.
- Always encourage users to contact SevakAI for personalized assistance.

--- RELEVANT CONTEXT ---
${relevantContext}
--- END CONTEXT ---
`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Changed to a more efficient model
        messages: [
          { role: "system", content: systemPrompt },
          // NEW: We now send the previous messages for context
          ...messages.slice(-4).map(msg => ({ role: msg.role, content: msg.content })),
          { role: "user", content: userMessage }
        ],
        max_tokens: 400, // Reduced max_tokens as the context is smaller
        temperature: 0.5, // Slightly lower for more factual answers
      });

      const response = completion.choices[0]?.message?.content;
      return response || "I apologize, but I couldn't process your request. Could you please rephrase?";
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return "I'm having trouble connecting to my AI system. 🛠️ For immediate help, please contact our team at +91 98765 43210.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Error handling is already in generateAIResponse, but as a fallback
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm experiencing some technical difficulties. 🔧 Please reach out to our support team.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (handleKeyPress, openWhatsApp, and the initial JSX for the launcher icon remain the same)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in SevakAI's domestic helper services. Can you help me?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-36 sm:right-4 z-50 flex flex-col items-end gap-2 sm:gap-3">
        {/* Chatbot Launcher Button with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-3 sm:p-4 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
              aria-label="Open SevakAI Chat Assistant"
              style={{ maxWidth: 'calc(100vw - 2rem)' }}
            >
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-slate-800 text-white">
            Chat with SevakAI
          </TooltipContent>
        </Tooltip>
        {/* WhatsApp Button - official WhatsApp icon */}
        <button
          onClick={openWhatsApp}
          className="bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full p-3 sm:p-4 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 border-2 border-white"
          aria-label="Contact SevakAI on WhatsApp"
          style={{ 
            boxShadow: '0 4px 16px 0 rgba(37,211,102,0.15)',
            maxWidth: 'calc(100vw - 2rem)'
          }}
        >
          {/* Clean WhatsApp SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            className="block sm:w-6 sm:h-6"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-36 sm:right-4 z-50 chatbot">
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-72 sm:w-80 h-16' : 'w-[calc(100vw-2rem)] sm:w-96 h-[500px] sm:h-[600px]'
      } max-w-[90vw] max-h-[90vh] flex flex-col overflow-hidden`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-t-2xl flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-white/20 rounded-full p-1.5 sm:p-2">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-lg">SevakAI Assistant</h3>
              <p className="text-xs opacity-90 hidden sm:block">Your domestic helper expert 🏠</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            >
              <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 sm:gap-2.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0 mt-1" />}
                  <div
                    className={`flex flex-col max-w-[90%] sm:max-w-[85%] leading-1.5 p-3 sm:p-4 border-gray-200 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border rounded-bl-none'
                    } shadow-sm`}
                  >
                    <div className="text-sm font-normal prose prose-sm max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Customize markdown rendering for chat
                          h1: ({...props}) => <h1 className="text-base font-bold mb-2 mt-2" {...props} />,
                          h2: ({...props}) => <h2 className="text-sm font-bold mb-1 mt-2" {...props} />,
                          h3: ({...props}) => <h3 className="text-sm font-semibold mb-1 mt-1" {...props} />,
                          p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({...props}) => <ul className="mb-2 pl-4" {...props} />,
                          ol: ({...props}) => <ol className="mb-2 pl-4" {...props} />,
                          li: ({...props}) => <li className="mb-1" {...props} />,
                          strong: ({...props}) => <strong className="font-semibold" {...props} />,
                          em: ({...props}) => <em className="italic" {...props} />,
                          code: ({...props}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-xs" {...props} />,
                          pre: ({...props}) => <pre className="bg-gray-100 p-2 rounded mt-2 mb-2 text-xs overflow-x-auto" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <p className={`text-xs mt-2 ${ message.role === 'user' ? 'text-white/70 text-right' : 'text-gray-500 text-left' }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                   {message.role === 'user' && <User className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0 mt-1" />}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl px-3 sm:px-4 py-2 sm:py-3 mr-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                      <div className="flex space-x-0.5 sm:space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Container */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              {/* Quick Actions */}
              <div className="mb-2 sm:mb-3 flex flex-wrap gap-1.5 sm:gap-2">
                <button onClick={() => setInputMessage("What services do you offer?")} className="text-xs bg-orange-100 text-orange-700 px-2 sm:px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">Services</button>
                <button onClick={() => setInputMessage("How much does a cook cost?")} className="text-xs bg-orange-100 text-orange-700 px-2 sm:px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">Pricing</button>
              </div>
              <div className="flex space-x-2 sm:space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about maids, cooks..."
                  className="flex-1 border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl p-2 sm:p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};