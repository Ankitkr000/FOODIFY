import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleUserClick = () => {
    navigate('/login')
  }

  const handleOwnerClick = () => {
    navigate('/login')
  }

  const handleDeliveryClick = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-black">FOODIFY</span>
            </div>
          </div>

          {/* Nav Links - Center */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-black transition font-medium text-sm">
              For Users
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition font-medium text-sm">
              For Partners
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition font-medium text-sm">
              About
            </a>
          </div>

          {/* Auth Buttons - Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-black font-medium text-sm hover:bg-gray-100 rounded-lg transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-900 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-24 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-black">
            Food Delivery,<br />
            <span className="text-gray-600">Reimagined</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the finest food delivery platform. From hungry customers to ambitious restaurant owners and delivery partners - there's a place for everyone.
          </p>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-black">Choose Your Path</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* User Card */}
            <div 
              onClick={handleUserClick}
              className="bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="text-5xl mb-6">🍽️</div>
              <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-gray-700 transition">
                For Customers
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Discover the best restaurants, order your favorite meals, and enjoy fast, reliable delivery.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Browse Premium Restaurants
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Real-time Order Tracking
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Secure Payment Options
                </li>
              </ul>
              <button className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition">
                Start Ordering
              </button>
            </div>

            {/* Owner Card */}
            <div 
              onClick={handleOwnerClick}
              className="bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 cursor-pointer group md:ring-2 md:ring-black"
            >
              <div className="text-5xl mb-6">🏪</div>
              <div className="inline-block bg-black text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-gray-700 transition">
                For Restaurant Owners
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Grow your restaurant business with our comprehensive management and delivery network.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Easy Menu Management
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Order Analytics & Reports
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Dedicated Support Team
                </li>
              </ul>
              <button className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition">
                Partner With Us
              </button>
            </div>

            {/* Delivery Boy Card */}
            <div 
              onClick={handleDeliveryClick}
              className="bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="text-5xl mb-6">🚴</div>
              <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-gray-700 transition">
                For Delivery Partners
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Earn on your terms with flexible hours and competitive rates. Be your own boss.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Flexible Working Hours
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Competitive Earnings
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  24/7 Customer Support
                </li>
              </ul>
              <button className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition">
                Start Earning
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-black">Why Choose FOODIFY?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="font-bold text-lg mb-2 text-black">Lightning Fast</h4>
              <p className="text-gray-600 leading-relaxed">Quick and reliable delivery to your doorstep in minutes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="font-bold text-lg mb-2 text-black">Secure & Safe</h4>
              <p className="text-gray-600 leading-relaxed">Multiple payment options with enterprise-grade security</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h4 className="font-bold text-lg mb-2 text-black">Premium Quality</h4>
              <p className="text-gray-600 leading-relaxed">Curated selection of top-rated restaurants and partners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="font-bold text-lg mb-2 text-black">24/7 Support</h4>
              <p className="text-gray-600 leading-relaxed">Round-the-clock customer support for all your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-300 text-lg mb-12">Join thousands of satisfied users, restaurants, and delivery partners on FOODIFY today.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Login Now
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-bold text-lg text-white mb-4">FOODIFY</h4>
            <p className="text-gray-400 leading-relaxed">Your trusted food delivery platform connecting customers, restaurants, and delivery partners.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">For Customers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Browse Restaurants</a></li>
              <li><a href="#" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">For Partners</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Partner Program</a></li>
              <li><a href="#" className="hover:text-white transition">Join Our Team</a></li>
              <li><a href="#" className="hover:text-white transition">Become a Delivery</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FOODIFY. All rights reserved. Elegance meets convenience.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home