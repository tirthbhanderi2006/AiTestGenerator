// src/components/Layout/Layout.jsx
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // Check if current page is home
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: `Chat ${chatHistory.length + 1}`,
      timestamp: new Date().toISOString()
    };
    setChatHistory(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    navigate('/generate');
    setIsSidebarOpen(false);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    navigate('/generate');
    setIsSidebarOpen(false);
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    if (!isHomePage) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button - only show on non-home pages */}
      {!isHomePage && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-700 hover:bg-gray-200"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar - only show on non-home pages */}
      {!isHomePage && (
        <>
          <div className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
            <Sidebar
              chatHistory={chatHistory}
              onNewChat={handleNewChat}
              onSelectChat={handleSelectChat}
              activeChatId={activeChatId}
            />
          </div>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
        </>
      )}

      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${
        !isHomePage ? 'md:ml-64' : ''
      }`}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold text-blue-600">JUnit Test Generator</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  to="/home"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/home')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/generate"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/generate')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Generate Tests
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className={`${
            isHomePage ? '' : 'max-w-7xl'
          } mx-auto py-6 px-4 sm:px-6 lg:px-8`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;