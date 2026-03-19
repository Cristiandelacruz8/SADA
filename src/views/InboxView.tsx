import React from 'react';
import { MOCK_CONVERSATIONS } from '../data';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  MessageSquare, 
  Phone, 
  Mail, 
  Send, 
  Paperclip, 
  Mic, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  PanelRightClose,
  PanelRightOpen,
  X,
  ChevronDown,
  Globe,
  Hash,
  Instagram,
  Twitter,
  MessageCircle,
  PhoneCall,
  Delete
} from 'lucide-react';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import { Conversation, Message } from '../types';
import { useTranslation } from '../i18n';

// Initial messages for demo purposes
const INITIAL_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: 'm1', sender: 'Marcus Chen', content: "The portfolio rebalancing for Q3 hasn't reflected in my dashboard yet.", timestamp: '14:20', channel: 'Email', isAgent: false },
  ],
  '2': [
    { id: 'm2', sender: 'Elena Rodriguez', content: "Hi, I'm trying to log in but the two-factor authentication code is taking over 5 minutes to arrive. Is there a problem with the SMS gateway today?", timestamp: '14:15', channel: 'SMS', isAgent: false },
    { id: 'm3', sender: 'Agent Alex', content: "Hello Elena! I'm sorry to hear about the delay. I've just checked our system, and we are experiencing high traffic on the SMS provider side. I can help you verify via another method or I can resend it now.", timestamp: '14:18', channel: 'Internal', isAgent: true },
  ],
  '3': [
    { id: 'm4', sender: 'David Sterling', content: 'Missed call. Voice note transcribed: "Need to discuss the risk assessment..."', timestamp: '11:05', channel: 'Voice', isAgent: false },
  ]
};

const CHANNEL_ICONS: Record<string, any> = {
  'SMS': MessageSquare,
  'Email': Mail,
  'Voice': Phone,
  'WhatsApp': MessageCircle,
  'Instagram': Instagram,
  'Twitter': Twitter,
  'Internal': Hash,
  'Web': Globe
};

