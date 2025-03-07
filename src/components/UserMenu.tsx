import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // const email = localStorage.getItem("email");
  const email = JSON.parse(localStorage.getItem("user") || '{}').email;
  const name = JSON.parse(localStorage.getItem("user") || '{}').name;
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
      >
        <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
          <span className="text-sm font-light">{name?.charAt(0).toUpperCase()}</span>
        </div>
        <span className="text-sm font-light">{name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <div className="px-2 py-1 text-xs text-gray-700 border-b">
            {email}
          </div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 