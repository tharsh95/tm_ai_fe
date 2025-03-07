import { Search, Bell, Mail, Menu } from 'lucide-react';
import { HeaderProps } from '../types';
import { useState } from 'react';
import UserMenu from './UserMenu';

export const Header = ({ setSidebarOpen, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <button 
          className="md:hidden p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-start">
          <div className="max-w-lg w-full lg:max-w-xs relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search"
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="ml-4 flex items-center">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Bell className="h-6 w-6" />
          </button>
          
          <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hidden sm:block">
            <Mail className="h-6 w-6" />
          </button>
          
          <div className="ml-3">
            <UserMenu />
          </div>
        </div>
      </div>
      
      <div className="px-4 md:px-6 py-2 flex items-center overflow-x-auto">
        <div className="flex items-center text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700 whitespace-nowrap">Dashboard</a>
          <span className="mx-2">→</span>
          <a href="#" className="hover:text-gray-700 whitespace-nowrap">Rucksa</a>
        </div>
      </div>
    </header>
  );
};