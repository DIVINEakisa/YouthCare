import React from 'react';

export default function YouthCenters() {
  const centers = [
    {
      name: 'Kigali Youth Hub',
      location: 'Kigali City Center',
      activities: ['Sports', 'Arts & Music', 'Technology Training', 'Life Skills'],
      contact: '+250 XXX XXX XXX',
      hours: '9 AM - 6 PM Daily',
    },
    {
      name: 'Kacyiru Community Center',
      location: 'Kacyiru District',
      activities: ['Vocational Training', 'Counseling', 'Job Preparation', 'Mentoring'],
      contact: '+250 XXX XXX XXX',
      hours: '8 AM - 5 PM (Mon-Fri)',
    },
    {
      name: 'Gisozi Youth Center',
      location: 'Gisozi Area',
      activities: ['Sports', 'Education Support', 'Entrepreneurship', 'Social Groups'],
      contact: '+250 XXX XXX XXX',
      hours: '10 AM - 7 PM Daily',
    },
    {
      name: 'Nyarutarama Youth Club',
      location: 'Nyarutarama',
      activities: ['Academic Tutoring', 'Leadership Training', 'Community Service', 'Recreation'],
      contact: '+250 XXX XXX XXX',
      hours: '9 AM - 8 PM (Mon-Sat)',
    },
    {
      name: 'Muhima Creative Center',
      location: 'Muhima District',
      activities: ['Art & Design', 'Digital Media', 'Music Production', 'Exhibitions'],
      contact: '+250 XXX XXX XXX',
      hours: '1 PM - 9 PM Daily',
    },
    {
      name: 'Remera Sports Complex',
      location: 'Remera',
      activities: ['Football', 'Volleyball', 'Basketball', 'Fitness Classes'],
      contact: '+250 XXX XXX XXX',
      hours: '6 AM - 8 PM Daily',
    },
  ];

  return (
    <div className="min-h-screen p-4" style={{ background: '#3f6212' }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Youth Centers (Maison des Jeunes) 👥</h1>
        <p className="mb-8" style={{ color: '#f0fde8' }}>Find activities and programs in your community</p>

        {/* Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: '#3f6212' }}>Why Join a Youth Center?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="mb-3">Youth centers (Maison des Jeunes) are community spaces designed for young people. They offer:</p>
              <ul className="space-y-1 text-sm">
                <li>✓ A safe space to meet and socialize</li>
                <li>✓ Education and skill development</li>
                <li>✓ Sports and recreational activities</li>
                <li>✓ Mentorship and guidance</li>
              </ul>
            </div>
            <div>
              <p className="mb-3">Benefits of participation:</p>
              <ul className="space-y-1 text-sm">
                <li>✓ Build confidence and leadership skills</li>
                <li>✓ Make new friends and connections</li>
                <li>✓ Learn practical skills for your future</li>
                <li>✓ Access to counseling and support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Centers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((center, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-lg font-bold mb-2" style={{ color: '#3f6212' }}>{center.name}</h3>
              
              <p className="text-gray-600 text-sm mb-4">📍 {center.location}</p>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Activities:</p>
                <div className="flex flex-wrap gap-2">
                  {center.activities.map((activity, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded" style={{ background: '#f0fde8', color: '#3f6212' }}>
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700 mb-4 border-t pt-4">
                <p><strong>📞</strong> {center.contact}</p>
                <p><strong>🕐</strong> {center.hours}</p>
              </div>

              <button
                onClick={() => alert(`Contact: ${center.contact}`)}
                className="w-full text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
                style={{ background: '#3f6212' }}
                onMouseEnter={(e) => e.target.style.background = '#2d4a0e'}
                onMouseLeave={(e) => e.target.style.background = '#3f6212'}"
              >
                Get Info
              </button>
            </div>
          ))}
        </div>

        {/* Getting Involved */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#3f6212' }}>How to Get Involved</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border-2 border-emerald-800 rounded-lg">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="font-bold text-emerald-800 mb-2">Step 1: Find</h3>
              <p className="text-gray-700 text-sm">Locate a youth center near you</p>
            </div>
            <div className="text-center p-4 border-2 border-emerald-800 rounded-lg">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-bold text-emerald-800 mb-2">Step 2: Contact</h3>
              <p className="text-gray-700 text-sm">Call or visit the center</p>
            </div>
            <div className="text-center p-4 border-2 border-emerald-800 rounded-lg">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-bold text-emerald-800 mb-2">Step 3: Register</h3>
              <p className="text-gray-700 text-sm">Sign up for programs you like</p>
            </div>
            <div className="text-center p-4 border-2 border-emerald-800 rounded-lg">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-bold text-emerald-800 mb-2">Step 4: Join</h3>
              <p className="text-gray-700 text-sm">Participate and have fun!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
