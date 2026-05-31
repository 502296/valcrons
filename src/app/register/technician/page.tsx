// src/app/register/technician/page.tsx
'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Use your own project credentials from Supabase dashboard)
const supabase = createClient('https://gethyhjzqyblovtoodhw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdldGh5aGp6cXlibG92dG9vZGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0OTA4MzksImV4cCI6MjA5NTA2NjgzOX0.18v7Gi18FrvSXUz_Ot6cSor8MIGbm0-WCAJ6f7ILONU');

export default function TechnicianRegistration() {
const [formData, setFormData] = useState({
fullName: '',
specialization: '',
experience: '',
});

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();

const { data, error } = await supabase
.from('technicians')
.insert([
{
full_name: formData.fullName,
specialization: formData.specialization,
experience_years: parseInt(formData.experience)
},
]);

if (error) {
alert('Error saving profile: ' + error.message);
} else {
alert('Profile created successfully!');
}
};

return (
<div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
<div className="max-w-xl w-full bg-slate-900 p-8 rounded-2xl border border-slate-800">
<h1 className="text-2xl font-bold mb-6">Technician Profile Setup</h1>
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="block text-sm text-slate-400 mb-1">Full Name</label>
<input
type="text"
className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
onChange={(e) => setFormData({...formData, fullName: e.target.value})}
required
/>
</div>
<div>
<label className="block text-sm text-slate-400 mb-1">Specialization</label>
<input
type="text"
placeholder="e.g., CNC, PLC, Hydraulic Systems"
className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
onChange={(e) => setFormData({...formData, specialization: e.target.value})}
required
/>
</div>
<div>
<label className="block text-sm text-slate-400 mb-1">Years of Experience</label>
<input
type="number"
className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
onChange={(e) => setFormData({...formData, experience: e.target.value})}
required
/>
</div>
<button
type="submit"
className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 transition"
>
Create Professional Profile
</button>
</form>
</div>
</div>
);
}
