import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SwipeDeck from './components/SwipeDeck.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import ProfileSetup from './components/ProfileSetup.jsx';

function App() {
  const [matches, setMatches] = useState([]);
  const [activeChat, setActiveChat] = useState({ open: false, dog: null });
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);

  const romanticBg = useMemo(
    () => (
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-rose-200/40 blur-2xl" />
        <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-fuchsia-200/40 blur-2xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-rose-300/30 blur-2xl" />
      </div>
    ),
    []
  );

  function handleMatch(dog) {
    setMatches((m) => {
      if (m.find((d) => d.id === dog.id)) return m;
      return [...m, dog];
    });
    // open chat immediately with the match
    setActiveChat({ open: true, dog });
    setMessages((msgs) => [
      ...msgs,
      { me: false, text: `You matched with ${dog.name}! Say hi 👋`, time: Date.now() },
    ]);
  }

  function handleSend(text) {
    setMessages((msgs) => [...msgs, { me: true, text, time: Date.now() }]);
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      {romanticBg}
      <Header
        matchesCount={matches.length}
        onOpenAnyChat={() => setActiveChat({ open: true, dog: matches[0] || null })}
      />

      <main className="max-w-6xl mx-auto px-4">
        <section className="py-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
            Love is in the air
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800">
            Swipe. Match. Chat. Plan the perfect date for your dog.
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Inspired by modern dating apps, designed for responsible dog owners looking
            to find the ideal partner for their pups.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-10 items-start pb-20">
          <div>
            <div className="rounded-3xl p-4 bg-white shadow-xl border border-rose-100">
              <SwipeDeck onMatch={handleMatch} />
            </div>
            <p className="mt-3 text-center text-sm text-gray-500">
              Swipe right to like. If they like you back, a chat opens so owners can coordinate details.
            </p>
          </div>

          <div>
            <ProfileSetup onSubmit={setProfile} />
            {profile && (
              <div className="mt-4 rounded-2xl bg-white border border-rose-100 p-4 text-sm text-gray-600">
                <p className="font-semibold text-gray-800">Your profile</p>
                <p className="mt-1">Owner: {profile.owner || '—'}</p>
                <p>Dog: {profile.dogName || '—'} • {profile.sex} • {profile.breed || '—'}</p>
                <p className="mt-1 line-clamp-3">{profile.bio}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <ChatPanel
        open={activeChat.open}
        activeDog={activeChat.dog}
        messages={messages}
        onSend={handleSend}
        onClose={() => setActiveChat((c) => ({ ...c, open: false }))}
      />

      <footer className="py-10 text-center text-sm text-gray-500">
        Crafted with love for responsible dog matchmaking.
      </footer>
    </div>
  );
}

export default App;
