// src/app/dashboard/client/page.tsx
'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

export default function ClientDashboard() {
const [specialization, setSpecialization] = useState('');
const [experts, setExperts] = useState<any[]>([]);

const handleMatch = async () => {
const { data, error } = await supabase
.rpc('find_matching_technicians', { target_specialization: specialization });

if (error) console.error(error);
else setExperts(data || []);
};

return (
<div className="min-h-screen bg-[#020617] text-white p-8">
<h1 className="text-3xl font-bold mb-8">Find Expert Support</h1>

<div className="flex gap-4 mb-8">
<input
placeholder="Enter Machine Specialization (e.g. CNC)"
className="bg-slate-900 border border-slate-700 p-3 rounded-lg flex-1"
onChange={(e) => setSpecialization(e.target.value)}
/>
<button onClick={handleMatch} className="bg-blue-600 px-6 py-3 rounded-lg font-bold">
Search Experts
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{experts.map((expert) => (
<div key={expert.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-700">
<h3 className="font-bold text-lg">{expert.full_name}</h3>
<p className="text-slate-400 text-sm mb-4">{expert.specialization}</p>
<button className="text-blue-400 font-semibold underline">Connect via Video</button>
</div>
))}
</div>
</div>
);
}
