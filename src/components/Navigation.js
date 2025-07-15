import React from 'react';
import { Stethoscope, LogOut, User } from 'lucide-react';
import { VIEW_TYPES } from '../constants';

const Navigation = ({ currentView, setCurrentView, userEmail, onLogout }) => {
  // Extract username from email (everything before @)
  const displayName = userEmail ? userEmail.split('@')[0] : 'User';

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 rounded-full p-2">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Egészségügyi Kezelés</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentView(VIEW_TYPES.PATIENT)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentView === VIEW_TYPES.PATIENT
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Beteg Regisztráció
              </button>
              <button
                onClick={() => setCurrentView(VIEW_TYPES.ADMIN)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentView === VIEW_TYPES.ADMIN
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Admin Vezérlő
              </button>
              <button
                onClick={() => setCurrentView(VIEW_TYPES.DISPLAY)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentView === VIEW_TYPES.DISPLAY
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Várótermi Kijelző
              </button>
            </div>
            
            {/* User info and logout */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-5 h-5" />
                <span className="font-medium">{displayName}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Kijelentkezés</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;