export function InboxView() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = React.useState('2');
  const [filter, setFilter] = React.useState<'all' | 'priority' | 'unassigned'>('all');
  const [conversations, setConversations] = React.useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = React.useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = React.useState('');
  const [showContextPanel, setShowContextPanel] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);
  const [isAiGenerating, setIsAiGenerating] = React.useState(false);
  const [activeChannel, setActiveChannel] = React.useState<string>('SMS');
  const [showChannelDropdown, setShowChannelDropdown] = React.useState(false);
  const [showWebPhone, setShowWebPhone] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const selectedConv = conversations.find(c => c.id === selectedId) || conversations[0];
  const currentMessages = messages[selectedId] || [];

  const filteredConversations = React.useMemo(() => {
    return conversations.filter(conv => {
      if (filter === 'priority') return conv.priority;
      if (filter === 'unassigned') return conv.status === 'unassigned';
      return true;
    });
  }, [conversations, filter]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Agent Alex',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: activeChannel as any,
      isAgent: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMessage]
    }));

    setConversations(prev => prev.map(c => 
      c.id === selectedId ? { ...c, lastMessage: inputValue, timestamp: 'Now', channel: activeChannel as any } : c
    ));

    setInputValue('');
  };

  const handleMarkResolved = () => {
    setConversations(prev => prev.map(c => 
      c.id === selectedId ? { ...c, status: 'resolved' as const } : c
    ));
    alert(`Conversation with ${selectedConv.participant} marked as resolved.`);
  };

  const handleEscalate = () => {
    setConversations(prev => prev.map(c => 
      c.id === selectedId ? { ...c, priority: true } : c
    ));
    alert(`Conversation with ${selectedConv.participant} escalated to high priority.`);
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue(prev => prev + " [Voice Transcription: Please update the risk profile for this account.]");
      }, 3000);
    }
  };

  const handleAiClick = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setInputValue("Based on the customer's history, I recommend offering a temporary credit limit increase while the technical issue is resolved.");
    }, 1500);
  };

  const handleDial = (num: string) => {
    setPhoneNumber(prev => prev + num);
  };

  const handleCall = () => {
    if (!phoneNumber) return;
    alert(`Calling ${phoneNumber}...`);
    // Simulate a call message
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Agent Alex',
      content: `Outgoing call to ${phoneNumber} (Duration: 00:00)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: 'Voice',
      isAgent: true
    };
    setMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMessage]
    }));
    setPhoneNumber('');
    setShowWebPhone(false);
  };

  const ActiveChannelIcon = CHANNEL_ICONS[activeChannel] || MessageSquare;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Conversation List */}
      <div className="w-80 border-r border-slate-200 bg-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">{t('ib.title')}</h2>
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {filteredConversations.length}
            </span>
          </div>
          <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
            <button 
              onClick={() => setFilter('all')}
              className={cn(
                "flex-1 text-xs font-bold py-1.5 rounded-lg transition-all",
                filter === 'all' ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {t('ib.all')}
            </button>
            <button 
              onClick={() => setFilter('priority')}
              className={cn(
                "flex-1 text-xs font-bold py-1.5 rounded-lg transition-all",
                filter === 'priority' ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {t('ib.priority')}
            </button>
            <button 
              onClick={() => setFilter('unassigned')}
              className={cn(
                "flex-1 text-xs font-bold py-1.5 rounded-lg transition-all",
                filter === 'unassigned' ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {t('ib.unassigned')}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => {
            const ConvIcon = CHANNEL_ICONS[conv.channel] || MessageSquare;
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={cn(
                  "w-full p-4 text-left border-b border-slate-50 transition-all hover:bg-slate-50 relative",
                  selectedId === conv.id && "bg-blue-50/50 border-l-4 border-l-blue-600"
                )}
              >
                <div className="flex gap-3">
                  <div className="relative">
                    <img src={conv.avatar} alt={conv.participant} className="w-10 h-10 rounded-full object-cover" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <ConvIcon className="w-2 h-2 text-blue-600 fill-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{conv.participant}</h3>
                      <span className="text-[10px] text-slate-400 font-medium">{conv.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        {conv.participantRole === 'ENTERPRISE GOLD' ? t('data.enterprise_gold') :
                         conv.participantRole === 'VIP CLIENT' ? t('data.vip_client') :
                         conv.participantRole === 'ASSET MANAGEMENT' ? t('data.asset_management') : conv.participantRole}
                      </p>
                      {conv.priority && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {conv.typing ? <span className="italic text-blue-500 font-medium">{t('ib.typing')}</span> : conv.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
          {filteredConversations.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-400">{t('ib.no_conversations')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/50 min-w-0">
        {/* Chat Header */}
        <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={selectedConv.avatar} alt={selectedConv.participant} className="w-8 h-8 rounded-full" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">{selectedConv.participant}</h3>
              <p className="text-[10px] text-slate-500 flex items-center gap-1">
                <span className={cn("w-1.5 h-1.5 rounded-full", selectedConv.status === 'resolved' ? "bg-slate-300" : "bg-emerald-500")}></span>
                {selectedConv.participantRole === 'ENTERPRISE GOLD' ? t('data.enterprise_gold') :
                 selectedConv.participantRole === 'VIP CLIENT' ? t('data.vip_client') :
                 selectedConv.participantRole === 'ASSET MANAGEMENT' ? t('data.asset_management') : selectedConv.participantRole}
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                {selectedConv.status === 'resolved' ? t('ib.resolved_status') : `${t('ib.online_via')} ${selectedConv.channel}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowWebPhone(true)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              title={t('ib.web_phone')}
            >
              <PhoneCall className="w-5 h-5" />
            </button>
            <button 
              onClick={handleEscalate}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              {t('ib.escalate')}
            </button>
            <button 
              onClick={handleMarkResolved}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t('ib.resolve')}
            </button>
            <button 
              onClick={() => setShowContextPanel(!showContextPanel)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all ml-2"
              title={showContextPanel ? t('ib.hide_details') : t('ib.show_details')}
            >
              {showContextPanel ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="flex justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100">{t('ib.today')}</span>
          </div>

          {currentMessages.map((msg) => {
            const MsgIcon = CHANNEL_ICONS[msg.channel] || MessageSquare;
            return (
              <div key={msg.id} className={cn("flex gap-4 max-w-2xl", msg.isAgent ? "ml-auto flex-row-reverse" : "")}>
                {!msg.isAgent ? (
                  <img src={selectedConv.avatar} alt="" className="w-8 h-8 rounded-full self-start mt-1" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white self-start mt-1">CX</div>
                )}
                <div className={cn("space-y-1", msg.isAgent ? "text-right" : "")}>
                  <div className={cn(
                    "p-4 rounded-2xl shadow-sm relative group",
                    msg.isAgent 
                      ? "bg-slate-900 text-white rounded-tr-none shadow-lg" 
                      : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                  )}>
                    <div className={cn(
                      "absolute top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                      msg.isAgent ? "-left-8" : "-right-8"
                    )}>
                      <MsgIcon className="w-3 h-3 text-slate-400" />
                    </div>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 justify-end">
                    {msg.isAgent ? null : <MsgIcon className="w-2.5 h-2.5" />}
                    {msg.timestamp} • {msg.isAgent ? t('ib.agent_name') : `${t('ib.via')} ${msg.channel}`}
                    {msg.isAgent && <MsgIcon className="w-2.5 h-2.5 ml-1" />}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-200 flex-shrink-0">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200/50">
              <div className="relative">
                <button 
                  onClick={() => setShowChannelDropdown(!showChannelDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <ActiveChannelIcon className="w-3.5 h-3.5 text-blue-600" />
                  {activeChannel}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                
                <AnimatePresence>
                  {showChannelDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        {Object.keys(CHANNEL_ICONS).map((ch) => {
                          const Icon = CHANNEL_ICONS[ch];
                          return (
                            <button
                              key={ch}
                              onClick={() => {
                                setActiveChannel(ch);
                                setShowChannelDropdown(false);
                              }}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                                activeChannel === ch ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                              {ch}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('ib.channel_selection')}</span>
            </div>

            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={t('ib.placeholder')}
              className="w-full bg-transparent border-none resize-none text-sm outline-none min-h-[80px]"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-all">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleMicClick}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    isRecording ? "bg-red-100 text-red-600 animate-pulse" : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
                  )}
                  title={t('ib.voice_transcription')}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleAiClick}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    isAiGenerating ? "bg-blue-100 text-blue-600 animate-spin" : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
                  )}
                  title={t('ib.ai_assistant')}
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('ib.send')}
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Context Panel */}
      <AnimatePresence>
        {showContextPanel && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-l border-slate-200 bg-white overflow-hidden flex-shrink-0"
          >
            <div className="w-80 h-full overflow-y-auto">
              <div className="p-8 flex flex-col items-center text-center border-b border-slate-100 relative">
                <button 
                  onClick={() => setShowContextPanel(false)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-3xl bg-orange-100 overflow-hidden border-4 border-white shadow-xl">
                    <img src={selectedConv.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedConv.participant}</h3>
                <p className="text-xs text-slate-500 font-medium mb-4">{t('ib.client_role')}</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">{t('ib.vip_client')}</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">{t('ib.growth')}</span>
                </div>
              </div>

              <div className="p-6 space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t('ib.portfolio_summary')}</h4>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold mb-1">{t('ib.total_value')}</p>
                        <p className="text-lg font-bold text-slate-900">$1,240,000</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 font-bold mb-1">{t('ib.q3_yield')}</p>
                        <p className="text-sm font-bold text-emerald-600">+8.4%</p>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-3/4"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t('ib.recent_history')}</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{t('ib.inbound_call')}</p>
                        <p className="text-[10px] text-slate-500">{t('ib.resolved_by')}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Paperclip className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{t('ib.contract_renewal')}</p>
                        <p className="text-[10px] text-slate-500">{t('ib.signed_digitally')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Web Phone Overlay */}
      <AnimatePresence>
        {showWebPhone && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-72 bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-6 bg-slate-900 text-white text-center relative">
                <button 
                  onClick={() => setShowWebPhone(false)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{t('ib.web_phone')}</h3>
                <div className="mt-4 h-10 flex items-center justify-center">
                  <p className="text-2xl font-bold tracking-tighter">{phoneNumber || t('ib.dial')}</p>
                </div>
              </div>
              
              <div className="p-6 bg-white">
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(num => (
                    <button
                      key={num}
                      onClick={() => handleDial(num)}
                      className="w-full aspect-square rounded-2xl bg-slate-50 text-slate-900 font-bold text-lg hover:bg-slate-100 transition-all active:scale-95"
                    >
                      {num}
                    </button>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setPhoneNumber(prev => prev.slice(0, -1))}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-200 transition-all"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleCall}
                    className="flex-[2] py-4 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <Phone className="w-5 h-5 fill-white" />
                    {t('ib.call')}
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('ib.voip_connected')}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
