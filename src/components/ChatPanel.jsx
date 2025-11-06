import { useEffect, useRef } from 'react';
import { Send, PawPrint } from 'lucide-react';

export default function ChatPanel({ open, onClose, messages, onSend, activeDog }) {
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const value = inputRef.current?.value?.trim();
    if (!value) return;
    onSend(value);
    inputRef.current.value = '';
  }

  return (
    <div className="fixed inset-0 z-30 bg-black/30 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-rose-500 to-fuchsia-500 grid place-items-center text-white">
              <PawPrint size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Chat with</p>
              <h3 className="font-semibold text-gray-800">{activeDog?.name || 'New Match'}</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-rose-50/40">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-8">
              Break the ice with a friendly hello!
            </div>
          )}
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-3 py-2 rounded-2xl max-w-[75%] ${
                m.me ? 'bg-rose-500 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm border'
              }`}>
                <p className="text-sm">{m.text}</p>
                <p className="text-[10px] opacity-70 mt-1">{new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-3 border-t bg-white">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-tr from-rose-500 to-fuchsia-500 text-white shadow hover:opacity-95"
            >
              <Send size={18} />
              <span className="text-sm font-medium">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
