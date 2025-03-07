import { Pencil, Trash2 } from 'lucide-react';
import { TaskCardProps } from '../types';
import axios from 'axios';
import { formatDate } from '../utils';

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onEdit, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 hover:bg-red-100';
      case 'Medium':
        return 'bg-orange-50 hover:bg-orange-100';
      default:
        return 'bg-green-50 hover:bg-green-100';
    }
  };



  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    try {
      await axios.delete(`http://localhost:8000/tasks/${task.id}`);
      onDelete(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    onEdit(task);
  };

  return (
    <div 
      className={`rounded-lg shadow p-4 cursor-pointer transition-colors ${getPriorityColor(task.priority)}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-900">{task.title}</h4>
        <div className="flex items-center gap-2">
          {/* <span className={`text-xs px-2 py-1 rounded-full flex items-center ${
            task.priority === 'High' ? 'bg-red-100 text-red-800' : 
            task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' : 
            'bg-green-100 text-green-800'
          }`}>
            {getPriorityIcon(task.priority)}
            <span className="ml-1">{task.priority}</span>
          </span> */}
          <button 
            onClick={handleEdit}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs text-gray-500">Participants:</p>
        <p className="text-sm text-gray-700">
        {Array.isArray(task.participants) ? task.participants.join(', ') : task.participants}

          </p>
      </div>
      <div className="mt-2">
        <p className="text-xs text-gray-500">Due date:</p>
        <p className="text-sm text-gray-700">{formatDate(task.due_date || '')}</p>
      </div>
      <div className="mt-2">
        <p className="text-xs text-gray-500">Created date:</p>
        <p className="text-sm text-gray-700">{formatDate(task.created_at || '')}</p>
      </div>
    </div>
  );
};