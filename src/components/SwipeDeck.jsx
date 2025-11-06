import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Heart } from 'lucide-react';

const sampleDogs = [
  {
    id: '1',
    name: 'Bella',
    age: 3,
    sex: 'Female',
    breed: 'Golden Retriever',
    distance: 3,
    bio: 'Sunset walks, tennis balls, and gentle cuddles.',
    photos: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2070&auto=format&fit=crop',
    ],
  },
  {
    id: '2',
    name: 'Max',
    age: 4,
    sex: 'Male',
    breed: 'Siberian Husky',
    distance: 6,
    bio: 'Adventure partner with a fluffy coat and big heart.',
    photos: [
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=2069&auto=format&fit=crop',
    ],
  },
  {
    id: '3',
    name: 'Luna',
    age: 2,
    sex: 'Female',
    breed: 'Border Collie',
    distance: 2,
    bio: 'Agility queen looking for a charming gentleman.',
    photos: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2070&auto=format&fit=crop',
    ],
  },
];

function Card({ dog, index, onSwipe }) {
  const ref = useRef(null);
  const [drag, setDrag] = useState({ x: 0, y: 0, rot: 0, swiped: false });
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onPointerDown(e) {
      if (drag.swiped) return;
      el.setPointerCapture(e.pointerId);
      startPos.current = { x: e.clientX, y: e.clientY };
    }
    function onPointerMove(e) {
      if (!el.hasPointerCapture(e.pointerId) || drag.swiped) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      const rot = dx / 15;
      setDrag({ x: dx, y: dy, rot, swiped: false });
    }
    function onPointerUp(e) {
      if (!el.hasPointerCapture(e.pointerId) || drag.swiped) return;
      el.releasePointerCapture(e.pointerId);
      const threshold = 120;
      if (drag.x > threshold) {
        setDrag((d) => ({ ...d, swiped: true }));
        onSwipe('right', dog);
      } else if (drag.x < -threshold) {
        setDrag((d) => ({ ...d, swiped: true }));
        onSwipe('left', dog);
      } else {
        setDrag({ x: 0, y: 0, rot: 0, swiped: false });
      }
    }

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
    };
  }, [drag.swiped, dog, onSwipe]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.rot}deg)`,
      }}
      className="absolute inset-0 select-none cursor-grab active:cursor-grabbing"
    >
      <div className="h-full w-full rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={dog.photos[0]}
          alt={dog.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 to-transparent text-white">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-2xl font-semibold">
                {dog.name}, {dog.age}
              </h3>
              <p className="text-sm opacity-90">
                {dog.sex} • {dog.breed} • {dog.distance} km away
              </p>
              <p className="mt-2 text-sm opacity-95 max-w-md">{dog.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-center gap-6">
        <button
          onClick={() => onSwipe('left', dog)}
          className="h-14 w-14 rounded-full bg-white text-rose-500 grid place-items-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Nope"
        >
          <X size={24} />
        </button>
        <button
          onClick={() => onSwipe('right', dog)}
          className="h-16 w-16 rounded-full bg-gradient-to-tr from-rose-500 to-fuchsia-500 text-white grid place-items-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Like"
        >
          <Heart size={26} />
        </button>
      </div>
    </div>
  );
}

export default function SwipeDeck({ onMatch }) {
  const [deck, setDeck] = useState(sampleDogs);
  const topDog = deck[0];

  const handleSwipe = (dir, dog) => {
    // For demo: any right swipe triggers a match randomly 50%
    const isMatch = dir === 'right' && Math.random() > 0.5;
    setDeck((d) => d.filter((c) => c.id !== dog.id));
    if (isMatch) onMatch(dog);
  };

  if (!topDog) {
    return (
      <div className="h-[70vh] grid place-items-center">
        <div className="text-center">
          <p className="text-rose-600 font-semibold">You’re all caught up</p>
          <p className="text-gray-600">Check back later for more adorable pups near you.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] max-w-md mx-auto">
      {deck
        .slice(0, 3)
        .reverse()
        .map((dog, i) => (
          <div
            key={dog.id}
            className={`absolute inset-0 ${i !== 2 ? 'scale-95 translate-y-3 opacity-70' : ''}`}
          >
            <Card dog={dog} index={i} onSwipe={handleSwipe} />
          </div>
        ))}
    </div>
  );
}
