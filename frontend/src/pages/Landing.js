import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Landing() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="w-full bg-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-xl" style={{ fontFamily: 'Poppins', color: '#3f6212' }}>YouthCare+</span>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl" style={{ color: '#3f6212', cursor: 'pointer' }}>
            ☰
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 transition" style={{ color: '#3f6212', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#2d4a0e'} onMouseLeave={(e) => e.target.style.color = '#3f6212'}>Home</button>
            <button onClick={() => scrollToSection('features')} className="text-gray-700 transition" style={{ color: '#3f6212', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#2d4a0e'} onMouseLeave={(e) => e.target.style.color = '#3f6212'}>Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 transition" style={{ color: '#3f6212', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#2d4a0e'} onMouseLeave={(e) => e.target.style.color = '#3f6212'}>How It Works</button>
            <button onClick={() => scrollToSection('impact')} className="text-gray-700 transition" style={{ color: '#3f6212', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#2d4a0e'} onMouseLeave={(e) => e.target.style.color = '#3f6212'}>Impact</button>
            <button onClick={() => navigate('/login')} className="font-semibold" style={{ color: '#3f6212', cursor: 'pointer' }}>Login</button>
            <button onClick={() => navigate('/register')} className="text-white px-6 py-2 rounded-lg transition font-semibold" style={{ background: '#3f6212', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.background = '#2d4a0e'} onMouseLeave={(e) => e.target.style.background = '#3f6212'}>
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-3">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left text-gray-700 py-2" style={{ cursor: 'pointer' }}>Home</button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left text-gray-700 py-2" style={{ cursor: 'pointer' }}>Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-gray-700 py-2" style={{ cursor: 'pointer' }}>How It Works</button>
            <button onClick={() => scrollToSection('impact')} className="block w-full text-left text-gray-700 py-2" style={{ cursor: 'pointer' }}>Impact</button>
            <button onClick={() => navigate('/login')} className="block w-full text-left font-semibold py-2" style={{ color: '#3f6212', cursor: 'pointer' }}>Login</button>
            <button onClick={() => navigate('/register')} className="block w-full text-center text-white px-6 py-2 rounded-lg transition font-semibold" style={{ background: '#3f6212', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.background = '#2d4a0e'} onMouseLeave={(e) => e.target.style.background = '#3f6212'}>
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 animate-fadeIn" style={{ background: 'linear-gradient(135deg, #f0fde8 0%, #e0fcc4 100%)' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight" style={{ fontFamily: 'Poppins', color: '#2d4a0e' }}>
              A Safe Digital Space for Youth Health & Wellbeing
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Get trusted information, track your health, and access support anytime, anywhere. All from the comfort of your phone or computer.
            </p>
            <div className="flex gap-4 pt-4">
              <button onClick={() => navigate('/register')} className="text-white px-8 py-4 rounded-lg transition font-semibold text-lg hover:scale-105 transform" style={{ background: '#3f6212', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.background = '#2d4a0e'} onMouseLeave={(e) => e.target.style.background = '#3f6212'}>
                Get Started Free
              </button>
              <button onClick={() => scrollToSection('features')} className="px-8 py-4 rounded-lg transition font-semibold text-lg hover:scale-105 transform" style={{ border: '2px solid #3f6212', color: '#3f6212', background: 'white', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.background = '#f0fde8'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                Learn More
              </button>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md h-80 rounded-3xl shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1631217314830-4e202261fe13?w=500&h=400&fit=crop" 
                alt="Youth Health Support" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-6">
                <p className="text-white font-semibold text-lg" style={{ fontFamily: 'Poppins', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>Your Health, Your Journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <p className="text-center text-gray-700 text-lg font-semibold mb-8">Built for youth in Rwanda by healthcare professionals</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: '#f0fde8', color: '#3f6212' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
              </div>
              <h3 className="font-bold text-gray-800">Private & Secure</h3>
              <p className="text-sm text-gray-600 mt-2">Your data is encrypted and protected</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: '#f0fde8', color: '#3f6212' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>
              </div>
              <h3 className="font-bold text-gray-800">Accessible Anywhere</h3>
              <p className="text-sm text-gray-600 mt-2">Works online, offline, and via USSD</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: '#f0fde8', color: '#3f6212' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              </div>
              <h3 className="font-bold text-gray-800">Inclusive for All</h3>
              <p className="text-sm text-gray-600 mt-2">Boys, girls, and everyone welcome</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-4 md:px-6" style={{ background: '#f0fde8' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4" style={{ fontFamily: 'Poppins', color: '#2d4a0e' }}>
            Everything You Need for Better Health
          </h2>
          <p className="text-center text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
            YouthCare+ brings together tools designed specifically for young people like you
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { svg: '<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>', title: "AI Health Chat", desc: "Ask health questions privately and get instant, trustworthy answers 24/7" },
              { svg: '<path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>', title: "Cycle Tracker", desc: "Track periods, get reminders, and learn about your body" },
              { svg: '<g transform="translate(2, 1)"><ellipse cx="8" cy="5" rx="5" ry="6" fill="none" stroke="#3f6212" strokeWidth="1.2"/><circle cx="6" cy="3" r="1.2" fill="#3f6212"/><path d="M10 10 Q12 11 12 13" fill="none" stroke="#3f6212" strokeWidth="0.8"/><path d="M8 12 C6.5 10.5 5.5 11 5 12.5 C4.5 13.5 5 14.5 8 16 C11 14.5 11.5 13.5 11 12.5 C10.5 11 9.5 10.5 8 12 Z" fill="#3f6212"/></g>', title: "Mental Health Support", desc: "Get guidance, access resources, and connect with therapists" },
              { svg: '<path d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25c0 5.079 3.855 9.577 8.759 9.747m0-13c5.5 0 10 4.745 10 10.25 0 5.079-3.855 9.577-8.759 9.747m0 0a8.977 8.977 0 01-7.794-4.795"/>', title: "Learn & Grow", desc: "Access educational content and trustworthy health resources" },
              { svg: '<path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>', title: "Find a Clinic", desc: "Locate nearby health services and make appointments easily" },
              { svg: '<path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>', title: "USSD & Call Access", desc: "Access health services without internet or a smartphone" },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300">
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg" style={{ background: '#f0fde8', color: '#3f6212' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    {feature.svg}
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Poppins', color: '#2d4a0e' }}>{feature.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12" style={{ fontFamily: 'Poppins', color: '#2d4a0e' }}>
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", icon: '<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M11 7a1 1 0 11-2 0 1 1 0 012 0zM15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" /></svg>', title: "Sign Up or Dial", desc: "Create an account online or dial *123# on any phone" },
              { step: "2", icon: '<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12h-4v4h-4v-4H8v-4h4V6h4v4h4v4z" /></svg>', title: "Ask or Track", desc: "Chat with AI, track your health, or explore resources" },
              { step: "3", icon: '<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>', title: "Get Support", desc: "Receive guidance, reminders, and connect with professionals" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4" style={{ fontFamily: 'Poppins', background: '#3f6212' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#2d4a0e' }}>{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
                {i < 2 && <div className="text-3xl mt-6" style={{ color: '#d4f34d' }}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUSIVITY SECTION */}
      <section className="py-20 px-4 md:px-6" style={{ background: '#f0fde8' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12" style={{ fontFamily: 'Poppins', color: '#2d4a0e' }}>
            Designed for Everyone
          </h2>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center" style={{ background: '#f0fde8', color: '#3f6212' }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#2d4a0e' }}>For Everyone</h3>
                  <p className="text-gray-700 text-sm">Boys, girls, and all young people between 10–24 years</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center" style={{ background: '#f0fde8', color: '#3f6212' }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86 1 4 1.68 6 2v13h2v-6h2v6h2V10c2-.32 4.14-1 6-2l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#2d4a0e' }}>Accessible Design</h3>
                  <p className="text-gray-700 text-sm">Supports people with visual, hearing, and mobility needs</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center" style={{ background: '#f0fde8', color: '#3f6212' }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#2d4a0e' }}>Works Anywhere</h3>
                  <p className="text-gray-700 text-sm">With or without internet, in urban or rural areas</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center" style={{ background: '#f0fde8', color: '#3f6212' }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M15 8H3v9h12V8zm1-2v13H2V6h14zm4 5h2v3h-2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#2d4a0e' }}>Simple Language</h3>
                  <p className="text-gray-700 text-sm">Clear, friendly content written for young people</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section id="impact" className="py-20 px-4 md:px-6 text-white" style={{ background: '#3f6212' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4" style={{ fontFamily: 'Poppins' }}>
            Our Impact
          </h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto" style={{ color: '#d4f34d' }}>
            Empowering youth with knowledge and care
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "10,000+", label: "Youth Supported" },
              { stat: "24/7", label: "Health Support" },
              { stat: "95%", label: "User Satisfaction" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-extrabold mb-2" style={{ fontFamily: 'Poppins', color: '#d4f34d' }}>{item.stat}</div>
                <p className="text-lg" style={{ color: '#e0fcc4' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: 'Poppins', color: '#2d4a0e' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of young people taking control of their health and wellbeing today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate('/register')} className="text-white px-10 py-4 rounded-lg transition font-semibold text-lg hover:scale-105 transform" style={{ background: '#3f6212', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.background = '#2d4a0e'} onMouseLeave={(e) => e.target.style.background = '#3f6212'}>
              Create Account
            </button>
            <button onClick={() => navigate('/login')} className="px-10 py-4 rounded-lg transition font-semibold text-lg hover:scale-105 transform" style={{ border: '2px solid #3f6212', color: '#3f6212', background: 'white', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.background = '#f0fde8'} onMouseLeave={(e) => e.target.style.background = 'white'}>
              Login
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-white py-12 px-4 md:px-6" style={{ background: '#2d4a0e' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌿</span>
                <span className="font-bold text-xl">YouthCare+</span>
              </div>
              <p className="text-gray-300">Your trusted digital health companion</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition block">Home</button>
                <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition block">Features</button>
                <button onClick={() => scrollToSection('impact')} className="text-gray-300 hover:text-white transition block">Impact</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <div className="space-y-2">
                <button onClick={() => {}} className="text-gray-300 hover:text-white transition block">Privacy Policy</button>
                <button onClick={() => {}} className="text-gray-300 hover:text-white transition block">Terms of Service</button>
                <button onClick={() => {}} className="text-gray-300 hover:text-white transition block">Contact</button>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-gray-300" style={{ borderColor: '#3f6212' }}>
            <p>© 2026 YouthCare+ Rwanda. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
