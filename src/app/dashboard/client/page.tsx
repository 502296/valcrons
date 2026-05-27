'use client';
import { useState } from 'react';
// استخدام مسار نسبي مضمون للوصول إلى مجلد lib
import { supabase } from '../../../lib/supabase';

export default function ClientDashboard() {
const [specialization, setSpecialization] = useState('');
const [experts, setExperts] = useState<any[]>([]);

const handleMatch = async () => {
try {
const { data, error } = await supabase
.rpc('find_matching_technicians', { target_specialization: specialization });

if (error) {
console.error("Error fetching data:", error);
} else {
setExperts(data || []);
}
} catch (err) {
console.error("Unexpected error:", err);
}
};

return (
<div className="min-h-screen bg-industrial-charcoal text-white p-12">
<h1 className="text-4xl font-bold mb-8 text-white">Find Expert Support</h1>

<div className="flex gap-4 mb-10">
<input
className="bg-industrial-slate p-3 rounded border border-gray-700 w-full focus:border-industrial-blue outline-none text-white"
placeholder="Enter Machine Specialization (e.g. CNC)"
value={specialization}
onChange={(e) => setSpecialization(e.target.value)}
/>
<button
onClick={handleMatch}
className="bg-industrial-blue px-6 py-3 rounded font-bold hover:opacity-90 transition"
>
Search
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{experts.map((expert, idx) => (
<div key={idx} className="p-6 bg-industrial-slate rounded-lg border border-gray-700">
<h3 className="text-xl font-bold">{expert.name}</h3>
<p className="text-gray-400">{expert.specialization}</p>
</div>
))}
</div>
</div>
);
}
