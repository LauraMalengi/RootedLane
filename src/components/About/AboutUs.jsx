import React from "react";
import "./AboutUs.css";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-0 shadow-2xl">
        
        {/* Image Section */}
        <div className="relative bg-slate-700 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700/40 to-transparent z-10"></div>
          <img
            src="/Images/myFamily.jpg"
            alt="family picture"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="bg-white p-12 flex flex-col justify-center">
          <div className="mb-3 text-slate-600 text-sm font-semibold tracking-widest uppercase">
            RootedLane story
          </div>
          
          <h1 className="text-5xl font-bold text-slate-600 mb-6">
            About Us
          </h1>
          
          <p className="text-slate-600 leading-relaxed mb-8">
           RootedLane is more than just an e-commerce platform; it's a community where fashion
            meets family values. Our journey began with a simple idea: to create a one-stop destination
            for families to find stylish, high-quality clothing that caters to every member, from the youngest
            to the oldest. We believe that fashion should be inclusive, affordable, and accessible to all.
            Our curated collections are designed to reflect the diverse tastes and preferences of modern families,
            ensuring that everyone can express their unique style. At RootedLane, we are committed to sustainability 
            and ethical practices, working closely with our suppliers to ensure that our products are made with care for
            both people and the planet. Join us on this journey as we continue to grow and evolve, always keeping our roots firmly 
            planted in family values and exceptional service.
          </p>
        </div>
      </div>
      
    </div>
  );
}
