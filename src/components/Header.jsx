import { Heart, PawPrint, MessageCircle } from 'lucide-react';

export default function Header({ matchesCount = 0, onOpenAnyChat }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/60 border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-rose-500 to-fuchsia-500 grid place-items-center text-white shadow-lg">
            <PawPrint size={18} />
          </div>
          <div className="leading-tight">
            <p className="text-sm text-rose-600 font-semibold tracking-wide">PawMatch</p>
            <h1 className="text-lg font-bold text-gray-800">Find the perfect partner for your pup</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAnyChat}
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">Chats</span>
            {matchesCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 rounded-full bg-rose-500 text-white text-xs grid place-items-center">
                {matchesCount}
              </span>
            )}
          </button>
          <div className="hidden sm:flex items-center gap-2 text-rose-600">
            <Heart size={18} />
            <span className="text-sm font-medium">Romance for doggos</span>
          </div>
        </div>
      </div>
    </header>
  );
}
