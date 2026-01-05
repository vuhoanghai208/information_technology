import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Wifi, Globe, Code2, Database, 
  Sparkles, Check, X, 
  Terminal, Trophy, ArrowRight, Lightbulb, ChevronLeft, LayoutGrid, Home,
  Palette, Keyboard, MessageCircle, Send, Bot, Key, Loader2, Zap, User,
  RefreshCcw, Shuffle, BookOpen, Search, Hash
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- IMPORT DỮ LIỆU CÂU HỎI ---
import { QUESTION_BANK } from './questions';

// --- IMPORT DỮ LIỆU TỪ ĐIỂN (NEW) ---
// Nếu bạn chưa tạo file knowledge_data.js, hãy tạo nó như hướng dẫn ở trên
// Hoặc thay dòng này bằng mảng dữ liệu trực tiếp nếu muốn gộp 1 file
import { KNOWLEDGE_DB } from './knowledge_data';

// ============================================================================
// CẤU HÌNH RAG (GIỮ NGUYÊN)
// ============================================================================
import { PRE_CALCULATED_KNOWLEDGE as VECTOR_DATA } from './knowledge_vectors_min';
let PRE_CALCULATED_KNOWLEDGE = [];
try {
  if (typeof VECTOR_DATA !== 'undefined') {
    PRE_CALCULATED_KNOWLEDGE = VECTOR_DATA;
  }
} catch (e) {}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// COMPONENT MỚI: TỪ ĐIỂN TRA CỨU NHANH (QUICK LOOKUP)
// ============================================================================
const QuickLookupModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  if (!isOpen) return null;

  // Lấy danh sách các category duy nhất
  const categories = ['All', ...new Set(KNOWLEDGE_DB.map(item => item.category))];

  // Lọc dữ liệu
  const filteredData = KNOWLEDGE_DB.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl h-[85vh] bg-[#0a0a1a] border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400"><BookOpen size={24} /></div>
            <h2 className="text-2xl font-bold text-white">Kho Tàng Kiến Thức</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"><X size={24}/></button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar / List (Bên trái) */}
          <div className={cn("w-full md:w-1/3 border-r border-white/10 flex flex-col bg-[#0f172a]/50", selectedItem ? "hidden md:flex" : "flex")}>
            {/* Search & Filter */}
            <div className="p-4 space-y-3 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Tra lệnh, thẻ, khái niệm..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:border-cyan-500 outline-none"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border", 
                      filter === cat ? "bg-cyan-600 border-cyan-500 text-white" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700")}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
              {filteredData.length > 0 ? (
                filteredData.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className={cn("p-3 rounded-xl cursor-pointer transition-all border group hover:border-cyan-500/50", 
                      selectedItem?.id === item.id ? "bg-cyan-500/10 border-cyan-500" : "bg-transparent border-transparent hover:bg-white/5")}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={cn("font-bold font-mono text-sm", selectedItem?.id === item.id ? "text-cyan-400" : "text-slate-200 group-hover:text-cyan-300")}>{item.term}</span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">{item.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{item.desc}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500 text-sm">Không tìm thấy kết quả nào.</div>
              )}
            </div>
          </div>

          {/* Detail View (Bên phải) */}
          <div className={cn("flex-1 bg-[#050511] p-6 md:p-10 flex-col overflow-y-auto", selectedItem ? "flex" : "hidden md:flex items-center justify-center")}>
            {selectedItem ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <button onClick={() => setSelectedItem(null)} className="md:hidden mb-4 flex items-center gap-2 text-slate-400 hover:text-white text-sm"><ChevronLeft size={16}/> Quay lại</button>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-lg bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase tracking-widest">{selectedItem.category}</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 mb-6 font-mono">{selectedItem.term}</h1>
                
                <div className="bg-[#1e293b]/50 border border-white/10 rounded-2xl p-6 mb-6">
                  <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2"><Lightbulb size={16} className="text-yellow-400"/> Định nghĩa dễ hiểu</h3>
                  <p className="text-lg text-slate-200 leading-relaxed whitespace-pre-line">{selectedItem.desc}</p>
                </div>

                {selectedItem.code && (
                  <div className="relative group">
                     <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                     <div className="relative bg-[#020617] rounded-xl border border-slate-700 p-5 font-mono text-sm md:text-base overflow-x-auto">
                        <div className="flex gap-1.5 absolute top-3 right-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                        </div>
                        <code className="text-green-400">{selectedItem.code}</code>
                     </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center opacity-30">
                <BookOpen size={80} className="mx-auto mb-4 text-slate-500"/>
                <p className="text-xl font-bold">Chọn một mục để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================================
// GAME LOGIC COMPONENTS (MATCHING & PREDICT) - GIỮ NGUYÊN
// ============================================================================
// (Phần này giữ nguyên như code cũ của bạn, không cần thay đổi)
const MatchingGame = ({ question, onComplete }) => {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({}); 
  const [wrongPair, setWrongPair] = useState(null);

  useEffect(() => {
    const lefts = question.pairs.map(p => ({ id: p.id, text: p.left })).sort(() => Math.random() - 0.5);
    const rights = question.pairs.map(p => ({ id: p.id, text: p.right })).sort(() => Math.random() - 0.5);
    setLeftItems(lefts);
    setRightItems(rights);
    setMatches({});
    setSelectedLeft(null);
  }, [question]);

  const handleLeftClick = (id) => {
    if (matches[id]) return; 
    setSelectedLeft(id);
    setWrongPair(null);
  };

  const handleRightClick = (id) => {
    if (!selectedLeft) return;
    if (selectedLeft === id) {
      const newMatches = { ...matches, [selectedLeft]: id };
      setMatches(newMatches);
      setSelectedLeft(null);
      if (Object.keys(newMatches).length === question.pairs.length) setTimeout(() => onComplete(true), 500); 
    } else {
      setWrongPair({ left: selectedLeft, right: id });
      setTimeout(() => { setWrongPair(null); setSelectedLeft(null); }, 800);
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-2 gap-4 md:gap-8 relative">
         <div className="space-y-3">
            {leftItems.map(item => {
              const isMatched = matches[item.id] !== undefined;
              const isSelected = selectedLeft === item.id;
              const isWrong = wrongPair?.left === item.id;
              return (
                <button key={item.id} onClick={() => handleLeftClick(item.id)} disabled={isMatched}
                  className={cn("w-full p-4 rounded-xl text-left font-medium transition-all duration-300 border-2 relative text-sm md:text-base",
                    isMatched ? "bg-green-500/10 border-green-500 text-green-400 opacity-50" : 
                    isWrong ? "bg-red-500/20 border-red-500 animate-shake" :
                    isSelected ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105 z-10" : 
                    "bg-[#1e293b] border-slate-700 hover:border-slate-500"
                  )}>
                  {item.text}
                </button>
              )
            })}
         </div>
         <div className="space-y-3">
            {rightItems.map(item => {
              const isMatched = Object.values(matches).includes(item.id);
              const isWrong = wrongPair?.right === item.id;
              return (
                <button key={item.id} onClick={() => handleRightClick(item.id)} disabled={isMatched}
                  className={cn("w-full p-4 rounded-xl text-right font-medium transition-all duration-300 border-2 text-sm md:text-base",
                    isMatched ? "bg-green-500/10 border-green-500 text-green-400 opacity-50" : 
                    isWrong ? "bg-red-500/20 border-red-500 animate-shake" :
                    "bg-[#1e293b] border-slate-700 hover:border-slate-500"
                  )}>
                  {item.text}
                </button>
              )
            })}
         </div>
      </div>
      <p className="text-center text-slate-500 text-xs mt-6 uppercase tracking-widest">Chọn 1 ô trái - Ghép với 1 ô phải</p>
    </div>
  );
};

const PredictGame = ({ question, onComplete }) => {
  const [step, setStep] = useState(1);
  const [userPredict, setUserPredict] = useState('');
  const [userReason, setUserReason] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && userPredict.trim()) setStep(2);
    else if (step === 2 && userReason.trim()) setStep(3);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in">
      <div className="bg-[#0d1117] p-5 rounded-2xl border border-slate-700 font-mono text-sm md:text-base text-green-400 mb-6 shadow-xl overflow-x-auto relative group">
         <div className="absolute top-2 right-2 flex gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
         <pre>{question.codeSnippet}</pre>
      </div>
      <form onSubmit={handleNext} className="space-y-6">
        <div className={cn("transition-all duration-500", step > 1 ? "opacity-50 pointer-events-none grayscale" : "")}>
          <label className="block text-cyan-400 text-sm font-bold uppercase mb-2">1. Dự đoán kết quả (Output):</label>
          <input type="text" value={userPredict} onChange={e => setUserPredict(e.target.value)} disabled={step > 1} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl p-4 text-white focus:border-cyan-500 outline-none font-mono" placeholder="Ví dụ: 10, Error, True..." />
        </div>
        {step >= 2 && (
           <div className={cn("animate-in slide-in-from-bottom-4 fade-in duration-500", step > 2 ? "opacity-50 pointer-events-none grayscale" : "")}>
             <label className="block text-yellow-400 text-sm font-bold uppercase mb-2">2. Tại sao bạn nghĩ vậy?</label>
             <textarea value={userReason} onChange={e => setUserReason(e.target.value)} disabled={step > 2} className="w-full bg-[#1e293b] border border-slate-600 rounded-xl p-4 text-white focus:border-yellow-500 outline-none min-h-[80px]" placeholder="Giải thích ngắn gọn..." />
           </div>
        )}
        {step === 3 && (
           <div className="animate-in zoom-in-95 fade-in duration-500 bg-green-500/10 border border-green-500/30 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-green-400 font-bold uppercase mb-2"><Check size={20} /> Đáp án chính xác:</div>
              <div className="text-2xl font-black text-white font-mono mb-4">{question.a}</div>
              <div className="text-slate-300 text-sm border-t border-white/10 pt-3"><span className="text-cyan-400 font-bold">Giải thích: </span> {question.e}</div>
              <button type="button" onClick={() => onComplete(true)} className="w-full mt-4 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all">Tiếp tục <ArrowRight size={16} className="inline"/></button>
           </div>
        )}
        {step < 3 && <button type="submit" className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-white shadow-lg hover:scale-[1.02] transition-all">{step === 1 ? "Xác nhận dự đoán" : "Xem kết quả"}</button>}
      </form>
    </div>
  );
};

// ============================================================================
// AI CHAT COMPONENT (GIỮ NGUYÊN)
// ============================================================================
const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Xin chào! Tôi là AI Tutor.\n\nTôi có thể giúp bạn:\n- Giải thích thuật ngữ IT\n- Phân tích code\n- Ôn tập kiến thức\n\nBạn cần hỏi gì không?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeySet, setIsKeySet] = useState(false);
  const messagesEndRef = useRef(null);
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSetKey = (e) => { e.preventDefault(); if (apiKey.trim().length > 10) { setIsKeySet(true); setMessages(prev => [...prev, { role: 'assistant', content: '✅ Đã kết nối OpenAI! Sẵn sàng hỗ trợ.' }]); }};
  const renderContent = (text) => text.split('\n').map((line, i) => { if (line.trim().startsWith('-') || line.trim().startsWith('•')) { return ( <div key={i} className="flex gap-2 ml-1 mb-1"><span className="text-cyan-400 font-bold">•</span><span>{line.substring(1).trim()}</span></div> ); } if (!line.trim()) return <div key={i} className="h-3"></div>; return <p key={i} className="mb-1 leading-relaxed">{line}</p>; });

  const handleSend = async (e) => {
    e.preventDefault(); if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', content: input }; setMessages(prev => [...prev, userMsg]); setInput(''); setIsLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` }, body: JSON.stringify({ model: "gpt-3.5-turbo", messages: [{ role: "system", content: "Bạn là trợ lý IT Tutor. Trình bày ngắn gọn, dễ hiểu." }, ...messages.slice(-4), userMsg] }) });
      const data = await response.json(); if (data.error) throw new Error(data.error.message); setMessages(prev => [...prev, data.choices[0].message]);
    } catch (error) { setMessages(prev => [...prev, { role: 'assistant', content: `Lỗi: ${error.message}` }]); } finally { setIsLoading(false); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-auto font-sans">
      {isOpen && (
        <div className="w-[90vw] md:w-[400px] h-[600px] bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 ring-1 ring-white/10">
          <div className="p-4 border-b border-white/5 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-3"><Bot size={24} className="text-cyan-400" /><div><span className="font-bold text-slate-100 block text-sm">AI Mentor</span><span className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">Online</span></div></div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((msg, idx) => ( <div key={idx} className={cn("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}> <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg mt-1", msg.role === 'user' ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-cyan-500 to-teal-600")}> {msg.role === 'user' ? <User size={14} className="text-white"/> : <Zap size={14} className="text-white fill-white"/>} </div> <div className={cn("px-4 py-3 rounded-2xl text-[15px] max-w-[85%] shadow-md", msg.role === 'user' ? "bg-blue-600 text-white rounded-tr-sm" : "bg-[#1e293b] text-slate-200 border border-slate-700/50 rounded-tl-sm")}> {msg.role === 'assistant' ? renderContent(msg.content) : msg.content} </div> </div> ))}
            {isLoading && (<div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-cyan-600/20 flex items-center justify-center shrink-0"><Loader2 size={14} className="animate-spin text-cyan-400"/></div><div className="text-xs text-slate-400 flex items-center h-8">AI đang suy nghĩ...</div></div>)}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-[#020617]/40 border-t border-white/5 backdrop-blur-md">
            {!isKeySet ? ( <form onSubmit={handleSetKey} className="flex gap-2"><div className="relative flex-1"><Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Nhập API Key..." className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-3 pl-9 pr-4 text-sm text-white focus:border-cyan-500 outline-none" /></div><button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 rounded-xl font-bold text-sm">Lưu</button></form> ) : ( <form onSubmit={handleSend} className="flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Hỏi gì đó..." className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" /><button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-xl"><Send size={18} /></button></form> )}
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-110 transition-all active:scale-95 group z-50 border border-white/10">
        {isOpen ? <X size={28} className="text-white"/> : <MessageCircle size={28} className="text-white group-hover:animate-bounce"/>}
      </button>
    </div>
  );
};

// ============================================================================
// MAIN GAME COMPONENT
// ============================================================================
const TOPICS = [
  { id: 'all', title: "TỔNG HỢP KIẾN THỨC", icon: <Sparkles size={40} />, color: "from-cyan-400 to-blue-600", border: "group-hover:border-cyan-400" },
  { id: 'color', title: "MÀU SẮC (FULL 16 MÀU)", icon: <Palette size={32} />, color: "from-fuchsia-500 to-purple-600", border: "group-hover:border-fuchsia-400" },
  { id: 'html', title: "HTML & CSS", icon: <Globe size={32} />, color: "from-orange-400 to-red-500", border: "group-hover:border-orange-400" },
  { id: 'ai', title: "Trí tuệ nhân tạo", icon: <Brain size={32} />, color: "from-pink-500 to-rose-500", border: "group-hover:border-pink-400" },
  { id: 'network', title: "Mạng máy tính", icon: <Wifi size={32} />, color: "from-emerald-400 to-cyan-500", border: "group-hover:border-emerald-400" },
  { id: 'python', title: "Lập trình Python", icon: <Code2 size={32} />, color: "from-blue-500 to-indigo-600", border: "group-hover:border-blue-400" },
  { id: 'sql', title: "Cơ sở dữ liệu", icon: <Database size={32} />, color: "from-violet-500 to-purple-600", border: "group-hover:border-violet-400" },
];

const ITQuizGame = () => {
  const [mode, setMode] = useState('menu');
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  
  // STATE CHO TỪ ĐIỂN
  const [showDictionary, setShowDictionary] = useState(false);

  const startExam = (topic) => {
    let questions = [];
    if (topic.id === 'all') {
      questions = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
    } else {
      questions = QUESTION_BANK.filter(q => q.subject === topic.id);
    }
    if (questions.length === 0) { alert("Chủ đề này chưa có câu hỏi!"); return; }
    const preparedQuestions = questions.map(q => {
      if (['text', 'match', 'predict'].includes(q.type)) return q; 
      return { ...q, options: [...(q.o || []), q.a].sort(() => Math.random() - 0.5) };
    });
    setShowGrid(false); setActiveQuestions(preparedQuestions); setCurrentQIndex(0); setScore(0); setIsAnswered(false); setSelectedOpt(null); setUserInput(''); setMode('playing');
  };

  const handleNextQuestion = () => { if (currentQIndex < activeQuestions.length - 1) { setCurrentQIndex(prev => prev + 1); setIsAnswered(false); setSelectedOpt(null); setUserInput(''); } else { setMode('result'); }};
  const handleSpecialComplete = (isCorrect) => { if (isCorrect) setScore(s => s + 20); if (activeQuestions[currentQIndex].type === 'match') { setTimeout(handleNextQuestion, 1500); } else { handleNextQuestion(); }};
  const handleOptionSelect = (opt) => { if (isAnswered) return; setIsAnswered(true); setSelectedOpt(opt); if (opt === activeQuestions[currentQIndex].a) setScore(s => s + 10); };
  const handleSubmitText = (e) => { e.preventDefault(); if (isAnswered || !userInput.trim()) return; setIsAnswered(true); const correctAns = activeQuestions[currentQIndex].a; if (userInput.trim().toLowerCase() === correctAns.toLowerCase()) { setScore(s => s + 10); setSelectedOpt('correct'); } else { setSelectedOpt('wrong'); }};

  const currentQ = activeQuestions[currentQIndex];

  return (
    <div className="relative min-h-screen w-full bg-[#050511] text-white font-sans overflow-x-hidden flex flex-col items-center selection:bg-cyan-500/30">
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-500 blur-[120px] opacity-15 animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600 blur-[120px] opacity-15 animate-blob animation-delay-2000"></div>
      </div>

      <header className="relative z-20 w-full px-6 py-6 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-sm sticky top-0">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setMode('menu')}>
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20"><Terminal size={24} className="text-white" /></div>
          <h1 className="hidden md:block text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500 tracking-tight">IT QUIZ PRO</h1>
        </div>
        <div className="flex gap-4">
            {mode === 'playing' && <button onClick={() => setMode('menu')} className="flex gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold text-sm transition-all hover:scale-105"><ChevronLeft size={18}/> Menu</button>}
            <button onClick={() => setShowGrid(true)} className="p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"><LayoutGrid size={24} /></button>
        </div>
      </header>

      {/* Grid Menu Overlay */}
      {showGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in" onClick={() => setShowGrid(false)}></div>
            <div className="relative z-10 w-full max-w-5xl bg-[#0a0a1a] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 overflow-y-auto max-h-[90vh]">
                <button onClick={() => setShowGrid(false)} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400"><X size={24} /></button>
                <h2 className="text-3xl font-black mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">Chọn chủ đề</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TOPICS.map((topic) => (
                        <div key={topic.id} onClick={() => startExam(topic)} className="group relative aspect-square rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:border-white/20">
                            <div className="mb-3 w-12 h-12 rounded-xl flex items-center justify-center bg-black/30 shadow-inner text-cyan-400">{topic.icon}</div>
                            <span className="text-sm font-bold text-center text-slate-300 group-hover:text-white">{topic.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* QUICK LOOKUP MODAL (DICTIONARY) */}
      <QuickLookupModal isOpen={showDictionary} onClose={() => setShowDictionary(false)} />

      <main className="relative z-10 w-full flex-1 flex flex-col justify-center py-8">
        {mode === 'menu' && (
          <div className="w-full flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="text-center px-4">
                <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">V 3.0 Ultimate</div>
                <h2 className="text-4xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">Dòng chảy Tri thức</h2>
                <p className="text-slate-400 text-lg uppercase tracking-[0.3em] font-bold">Master Your Code</p>
            </div>
            <div className="relative w-full py-10 group/track overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#050511] to-transparent z-10"></div>
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#050511] to-transparent z-10"></div>
                <div className="flex w-max gap-6 animate-scroll group-hover/track:pause px-8">
                    {[...TOPICS, ...TOPICS].map((topic, index) => (
                        <div key={`${topic.id}-${index}`} onClick={() => startExam(topic)} className={cn("relative w-72 h-80 shrink-0 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md p-8 cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl group overflow-hidden flex flex-col justify-between", topic.border)}>
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br", topic.color)}></div>
                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-white/5 shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-500 z-10", topic.color.replace('from-', 'bg-'))}>{topic.icon}</div>
                            <div className="relative z-10 mt-auto">
                                <h3 className="text-2xl font-bold leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all">{topic.title}</h3>
                                <div className="h-1 w-0 bg-cyan-400 mt-4 group-hover:w-16 transition-all duration-500 ease-out rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {mode === 'playing' && currentQ && (
          <div className="w-full max-w-4xl mx-auto animate-in zoom-in-95 px-4 duration-500">
            <div className="bg-[#0f172a]/40 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" style={{width: `${((currentQIndex + 1) / activeQuestions.length) * 100}%`}}></div>
              <div className="mb-8 flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
                <span className="text-cyan-400 flex items-center gap-2">Câu {currentQIndex + 1} / {activeQuestions.length}</span>
                <span className="flex items-center gap-2 text-yellow-400"><Trophy size={16}/> {score} XP</span>
              </div>
              {currentQ.colorCode && ( <div className="flex justify-center my-6"><div className="w-28 h-28 rounded-full border-4 border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]" style={{ backgroundColor: currentQ.colorCode }}></div></div> )}
              <h3 className="text-2xl md:text-3xl font-black mb-10 text-center leading-snug drop-shadow-lg">{currentQ.q}</h3>
              {currentQ.type === 'match' ? ( <MatchingGame question={currentQ} onComplete={handleSpecialComplete} /> ) : currentQ.type === 'predict' ? ( <PredictGame question={currentQ} onComplete={handleNextQuestion} /> ) : currentQ.type === 'text' ? (
                <form onSubmit={handleSubmitText} className="w-full max-w-lg mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="relative group">
                        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} disabled={isAnswered} placeholder="Nhập đáp án..." className={cn("relative w-full bg-[#020617] border-2 rounded-2xl p-5 pl-12 text-xl font-bold outline-none text-center transition-all", isAnswered ? (selectedOpt === 'correct' ? "border-green-500 text-green-400" : "border-red-500 text-red-400") : "border-white/10 focus:border-cyan-500 text-white")} autoFocus />
                        <Keyboard className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={24}/>
                    </div>
                    {!isAnswered && <button type="submit" className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all">Kiểm tra</button>}
                </form>
              ) : (
                <div className={cn("grid gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4", currentQ.type === 'tf' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
                    {currentQ.options.map((opt, i) => {
                        const isSelected = opt === selectedOpt; const isCorrect = opt === currentQ.a;
                        let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30";
                        if (isAnswered) { if (isCorrect) btnClass = "bg-green-500/20 border-green-500 text-green-300 ring-1 ring-green-500/50"; else if (isSelected) btnClass = "bg-red-500/20 border-red-500 text-red-300 ring-1 ring-red-500/50"; else btnClass = "bg-white/5 opacity-30 blur-[1px]"; }
                        return ( <button key={i} disabled={isAnswered} onClick={() => handleOptionSelect(opt)} className={cn("w-full p-6 rounded-2xl border text-left text-lg font-bold transition-all flex justify-between items-center group relative overflow-hidden", btnClass)}> <span className="relative z-10">{opt}</span> {isAnswered && isCorrect && <Check size={28} className="text-green-400 relative z-10 animate-bounce" />} {isAnswered && isSelected && !isCorrect && <X size={28} className="text-red-400 relative z-10" />} </button> );
                    })}
                </div>
              )}
              {isAnswered && !['match', 'predict'].includes(currentQ.type) && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={cn("mb-8 p-6 rounded-2xl border relative overflow-hidden", selectedOpt === 'correct' || (currentQ.type !== 'text' && selectedOpt === currentQ.a) ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30")}>
                    <div className="flex items-center gap-2 mb-3 font-bold uppercase text-xs tracking-wider opacity-90"><Lightbulb size={16} /> Giải thích chi tiết</div>
                    <p className="text-slate-200 text-lg leading-relaxed">{currentQ.e}</p>
                  </div>
                  <button onClick={handleNextQuestion} className="w-full py-5 bg-white text-black rounded-2xl font-black text-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)]">{currentQIndex < activeQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'} <ArrowRight size={24} /></button>
                </div>
              )}
            </div>
          </div>
        )}

        {mode === 'result' && (
          <div className="text-center animate-in zoom-in-90 max-w-2xl w-full mx-auto px-4">
            <div className="bg-[#0f172a]/60 border border-white/10 p-16 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              <Trophy size={120} className="mx-auto text-yellow-400 mb-8 drop-shadow-[0_0_35px_rgba(250,204,21,0.6)] animate-bounce" />
              <h2 className="text-5xl font-black mb-4 text-white">Hoàn thành!</h2>
              <div className="text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400 mb-8 leading-none tracking-tighter drop-shadow-2xl">{score}</div>
              <button onClick={() => {setMode('menu');}} className="w-full py-6 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all text-xl flex items-center justify-center gap-3 shadow-xl"><Home size={28} /> Quay lại Menu</button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER BUTTONS: CHAT & DICTIONARY */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
         {/* Dictionary Toggle Button */}
         <button onClick={() => setShowDictionary(!showDictionary)} className="w-14 h-14 rounded-full bg-[#1e293b] border border-white/10 flex items-center justify-center shadow-lg hover:bg-cyan-900/50 hover:border-cyan-500/50 transition-all hover:scale-110 group">
            <BookOpen size={24} className="text-cyan-400 group-hover:text-white" />
         </button>
         
         {/* AI Chat (Component đã có) */}
         <AIChat />
      </div>

      <style>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-scroll { animation: scroll 60s linear infinite; }
        .animate-blob { animation: blob 10s infinite; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ITQuizGame;
