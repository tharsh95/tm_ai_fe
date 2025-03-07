import { Users, Briefcase, Inbox, Contact, X } from 'lucide-react';
import { SidebarProps } from '../types';
export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  return (
    <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative inset-y-0 left-0 w-64 bg-white shadow-md z-30 transform transition-transform duration-300 ease-in-out`}>
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="text-orange-500">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L2 30H30L16 2Z" fill="currentColor" />
            </svg>
          </div>
          <div className="font-bold text-gray-800 uppercase">
            Digital<br />Studio
          </div>
        </div>
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <nav className="mt-6">
        <div className="px-6 py-3">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Menu</h2>
        </div>
        
        <div className="px-3 py-2">
          <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Users className="h-5 w-5 mr-3 text-gray-500" />
            <span>Clients</span>
          </a>
          
          <a href="#" className="flex items-center px-3 py-2 text-gray-700 bg-gray-100 rounded-md">
            <Briefcase className="h-5 w-5 mr-3 text-gray-500" />
            <span className="font-medium">Task manager</span>
          </a>
          
          <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Inbox className="h-5 w-5 mr-3 text-gray-500" />
            <span>Inbox</span>
          </a>
          
          <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Contact className="h-5 w-5 mr-3 text-gray-500" />
            <span>Contacts</span>
          </a>
        </div>
      </nav>
    </div>
  );
};