import React, { useState } from 'react';
import { Mail, Search, Trash2, Send, Clock, Check, X, Filter } from 'lucide-react';
import { Message } from '../../../types';

interface MessagesTabProps {
  messages: Message[];
  onToggleRead: (id: string, currentRead: boolean) => void;
  onDeleteMessage: (id: string) => void;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({
  messages,
  onToggleRead,
  onDeleteMessage,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = messages.filter((m) => !m.read).length;

  const filteredMessages = messages.filter((m) => {
    if (filter === 'unread' && m.read) return false;
    if (filter === 'read' && !m.read) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.name?.toLowerCase().includes(q);
      const matchEmail = m.email?.toLowerCase().includes(q);
      const matchSubject = m.subject?.toLowerCase().includes(q);
      const matchMessage = m.message?.toLowerCase().includes(q);
      return matchName || matchEmail || matchSubject || matchMessage;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-[#18181B] tracking-tight">
              Client Inquiries & Contact Leads
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-black text-xs border border-[#F4ECEE]">
              {messages.length} Total
            </span>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 font-black text-xs animate-pulse">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Review incoming project proposals, job offers, and messages sent through your portfolio contact form.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages by name, email, subject, or keywords..."
              className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#18181B]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center space-x-1 p-1 rounded-2xl bg-[#F4F4F5] shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-[#761A30] shadow-xs'
                  : 'text-[#71717A] hover:text-[#18181B]'
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                filter === 'unread'
                  ? 'bg-white text-[#761A30] shadow-xs'
                  : 'text-[#71717A] hover:text-[#18181B]'
              }`}
            >
              <span>Unread</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'read'
                  ? 'bg-white text-[#761A30] shadow-xs'
                  : 'text-[#71717A] hover:text-[#18181B]'
              }`}
            >
              Read ({messages.length - unreadCount})
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#EAE3E5] text-center space-y-3">
          <Mail className="w-10 h-10 mx-auto text-[#A1A1AA]" />
          <h3 className="text-base font-bold text-[#18181B]">No messages match your criteria</h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            {searchQuery ? 'Try clearing your search query.' : 'Your inbox is clear.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-full bg-[#FAFAFA] border border-[#E4E4E7] text-xs font-bold text-[#52525B] hover:bg-slate-100"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => {
            const id = msg._id || msg.id;
            const dateFormatted = new Date(msg.createdAt).toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short'
            });

            return (
              <div
                key={id}
                className={`p-6 rounded-3xl border transition-all ${
                  msg.read 
                    ? 'bg-white border-[#EAE3E5] shadow-xs' 
                    : 'bg-[#FAF3F5]/70 border-[#F4ECEE] shadow-sm ring-1 ring-[#761A30]/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                      <div className={`w-3 h-3 rounded-full ${msg.read ? 'bg-slate-300' : 'bg-[#761A30] ring-4 ring-[#761A30]/20'}`} />
                      <h3 className="font-bold text-base text-[#18181B]">{msg.name}</h3>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-[#761A30] hover:underline font-medium"
                      >
                        &lt;{msg.email}&gt;
                      </a>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-[#71717A]">
                      <Clock className="w-3 h-3 text-[#A1A1AA]" />
                      <span>{dateFormatted}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 self-end sm:self-start">
                    <button
                      onClick={() => onToggleRead(id, !!msg.read)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        msg.read
                          ? 'bg-[#F4F4F5] text-[#52525B] hover:bg-slate-200'
                          : 'bg-[#761A30] text-white hover:bg-[#5E1426]'
                      }`}
                    >
                      {msg.read ? 'Mark Unread' : 'Mark as Read'}
                    </button>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E4E4E7] text-[#761A30] hover:bg-[#FAF3F5] text-xs font-bold transition-colors"
                      title="Reply via email client"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </a>
                    <button
                      onClick={() => onDeleteMessage(id)}
                      className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#F1EBEB] space-y-2">
                  <div className="text-xs font-black uppercase tracking-wider text-[#71717A]">
                    Subject: <span className="text-[#18181B]">{msg.subject || 'Portfolio Inquiry'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/80 border border-[#F1EBEB] text-xs sm:text-sm text-[#18181B] leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
