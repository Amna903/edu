const fs = require('fs');

function recolorParents() {
  let text = fs.readFileSync('client/src/pages/ForParents.tsx', 'utf-8');

  // Hero Section
  text = text.replace(
    /className="bg-gradient-to-br from-\[#0f172a\] via-\[#1e3a8a\] to-\[#2366c9\] pt-20 pb-24 px-6 relative overflow-hidden"/,
    'className="bg-white pt-20 pb-24 px-6 relative overflow-hidden border-b border-slate-100"'
  );
  text = text.replace('text-4xl md:text-5xl lg:text-7xl font-semibold text-white', 'text-4xl md:text-5xl lg:text-7xl font-semibold text-slate-900');
  text = text.replace('<span className="text-blue-300">In Real Time.</span>', '<span className="text-[#2366c9]">In Real Time.</span>');
  text = text.replace('text-blue-100/70 text-lg md:text-xl font-medium leading-relaxed', 'text-slate-600 text-lg md:text-xl font-medium leading-relaxed');
  text = text.replace('border-2 border-white/10 text-white hover:bg-white/5', 'border-2 border-slate-200 text-slate-700 hover:bg-slate-50');
  
  // Badges in Hero
  text = text.replace(/bg-blue-500\/10 border border-blue-500\/20 text-blue-300/g, 'bg-blue-50 border border-blue-100 text-[#2366c9]');
  text = text.replace(/text-\[14px\] font-semibold text-blue-100\/80 bg-white\/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white\/10/g, 'text-[14px] font-semibold text-slate-700 bg-white px-5 py-2.5 rounded-full border border-slate-200');
  text = text.replace(/text-blue-400/g, 'text-[#2366c9]');
  
  // Backgrounds of all sections
  text = text.replace(/<section className="py-12 bg-\[#f8fafc\] border-y border-blue-50">/g, '<section className="py-12 bg-white border-y border-slate-100">');
  text = text.replace(/<section id="how-it-helps" className="py-20 bg-slate-50 scroll-mt-10 border-t border-blue-50">/g, '<section id="how-it-helps" className="py-20 bg-white scroll-mt-10 border-t border-slate-100">');
  text = text.replace(/<section id="parent-dashboard" className="py-24 bg-slate-50\/50 scroll-mt-10">/g, '<section id="parent-dashboard" className="py-24 bg-white scroll-mt-10">');
  text = text.replace(/<section id="diagnostic-guide" className="py-20 bg-slate-50 border-y border-blue-50 scroll-mt-10">/g, '<section id="diagnostic-guide" className="py-20 bg-white border-y border-slate-100 scroll-mt-10">');

  fs.writeFileSync('client/src/pages/ForParents.tsx', text);
}

