import React, { useState } from 'react';
import { Plus, Phone, Mail, Bot } from 'lucide-react';
import type { SupportTicket } from '../types';
import { useAuth } from '../context/AuthContext';

export const SupportPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('ORDER');
  const [message, setMessage] = useState('');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const newTicket: SupportTicket = {
      id: 't_' + Date.now(),
      userName: user ? user.fullName : 'Guest User',
      userEmail: user ? user.email : 'guest@sensation.com',
      subject,
      category,
      status: 'OPEN',
      priority: 'MEDIUM',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: 'm_1',
          senderName: user ? user.fullName : 'Guest',
          senderRole: user ? user.role : 'GUEST',
          message,
          createdAt: new Date().toLocaleTimeString()
        },
        {
          id: 'm_2',
          senderName: 'Sensation AI Assistant',
          senderRole: 'AI_BOT',
          message: 'Your ticket has been submitted to our Nellore store team. An agent will reply shortly!',
          createdAt: new Date().toLocaleTimeString()
        }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setIsModalOpen(false);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-mono-900">Customer Support & Tickets</h1>
          <p className="text-xs text-mono-500">Live chat, AI assistant, returns & ticket management</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-mono-900 hover:bg-mono-800 text-white font-bold text-xs rounded-xl flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Ticket</span>
        </button>
      </div>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
          <Phone className="w-5 h-5 text-mono-900" />
          <h4 className="font-bold text-mono-900 text-sm">Nellore Store Phone</h4>
          <p className="text-mono-500">+91 98480 12345 (10am - 9pm)</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
          <Mail className="w-5 h-5 text-mono-900" />
          <h4 className="font-bold text-mono-900 text-sm">Email Support</h4>
          <p className="text-mono-500">support@sensationunleashed.in</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
          <Bot className="w-5 h-5 text-mono-900" />
          <h4 className="font-bold text-mono-900 text-sm">AI Chatbot</h4>
          <p className="text-mono-500">Click bottom-right widget to chat</p>
        </div>
      </div>

      {/* Support Tickets History */}
      <div className="space-y-4">
        <h3 className="font-bold text-mono-900 text-lg">Your Active Support Tickets</h3>
        {tickets.length === 0 ? (
          <div className="text-center py-10 text-mono-400 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-sm font-semibold text-mono-900">No active support tickets.</p>
          </div>
        ) : (
          tickets.map(ticket => (
            <div key={ticket.id} className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold bg-mono-100 text-mono-900 border border-mono-200 px-2.5 py-1 rounded-full uppercase">
                    {ticket.category}
                  </span>
                  <h4 className="font-bold text-mono-900 text-sm">{ticket.subject}</h4>
                </div>
                <span className="text-[10px] font-bold bg-mono-100 text-mono-700 px-2 py-0.5 rounded border border-mono-200">
                  {ticket.status}
                </span>
              </div>

              <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs">
                {ticket.messages.map(m => (
                  <div key={m.id} className="text-mono-600">
                    <span className="font-bold text-mono-900">{m.senderName}: </span>
                    <span>{m.message}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-mono-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white p-6 rounded-3xl border border-gray-200 w-full max-w-lg space-y-4 text-mono-900 shadow-xl">
            <h3 className="text-lg font-bold">Submit a Support Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block text-mono-500 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sizing query for Silk Kurta"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-mono-900"
                />
              </div>
              <div>
                <label className="block text-mono-500 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-mono-900"
                >
                  <option value="ORDER">Order & Delivery</option>
                  <option value="SUBSCRIPTION">₹500 VIP Membership</option>
                  <option value="REFUND">Refund / Exchange</option>
                  <option value="PRODUCT">Product Sizing</option>
                </select>
              </div>
              <div>
                <label className="block text-mono-500 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your issue or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-mono-900"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-mono-700 rounded-xl font-bold border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-mono-900 text-white font-bold rounded-xl"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
