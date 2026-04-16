import React, { useState } from 'react';

export default function Clinics() {
  const [selectedClinic, setSelectedClinic] = useState(null);

  const clinics = [
    {
      name: 'Kigali Central Health Center',
      location: 'Kigali, Rwanda',
      distance: '2 km away',
      phone: '+250 XXX XXX XXX',
      hours: '7 AM - 6 PM Daily',
      services: ['General consultation', 'Reproductive health', 'Sexual health testing'],
      rating: 4.8,
    },
    {
      name: 'Youth Wellness Clinic',
      location: 'Kigali, Rwanda',
      distance: '3.5 km away',
      phone: '+250 XXX XXX XXX',
      hours: '8 AM - 5 PM (Mon-Fri)',
      services: ['Youth-friendly services', 'Counseling', 'Contraception'],
      rating: 4.9,
    },
    {
      name: 'Muhima Health Center',
      location: 'Kigali, Rwanda',
      distance: '4 km away',
      phone: '+250 XXX XXX XXX',
      hours: '7 AM - 7 PM Daily',
      services: ['Emergency care', 'General services', 'Reproductive health'],
      rating: 4.6,
    },
    {
      name: 'Kimironko Medical Center',
      location: 'Kigali, Rwanda',
      distance: '5 km away',
      phone: '+250 XXX XXX XXX',
      hours: '6 AM - 8 PM Daily',
      services: ['24/7 Emergency', 'Specialist consultation', 'Lab services'],
      rating: 4.7,
    },
    {
      name: 'Family Planning Clinic',
      location: 'Kigali, Rwanda',
      distance: '2.8 km away',
      phone: '+250 XXX XXX XXX',
      hours: '8 AM - 4 PM (Mon-Fri)',
      services: ['Contraception', 'STI testing', 'Pregnancy testing'],
      rating: 4.9,
    },
    {
      name: 'Gisozi Health Center',
      location: 'Kigali, Rwanda',
      distance: '6 km away',
      phone: '+250 XXX XXX XXX',
      hours: '7 AM - 5 PM Daily',
      services: ['General health', 'Mental health', 'Youth services'],
      rating: 4.5,
    },
  ];

  return (
    <div className="min-h-screen p-4" style={{ background: '#3f6212' }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Clinic Finder 🏥</h1>

        {/* Important Message */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <div className="text-4xl">⚠️</div>
            <div>
              <h2 className="text-xl font-bold mb-2" style={{ color: '#3f6212' }}>When to Visit a Clinic</h2>
              <p className="text-gray-700 mb-3">
                Visit a healthcare facility if you experience:
              </p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Severe or persistent pain</li>
                <li>• Heavy menstrual bleeding</li>
                <li>• Symptoms that don't improve with home care</li>
                <li>• Suspected pregnancy or STI</li>
                <li>• Mental health concerns requiring professional help</li>
                <li>• Any health issue that worries you</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Clinics Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {clinics.map((clinic, index) => (
            <div
              key={index}
              onClick={() => setSelectedClinic(clinic)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-emerald-800">{clinic.name}</h3>
                  <p className="text-gray-600 text-sm">📍 {clinic.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-yellow-500 text-lg">⭐ {clinic.rating}</div>
                  <p className="text-gray-600 text-xs">{clinic.distance}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p><strong>📞</strong> {clinic.phone}</p>
                <p><strong>🕐</strong> {clinic.hours}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Services:</p>
                <div className="flex flex-wrap gap-2">
                  {clinic.services.slice(0, 2).map((service, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded" style={{ background: '#f0fde8', color: '#3f6212' }}>
                      {service}
                    </span>
                  ))}
                  {clinic.services.length > 2 && (
                    <span className="text-xs text-gray-600">+{clinic.services.length - 2} more</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedClinic(clinic)}
                className="w-full text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
                style={{ background: '#3f6212' }}
                onMouseEnter={(e) => e.target.style.background = '#2d4a0e'}
                onMouseLeave={(e) => e.target.style.background = '#3f6212'}"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Clinic Details Modal */}
        {selectedClinic && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
              <div className="sticky top-0 text-white p-6 flex justify-between items-center" style={{ background: '#3f6212' }}>
                <h2 className="text-xl font-bold">{selectedClinic.name}</h2>
                <button
                  onClick={() => setSelectedClinic(null)}
                  className="text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">Location</h3>
                  <p className="text-gray-700">{selectedClinic.location}</p>
                  <p className="text-gray-600 text-sm">{selectedClinic.distance}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">Contact</h3>
                  <p className="text-gray-700">{selectedClinic.phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">Hours</h3>
                  <p className="text-gray-700">{selectedClinic.hours}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">Services</h3>
                  <ul className="space-y-1">
                    {selectedClinic.services.map((service, i) => (
                      <li key={i} className="text-gray-700 flex items-center gap-2">
                        <span className="text-emerald-800">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">Rating</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-lg">⭐ {selectedClinic.rating}</span>
                    <span className="text-gray-600 text-sm">(Highly rated)</span>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => alert(`Calling ${selectedClinic.phone}`)}
                    className="w-full bg-emerald-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-900 transition"
                  >
                    Call Clinic
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClinic(null);
                      alert('Directions opened in maps');
                    }}
                    className="w-full text-white px-4 py-2 rounded-lg font-semibold transition" style={{ background: '#d9d9d9', color: '#3f6212' }}
                    onMouseEnter={(e) => e.target.style.background = '#e0e0e0'}
                    onMouseLeave={(e) => e.target.style.background = '#d9d9d9'}"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Info */}
        <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6">
          <h2 className="text-lg font-bold text-red-600 mb-3">🚨 Emergency</h2>
          <p className="text-gray-800 mb-3">In case of emergency, call:</p>
          <button
            onClick={() => alert('Emergency services contacted')}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition text-lg"
          >
            Call 100 (Emergency)
          </button>
        </div>
      </div>
    </div>
  );
}
