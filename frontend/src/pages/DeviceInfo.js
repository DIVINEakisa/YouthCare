import React from 'react';

export default function DeviceInfo() {
  return (
    <div className="min-h-screen bg-emerald-800 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">IoT Menstrual Pain Device ⚙️</h1>

        {/* Main Concept */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-emerald-800 mb-4">YouthCare+ Pain Relief Wearable</h2>
              <p className="text-gray-700 mb-4">
                The YouthCare+ Pain Relief Device is a wearable technology designed to provide non-invasive pain relief for menstrual cramps and other period-related discomfort.
              </p>
              <p className="text-gray-700 mb-4">
                This innovative device is designed to be affordable, accessible, and easy to use for youth in Rwanda and across Africa.
              </p>
            </div>
            <div className="bg-emerald-100 rounded-lg p-8 text-center">
              <div className="text-8xl mb-4">📱⚡</div>
              <p className="text-emerald-800 font-semibold">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">✨ Key Features</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-emerald-800 font-bold text-xl">•</span>
                <div>
                  <p className="font-semibold">Smart Heat Therapy</p>
                  <p className="text-sm text-gray-600">Adjustable warmth for effective pain relief</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-800 font-bold text-xl">•</span>
                <div>
                  <p className="font-semibold">Vibration Technology</p>
                  <p className="text-sm text-gray-600">Gentle vibrations to relieve muscle tension</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-800 font-bold text-xl">•</span>
                <div>
                  <p className="font-semibold">Long Battery Life</p>
                  <p className="text-sm text-gray-600">Up to 12 hours on a single charge</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-800 font-bold text-xl">•</span>
                <div>
                  <p className="font-semibold">Waterproof Design</p>
                  <p className="text-sm text-gray-600">Safe to use in shower or bath</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">💰 Affordability</h3>
            <div className="bg-emerald-50 rounded-lg p-4 mb-4">
              <p className="text-2xl font-bold text-emerald-800">Low Cost</p>
              <p className="text-gray-700 mt-2">Designed to be affordable for all youth</p>
            </div>
            
            <h4 className="font-semibold text-emerald-800 mb-3">Why It Matters:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Reduces need for medication</li>
              <li>✓ Reusable and sustainable</li>
              <li>✓ Works without electricity or app</li>
              <li>✓ Respects privacy and dignity</li>
              <li>✓ No side effects</li>
              <li>✓ Accessible to all economic levels</li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border-2 border-emerald-800 rounded-lg">
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="font-bold text-emerald-800 mb-2">Position</h3>
              <p className="text-gray-700 text-sm">Place device on lower abdomen</p>
            </div>
            <div className="text-center p-4 border-2 border-emerald-800 rounded-lg">
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="font-bold text-emerald-800 mb-2">Activate</h3>
              <p className="text-gray-700 text-sm">Turn on and select comfort level</p>
            </div>
            <div className="text-center p-4 border-2 border-emerald-800 rounded-lg">
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="font-bold text-emerald-800 mb-2">Relax</h3>
              <p className="text-gray-700 text-sm">Enjoy warming and vibration therapy</p>
            </div>
            <div className="text-center p-4 border-2 border-emerald-800 rounded-lg">
              <div className="text-3xl mb-2">4️⃣</div>
              <h3 className="font-bold text-emerald-800 mb-2">Relief</h3>
              <p className="text-gray-700 text-sm">Experience pain relief in 15-30 min</p>
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Technical Specifications</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>Battery:</strong> Rechargeable Li-ion 3000mAh</li>
              <li><strong>Heat Range:</strong> 37°C - 42°C (adjustable)</li>
              <li><strong>Vibration Levels:</strong> 5 intensity settings</li>
              <li><strong>Size:</strong> Compact and ergonomic</li>
              <li><strong>Weight:</strong> Lightweight (under 200g)</li>
              <li><strong>Material:</strong> Medical-grade silicone</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Benefits Summary</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✓ Non-invasive pain relief</li>
              <li>✓ Drug-free solution</li>
              <li>✓ Reusable for years</li>
              <li>✓ Environmentally friendly</li>
              <li>✓ Easy to use anywhere</li>
              <li>✓ Improves quality of life</li>
            </ul>
          </div>
        </div>

        {/* Clinical Research */}
        <div className="bg-emerald-50 border-2 border-emerald-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">📊 Clinical Evidence</h2>
          <p className="text-gray-700 mb-4">
            Research shows that thermal therapy and vibration therapy can reduce menstrual pain by 40-60% in users. Many women report improved sleep, better productivity, and reduced need for pain medication.
          </p>
          <p className="text-gray-700">
            The YouthCare+ device combines these therapies in an affordable, accessible package designed specifically for youth in developing regions.
          </p>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">🛒 Pre-Order Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-emerald-800 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-2">Launch Date</p>
              <p className="text-2xl font-bold text-emerald-800">Q2 2024</p>
            </div>
            <div className="border-2 border-emerald-800 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-2">Initial Price</p>
              <p className="text-2xl font-bold text-emerald-800">RWF 25,000</p>
              <p className="text-xs text-gray-600">Approximately USD 25</p>
            </div>
            <div className="border-2 border-emerald-800 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-2">Warranty</p>
              <p className="text-2xl font-bold text-emerald-800">2 Years</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-emerald-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-900 transition">
              Join Pre-Order List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
