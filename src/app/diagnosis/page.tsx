'use client';
import { useEffect, useState } from 'react';

export default function VideoDiagnosis() {
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
// سنقوم بتحميل مكتبة Daily.co هنا
const script = document.createElement('script');
script.src = "https://unpkg.com/@daily-co/daily-js";
script.onload = () => setIsLoaded(true);
document.body.appendChild(script);
}, []);

return (
<div className="min-h-screen bg-industrial-charcoal p-10 text-white">
<h2 className="text-3xl font-bold mb-6">Live Video Diagnosis</h2>
<div className="bg-industrial-slate p-6 rounded-lg h-[600px] flex items-center justify-center border border-gray-700">
{isLoaded ? (
<p>غرفة الفيديو جاهزة للاتصال (سيتم تفعيل الكاميرا هنا)</p>
) : (
<p>جاري تحميل أدوات الاتصال...</p>
)}
</div>
</div>
);
}