function recolorStudents() {
  let text = fs.readFileSync('client/src/pages/ForStudents.tsx', 'utf-8');

  // Hero Section
  text = text.replace(
    /<section className="relative overflow-hidden bg-gradient-to-br from-\[#0f172a\] via-\[#1e3a8a\] to-\[#2366c9\] py-20 px-6 text-white">/,
    '<section className="relative overflow-hidden bg-white py-20 px-6 border-b border-slate-100">'
  );
  text = text.replace('bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-sm font-bold tracking-wide backdrop-blur-sm text-blue-300', 'bg-blue-50 border border-blue-100 px-3 py-1 text-sm font-bold tracking-wide text-[#2366c9]');
  text = text.replace('text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.1] tracking-tight', 'text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-slate-900');
  text = text.replace('block text-blue-300 mt-2', 'block text-[#2366c9] mt-2');
  text = text.replace('text-lg text-blue-100/70 font-medium leading-relaxed', 'text-lg text-slate-600 font-medium leading-relaxed');
  text = text.replace('border-white/20 text-white hover:bg-white/10 text-lg font-bold rounded-xl bg-white/5', 'border-slate-200 text-slate-700 hover:bg-slate-50 text-lg font-bold rounded-xl');
  text = text.replace('text-sm text-blue-200/70', 'text-sm text-slate-500');
  text = text.replace(/bg-white\/5 backdrop-blur-sm rounded-full px-4 py-2 text-\[14px\] font-semibold text-blue-100\/80 border border-white\/10/g, 'bg-white rounded-full px-4 py-2 text-[14px] font-semibold text-slate-700 border border-slate-200 shadow-sm');
  text = text.replace(/text-blue-400/g, 'text-[#2366c9]');

  // Section 2
  text = text.replace('<section id="problem" className="py-20 bg-blue-50/30 scroll-mt-10 border-y border-blue-50">', '<section id="problem" className="py-20 bg-white scroll-mt-10 border-y border-slate-100">');
  
  // Section 4
  text = text.replace('<section id="journey" className="py-20 bg-slate-50 border-t border-blue-50 scroll-mt-10">', '<section id="journey" className="py-20 bg-white border-t border-slate-100 scroll-mt-10">');
  
  // Section 6 H5P
  text = text.replace('<section id="h5p-samples" className="py-24 bg-\\[#0f172a\\] text-white overflow-hidden scroll-mt-10">', '<section id="h5p-samples" className="py-24 bg-white overflow-hidden scroll-mt-10">');
  text = text.replace('text-3xl md:text-4xl font-semibold text-white mb-6', 'text-3xl md:text-4xl font-semibold text-slate-900 mb-6');
  text = text.replace('text-lg text-blue-200 max-w-3xl mx-auto font-medium leading-relaxed', 'text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed');
  
  // Sample 1, 2, 3 general text replaces
  text = text.replace(/text-teal-400 font-black/g, 'text-[#2366c9] font-black');
  text = text.replace(/text-2xl font-bold text-white/g, 'text-2xl font-bold text-slate-900');
  text = text.replace(/text-blue-100\/70 text-\[14px\] leading-relaxed font-medium mb-6/g, 'text-slate-600 text-[14px] leading-relaxed font-medium mb-6');
  text = text.replace(/bg-white\/5 rounded-2xl p-6 border border-white\/10 relative/g, 'bg-slate-50 rounded-2xl p-6 border border-slate-200 relative');
  text = text.replace(/text-\[10px\] font-black text-teal-400 uppercase tracking-widest mb-2 ml-4/g, 'text-[10px] font-black text-[#2366c9] uppercase tracking-widest mb-2 ml-4');
  text = text.replace(/text-\[13px\] text-slate-300 font-medium leading-relaxed italic ml-4/g, 'text-[13px] text-slate-600 font-medium leading-relaxed italic ml-4');
  text = text.replace(/bg-slate-900 rounded-full border border-white\/10 flex items-center justify-center text-teal-400/g, 'bg-white rounded-full border border-slate-200 flex items-center justify-center text-[#2366c9]');

  text = text.replace(/text-amber-400 font-black/g, 'text-[#2366c9] font-black');
  text = text.replace(/text-\[10px\] font-black text-amber-400 uppercase tracking-widest mb-2 ml-4/g, 'text-[10px] font-black text-[#2366c9] uppercase tracking-widest mb-2 ml-4');
  text = text.replace(/bg-slate-900 rounded-full border border-white\/10 flex items-center justify-center text-amber-400/g, 'bg-white rounded-full border border-slate-200 flex items-center justify-center text-[#2366c9]');

  text = text.replace(/text-purple-400 font-black/g, 'text-[#2366c9] font-black');
  text = text.replace(/text-\[10px\] font-black text-purple-400 uppercase tracking-widest mb-2 ml-4/g, 'text-[10px] font-black text-[#2366c9] uppercase tracking-widest mb-2 ml-4');
  text = text.replace(/bg-slate-900 rounded-full border border-white\/10 flex items-center justify-center text-purple-400/g, 'bg-white rounded-full border border-slate-200 flex items-center justify-center text-[#2366c9]');

  // Section 7
  text = text.replace('<section id="dashboard" className="py-24 bg-slate-50 border-t border-blue-50 scroll-mt-10">', '<section id="dashboard" className="py-24 bg-white border-t border-slate-100 scroll-mt-10">');
  
  // Section 8
  text = text.replace('<section id="ai-advisor" className="py-24 bg-white border-y border-blue-50 scroll-mt-10">', '<section id="ai-advisor" className="py-24 bg-white border-y border-slate-100 scroll-mt-10">');

  fs.writeFileSync('client/src/pages/ForStudents.tsx', text);
}

recolorParents();
recolorStudents();
