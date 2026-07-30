import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Send, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import type { TicketMessage } from '../types';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { isCartOpen } = useCart();
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const dragRef = useRef({ active: false, startX: 0, startY: 0, origX: 0, origY: 0 });
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<TicketMessage[]>([
    {
      id: 'm1',
      senderName: 'Sensation AI Assistant',
      senderRole: 'AI_BOT',
      message: 'Namaste! Welcome to Sensation Unleashed Nellore. How can I help you with our clothing collection, ₹500 VIP subscription, or order delivery today?',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleDragMove = (e: MouseEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: Math.max(12, dragRef.current.origX + dx),
      y: Math.max(12, dragRef.current.origY + dy)
    });
  };

  const handleDragStop = () => {
    dragRef.current.active = false;
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragStop);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragStop);
    };
  }, []);

  const location = useLocation();
  const isCheckoutPage = location.pathname === '/checkout';
  const hideWidget = isCheckoutPage || isCartOpen;

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current.active = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.origX = position.x;
    dragRef.current.origY = position.y;
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragStop);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: TicketMessage = {
      id: 'um_' + Date.now(),
      senderName: user ? user.fullName.split(' ')[0] : 'Guest',
      senderRole: user ? user.role : 'GUEST',
      message: inputMessage,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    const userQuery = inputMessage.toLowerCase();
    setInputMessage('');

    // Instant AI Bot response logic
    setTimeout(() => {
      let botResponse = "Thank you for reaching out! Our Nellore customer support team has received your message.";
      if (userQuery.includes('subscription') || userQuery.includes('500') || userQuery.includes('vip')) {
        botResponse = "Sensation VIP Membership costs ₹500/month and gives you member-only prices, early sale access, and 24-hr priority delivery in Nellore!";
      } else if (userQuery.includes('delivery') || userQuery.includes('nellore') || userQuery.includes('shipping')) {
        botResponse = "Orders inside Nellore town are delivered within 24-48 hours. Orders across Andhra Pradesh take 2-4 business days.";
      } else if (userQuery.includes('return') || userQuery.includes('size')) {
        botResponse = "We offer a 7-day hassle-free return and size exchange policy! Keep product tags intact.";
      }

      const botMsg: TicketMessage = {
        id: 'bm_' + Date.now(),
        senderName: 'Sensation AI Assistant',
        senderRole: 'AI_BOT',
        message: botResponse,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

   if (hideWidget && !isOpen) return null;

   return (
     <div
       className={isOpen ? (isCheckoutPage ? 'fixed z-10' : 'fixed z-50') : 'fixed bottom-6 right-6 z-50'}
       style={isOpen ? { left: position.x, top: position.y } : undefined}
     >
       {!isOpen ? (
         <button
           onClick={() => setIsOpen(true)}
           className="bg-mono-900 text-white p-4 rounded-full shadow-2xl flex items-center space-x-2 font-black hover:scale-105 transition-transform cursor-pointer"
         >
           <Bot className="w-6 h-6 fill-white" />
           <span className="hidden sm:inline text-xs">Chat with AI Support</span>
         </button>
       ) : (
         <div className="w-80 sm:w-96 bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[480px]">
           {/* Header */}
           <div
             className="bg-mono-950 p-4 border-b border-mono-800 flex items-center justify-between cursor-move"
             onMouseDown={handleDragStart}
           >
             <div className="flex items-center space-x-2.5">
               <div className="w-8 h-8 rounded-full bg-mono-900 text-white font-black flex items-center justify-center">
                 <Bot className="w-5 h-5 fill-white" />
               </div>
               <div>
                 <h4 className="font-bold text-white text-xs">Sensation AI Support</h4>
                 <span className="text-[10px] text-mono-300 font-semibold flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-mono-300 animate-ping" /> Online • Nellore Store
                 </span>
               </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="text-mono-400 hover:text-white p-1">
               <X className="w-5 h-5" />
             </button>
           </div>

           {/* Messages Body */}
           <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-gray-50">
             {messages.map(msg => (
               <div 
                 key={msg.id} 
                 className={`flex flex-col ${msg.senderRole === 'AI_BOT' || msg.senderRole === 'ROLE_SUPPORT' ? 'items-start' : 'items-end'}`}
               >
                 <div className={`max-w-[85%] p-3 rounded-2xl ${
                   msg.senderRole === 'AI_BOT'
                     ? 'bg-gray-100 border border-gray-200 text-mono-800'
                     : 'bg-mono-900 text-white font-medium'
                 }`}>
                   <span className="block text-[9px] font-bold opacity-75 mb-1">{msg.senderName}</span>
                   <p>{msg.message}</p>
                 </div>
                 <span className="text-[9px] text-mono-400 mt-1">{msg.createdAt}</span>
               </div>
             ))}
           </div>

           {/* Input Form */}
           <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
             <input
               type="text"
               placeholder="Ask about clothing, ₹500 VIP, sizing..."
               value={inputMessage}
               onChange={(e) => setInputMessage(e.target.value)}
               className="flex-1 bg-gray-100 text-mono-900 text-xs rounded-xl px-3 py-2 border border-gray-200 focus:outline-none focus:border-mono-900"
             />
             <button
               type="submit"
               className="p-2 bg-mono-900 text-white rounded-xl hover:bg-mono-800 transition-colors font-bold"
             >
               <Send className="w-4 h-4" />
             </button>
           </form>
         </div>
       )}
     </div>
   );
};
