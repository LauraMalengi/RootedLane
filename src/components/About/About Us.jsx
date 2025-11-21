import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-0 shadow-2xl">
        
        {/* Image Section */}
        <div className="relative bg-slate-700 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700/40 to-transparent z-10"></div>
          <img
            src="/Images/myfamily.jpg"
            alt="Professional woman smiling"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="bg-white p-12 flex flex-col justify-center">
          <div className="mb-3 text-slate-600 text-sm font-semibold tracking-widest uppercase">
            Innovative Business
          </div>
          
          <h1 className="text-5xl font-bold text-slate-600 mb-6">
            About Us
          </h1>
          
          <p className="text-slate-600 leading-relaxed mb-8">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur.
          </p>
          
          <button className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-8 tracking-widest uppercase text-sm transition-colors duration-300 self-start">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Credit */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white text-sm">
          Image from <span className="text-pink-300">Freepik</span>
        </p>
      </div>
    </div>
  );
}
