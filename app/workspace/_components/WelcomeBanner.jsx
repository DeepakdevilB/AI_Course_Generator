import React from 'react';
import { Sparkles } from 'lucide-react';

function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden p-8 rounded-3xl bg-white shadow-xl shadow-indigo-100/50 border border-white/60">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 backdrop-blur-sm -z-10"></div>
      
      <div className="relative z-10">
        <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full mb-4 border border-indigo-100/50 shadow-sm animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-semibold text-indigo-700">Explore Your Dashboard</span>
        </div>
        
        <h2 className="font-extrabold text-4xl text-gray-900 tracking-tight mb-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Welcome back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">CourseCraft</span>
        </h2>
        
        <p className="text-lg text-gray-600 font-medium max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Ready to continue your learning journey? AI has personalized some new challenges just for you today.
        </p>
      </div>
      
      {/* Decorative Grid SVG */}
      <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block select-none pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}

export default WelcomeBanner;
