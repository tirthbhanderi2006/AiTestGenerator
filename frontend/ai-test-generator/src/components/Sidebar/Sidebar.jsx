// src/components/Sidebar/Sidebar.jsx
import { FiMessageSquare, FiUser, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({
  chatHistory = [],
  onNewChat,
  onSelectChat,
  activeChatId
}) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="flex items-center w-full justify-center gap-2 px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
        >
          <FiPlus /> New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h3 className="px-4 py-2 text-sm font-medium text-gray-400">Recent</h3>
        <div className="space-y-1 px-2">
          {chatHistory.map(chat => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${activeChatId === chat.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
                }`}
            >
              <FiMessageSquare className="mr-3" />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleProfileClick}
          className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md transition-colors duration-200"
        >
          <FiUser className="mr-3" />
          Profile
        </button>
      </div>
    </div>
  );
};

export default Sidebar;