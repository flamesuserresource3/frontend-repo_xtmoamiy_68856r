import { useState } from 'react';
import { Upload, Dog, User } from 'lucide-react';

export default function ProfileSetup({ onSubmit }) {
  const [form, setForm] = useState({ owner: '', dogName: '', sex: 'Male', breed: '', bio: '' });

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <section className="max-w-3xl mx-auto p-4">
      <div className="rounded-3xl bg-white shadow-xl p-6 border border-rose-100">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Dog className="text-rose-500" /> Create your pup profile
        </h2>
        <p className="text-gray-500 mt-1">Tell others about your lovely dog and what you’re looking for.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600 flex items-center gap-2"><User size={16}/>Owner name</label>
            <input value={form.owner} onChange={(e)=>update('owner', e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-rose-400" placeholder="Your name" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Dog name</label>
            <input value={form.dogName} onChange={(e)=>update('dogName', e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-rose-400" placeholder="Bella" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Sex</label>
            <select value={form.sex} onChange={(e)=>update('sex', e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-rose-400">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Breed</label>
            <input value={form.breed} onChange={(e)=>update('breed', e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-rose-400" placeholder="Husky" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">Bio</label>
            <textarea value={form.bio} onChange={(e)=>update('bio', e.target.value)} rows={3} className="mt-1 w-full px-3 py-2 rounded-xl border focus:ring-2 focus:ring-rose-400" placeholder="Friendly and well-trained..." />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">Photos</label>
            <div className="mt-1 flex items-center justify-between gap-3 p-3 border rounded-xl">
              <p className="text-gray-500 text-sm">Drag & drop or click to upload (coming soon)</p>
              <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200"><Upload size={16}/>Upload</button>
            </div>
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-tr from-rose-500 to-fuchsia-500 text-white shadow">Save profile</button>
          </div>
        </form>
      </div>
    </section>
  );
}
